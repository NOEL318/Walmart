const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Auth_SQL = require("../database/Auth");

module.exports = {
  signUp: async function (user) {
    const exist = await Auth_SQL.AccountExist(user.email);
    console.log(exist, "Exist aaa");
    if (exist != null) {
      return { status: 401, token: null, error: "Ya tienes una cuenta" };
    } else if (exist == null) {
      const salt = await bcrypt.genSalt(10);
      var hash = await bcrypt.hash(user.contrasena, salt);
      user.contrasena = hash;
      var response = await Auth_SQL.SignUp(user);
      return {
        status: 200,
        token: null,
        error: "Cuenta Creada Inicia Sesión.",
      };
    }
  },
  signIn: async function ({ email, password }) {
    const exist = await Auth_SQL.AccountExist(email);
    console.log("exist", exist);
    if (exist != null) {
      const verify = await bcrypt.compare(password, exist.contrasena);
      if (verify == true && email == exist.email) {
        delete exist.contrasena;
        const token = jwt.sign(exist, process.env.ENCODER_FOR_USER_TOKENS, {
          expiresIn: "3h",
        });

        return { status: 200, token };
      } else {
        return { status: 401, token: null, error: "Tus datos no coinciden." };
      }
    } else if (exist == null) {
      return { status: 401, token: null, error: "No tienes una cuenta." };
    }
  },

  loginwithoutpassword: async function ({ email }) {
    if (!email) {
      return { status: 400, message: "Algo ha salido mal con tu cuenta" };
    } else {
      const user = await Auth_SQL.AccountExist(email);
      if (user != null) {
        delete user.password;
        const token = jwt.sign(user, process.env.ENCODER_FOR_USER_TOKENS, {
          expiresIn: "3h",
        });
        return { status: 200, token };
      }
      if (user == null) {
        return { status: 400, message: "No tienes una cuenta" };
      }
    }
  },
};
