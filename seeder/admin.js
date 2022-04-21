const { User } = require("../models/user");

const createAdmin = async () => {
  try {
    const user = await User.findOne({ role: "admin" });
    if (!user) {
      const newuser = await User.create({
        name: "Shrayas",
        age: "21",
        address: "Xyz",
        username: "admin",
        password: "123",
        role: "admin",
      });
      newuser.save();
      //   console.log(newuser);
    }
  } catch (error) {
    console.log(`Admin Creation Error ${error}`);
  }
};

module.exports = createAdmin;
