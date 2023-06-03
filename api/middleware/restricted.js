const { JWT_SECRET } = require("../secrets/secret");
const userModel = require("../users/users-model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

/* EKLEYİN */

const tokenValidation = (req, res, next) => {
  try {
    let authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json({
        message: "Token gereklidir",
      }); /* 2- Authorization headerında token yoksa, response body şu mesajı içermelidir: "token gereklidir".*/
    } else {
      jwt.verify(authHeader, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({
            message: "token geçersizdir",
          }); /* 3- Authorization headerında geçersiz veya timeout olmuş token varsa, response body şu mesajı içermelidir: "token geçersizdir".*/
        } else {
          req.decodedToken =
            decodedToken; /* 1- Authorization headerında geçerli token varsa, sıradakini çağırın.*/
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = (req, res, next) => {
  next();
};
