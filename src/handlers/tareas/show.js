const database = require("../../database");
const requestHandler = require("../../middlewares/requestHandler");

// GET /api/tareas/:dni

module.exports = (route) => {
  route.get(
    "/:dni",
    requestHandler(async (req, res) => {
      const dni = parseInt(req.params.dni);
      const tarea = await database.obtenerTareaPorDNI(dni);

      if (tarea) {
        res.json(tarea);
      } else {
        res.sendStatus(404);
      }
    })
  );
};
