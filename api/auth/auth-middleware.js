const userModel = require("../users/users-model");
const bcryptjs = require("bcryptjs");

const checkPayload = (req, res, next) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ messsage: "username ve password gereklidir" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

async function checkUser(req, res, next) {
  try {
    let isExistingUser = await userModel.getByUsername(req.body.username);
    if (!isExistingUser) {
      res.status(404).json({ message: "geçersiz kriterler" });
    } else {
      let isPasswordMatch = bcryptjs.compareSync(
        req.body.password,
        isExistingUser.password
      );
      if (isPasswordMatch) {
        req.currentUser = isExistingUser;
        next();
      } else {
        res.status(400).json({ message: "Şifre yanlış." });
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkPayload,
  checkUser,
};
