const express = require("express");

const tareasRouting = express.Router();

const list = require("./list");

list(tareasRouting);

const tareasAPI = express.Router();

tareasAPI.use("/tareas", tareasRouting);
module.exports = tareasAPI;
