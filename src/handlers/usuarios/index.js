const express = require("express");

const usuariosRouting = express.Router();

const show = require("./show");

show(usuariosRouting);

const usuariosAPI = express.Router();

usuariosAPI.use("/usuarios", usuariosRouting);
module.exports = usuariosAPI;
