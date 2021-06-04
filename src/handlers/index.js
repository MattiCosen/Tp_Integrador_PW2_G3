const express = require("express");
const database = require("../database");
const authenticateJWT = require("../middlewares/authenticate.JWT");
// const { ValidationError } = require("../validations/validationError");
const authRouting = require("./auth");
const tareasRouting = require("./tareas");

const apiRouting = express.Router();

apiRouting.use("/api", authRouting, authenticateJWT, tareasRouting);

apiRouting.use((err, req, res, next) => {
  //   if (err instanceof ValidationError) {
  //     res.status(400).json({
  //       status: "error",
  //       error: err.formatErrors(),
  //     });
  //   }
});

module.exports = apiRouting;
