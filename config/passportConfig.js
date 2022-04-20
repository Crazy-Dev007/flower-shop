const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/user");

exports.initpassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await User.findOne({ username });
      if (!user) return done(null, false);
      if (user.password != password) return done(null, false);

      return done(null, user);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(null, false);
    }
  });
};

// middware
exports.isAuth = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.redirect("/user/account");
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role == "Admin") {
    return next();
  }
  console.log("Admin permission");
  res.redirect("/user/account");
};
