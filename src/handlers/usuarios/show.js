const database = require("../../database");
const requestHandler = require("../../middlewares/requestHandler");

// GET /api/usuarios/:dni

module.exports = (route) => {
  route.get(
    "/:dni",
    requestHandler(async (req, res) => {
      const dni = parseInt(req.params.dni);
      const usuario = await database.buscarUsuarioPorDNI(dni);

      if (usuario) {
        res.json(usuario);
      } else {
        res.sendStatus(404);
      }
    })
  );
};
