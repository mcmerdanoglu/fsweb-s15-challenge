const userModel = require("../users/users-model");
const bcryptjs = require("bcryptjs");

const checkUsername = async (req, res, next) => {
  try {
    let isExisting = await userModel.getByFilter(req.body.username);
    if (isExisting && isExisting.length > 0) {
      let currentUser = isExisting[0];
      let isPasswordMatch = bcryptjs.compareSync(
        req.body.password,
        currentUser.password
      );
      if (!isPasswordMatch) {
        res.status(401).json({
          message: "Geçersiz kriter",
        });
      } else {
        req.currentUser = currentUser;
        next();
      }
    } else {
      res.status(401).json({
        message: "Geçersiz kriter",
      });
    }
  } catch (error) {
    next(error);
  }
};

const checkPayload = (req, res, next) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ messsage: "Eksik alan var" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkUsername,
  checkPayload,
};
