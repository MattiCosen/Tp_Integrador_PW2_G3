const database = require("../../database");
const requestHandler = require("../../middlewares/requestHandler");

// GET /api/tareas

module.exports = (route) => {
  route.get(
    "/",
    requestHandler(async (req, res) => {
      const tareas = await database.listarTareas();
      res.json(tareas);
    })
  );
};
