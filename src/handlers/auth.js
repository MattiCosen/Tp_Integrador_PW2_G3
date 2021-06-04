// importo express
const express = require("express");
// nuevo para utilizar JWT
const jwt = require("jsonwebtoken");
// traigo la clave secreta del archivo config
const { JWT_SECRET } = require("../config");
// importo database para buscar usuario por user y password
const database = require("../database");
// importo el request handler para hacer try catch de errores
const requestHandler = require("../middlewares/requestHandler");
// llamo al módulo router
const authRouting = express.Router();

authRouting.post(
  "/login",
  requestHandler(async (req, res) => {
    //user viene en el body
    const { name, password } = req.body;
    // lo buscamos en la base de datos por user y password
    const user = await database.findByUsernameAndPass(name, password);

    // INICIO: JWT  Biblioteca para la firma / verificación de tokens
    /* La idea es que el usuario puede generar un token. utilizamos la herramienta JWT.
    // cuando el usuario ingrese a login se generara un token.
    // de esa manera un usuario puede ser identificado */

    // jwt.sign le pasamos un user y lo desestructuramos, una llave secreta , tiempo de expiracion. err nos indica el error y
    // si no hay error nos dara el token
    // ese token se envia al navegador y de alguna manera lo deberia almacenar el explorador en una cookie o
    // utilizando localstorage.Authorization: Bearer <token>
    // mas info:https://jwt.io/introduction
    // la diferencia con otros JWT deja el token del lado del cliente y no del lado del servidor.

    if (user) {
      // Usuario válido, encontró usuario y contraseña en la base de datos
      const accessToken = jwt.sign(
        {
          name,
          id: user.id,
        },
        JWT_SECRET,
        {
          expiresIn: "120s",
        }
      );
      res.json({
        // enviamos el token hacia el lado del usuario (cliente) valido por 2 minutos
        accessToken,
        status: "Logueado",
      });
    } else {
      // Usuario inválido
      res.status(403).json({
        error: "Acceso denegado: por favor iniciar sesión nuevamente",
        status: "error",
      });
    }
  })
);

module.exports = authRouting;
