const express = require("express");

const tareasRouting = express.Router();

const list = require("./list");
const show = require("./show");

list(tareasRouting);
show(tareasRouting);

const tareasAPI = express.Router();

tareasAPI.use("/tareas", tareasRouting);
module.exports = tareasAPI;
