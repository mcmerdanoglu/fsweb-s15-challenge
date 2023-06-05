const router = require("express").Router();

const { checkPayload, checkUser } = require("./auth-middleware");
const { tokenValidation } = require("../middleware/restricted");
const { JWT_SECRET } = require("../secrets/secret");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const userModel = require("../users/users-model");

router.post("/register", checkPayload, async (req, res, next) => {
  //res.end("kayıt olmayı ekleyin, lütfen!");
  /*
    EKLEYİN
    Uçnoktanın işlevselliğine yardımcı olmak için middlewarelar yazabilirsiniz.
    2^8 HASH TURUNU AŞMAYIN!

    1- Yeni bir hesap kaydetmek için istemci "kullanıcı adı" ve "şifre" sağlamalıdır:
      {
        "username": "Captain Marvel", // `users` tablosunda var olmalıdır
        "password": "foobar"          // kaydedilmeden hashlenmelidir
      }

    2- BAŞARILI kayıtta,
      response body `id`, `username` ve `password` içermelidir:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- Request bodyde `username` ya da `password` yoksa BAŞARISIZ kayıtta,
      response body şunu içermelidir: "username ve şifre gereklidir".

    4- Kullanıcı adı alınmışsa BAŞARISIZ kayıtta,
      şu mesajı içermelidir: "username alınmış".
  */
  try {
    let hashedPassword = bcryptjs.hashSync(req.body.password);
    let userRequestModel = {
      username: req.body.username,
      password: hashedPassword,
    };
    const registeredUser = await userModel.add(userRequestModel);
    res.status(201).json(registeredUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", checkPayload, checkUser, (req, res, next) => {
  //res.end("girişi ekleyin, lütfen!");
  /*
    EKLEYİN
    Uçnoktanın işlevselliğine yardımcı olmak için middlewarelar yazabilirsiniz.

    1- Var olan bir kullanıcı giriş yapabilmek için bir `username` ve `password` sağlamalıdır:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- BAŞARILI girişte,
      response body `message` ve `token` içermelidir:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- req body de `username` ya da `password` yoksa BAŞARISIZ giriş,
      şu mesajı içermelidir: "username ve password gereklidir".

    4- "username" db de yoksa ya da "password" yanlışsa BAŞARISIZ giriş,
      şu mesajı içermelidir: "geçersiz kriterler".
  */
  try {
    let payload = {
      id: req.currentUser.id,
      username: req.currentUser.username,
      // Bu bölümde kesinlikle password gönderilmeyecek!!!
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    res.json({
      message: `welcome, ${req.currentUser.username}`,
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
