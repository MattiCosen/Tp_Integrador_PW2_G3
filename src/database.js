// requerir o importar mysql2
const mysql = require("mysql2/promise");

// mysql en base a la documentacion:
//https://www.npmjs.com/package/mysql2

// aquí está la constante que tiene todos los datos de conexión
const { DB_CONFIG } = require("./config");

let connection;

module.exports = {
  async initConnection() {
    connection = await mysql.createConnection(DB_CONFIG);
  },

  // pedir tabla tareas
  //http://localhost:3000/tareas
  async listarTareas() {
    let tareas = [];

    [tareas] = await connection.query(
      "SELECT * FROM tareas",
      (err, resultado) => {
        if (!err) {
          res.status(200).send({
            Observaciones: `Todos los datos de la tabla TAREAS son: `,
            resultado,
          });
        } else {
          console.log(err);
          res.status(404).send({
            Observaciones: `Se encontraron los siguientes errores: `,
            err,
          });
        }
      }
    );

    return tareas;
  },

  // pedir tabla usuarios
  ////http://localhost:3000/usuarios
  async listarUsuarios() {
    let usuarios = [];

    [usuarios] = await connection.query(
      "SELECT   dni_usuario,nombre_apellido, fecha_nacimiento, domicilio,localidad,telefono FROM usuarios",
      (err, resultado) => {
        if (!err) {
          res.status(200).send({
            Observaciones: ` Se puede observar toda la información de la tabla USUARIOS: `,
            resultado,
          });
        } else {
          console.log(err);
          res.status(404).send({
            Observaciones: `Se encontraron los siguientes errores: `,
            err,
          });
        }
      }
    );

    return usuarios;
  },

  // leer una tarea por id
  // /tarea/:id
  async obtenerTareaPorId(id) {
    const sql = `SELECT * FROM tareas WHERE id = ${id}`;

    const [tareas] = await connection.query(sql, (err, resultado) => {
      if (!err) {
        res.status(200).send({
          Observaciones: ` la TAREA para el usuario  con DNI : ${dni} es:`,
          resultado,
        });
      } else {
        console.log(err);
        res.status(404).send({
          Observaciones: `Se encontraron los siguientes errores: `,
          err,
        });
      }
    });

    if (tareas.length) {
      return tareas[0];
    } else {
      return undefined;
    }
  },

  // leer una tarea por dni
  // /tarea/:dni
  async obtenerTareaPorDNI(dni) {
    const sql = `SELECT * FROM tareas WHERE dni_usuario= ${dni}`;

    const [tareas] = await connection.query(sql, (err, resultado) => {
      if (!err) {
        res.status(200).send({
          Observaciones: ` la TAREA para el usuario  con DNI : ${dni} es:`,
          resultado,
        });
      } else {
        console.log(err);
        res.status(404).send({
          Observaciones: `Se encontraron los siguientes errores: `,
          err,
        });
      }
    });

    if (tareas.length) {
      return tareas[0];
    } else {
      return undefined;
    }
  },

  async buscarUsuarioPorDNI(dni) {
    const [users] = await connection.execute(
      "SELECT * FROM usuarios WHERE dni_usuario = ?",
      [userId]
    );
    if (users.length) {
      return users[0];
    } else {
      return undefined;
    }
  },

  // eliminar tarea de usuario por dni

  async removeTask(dni) {
    const user = await this.searchUserbyDNI(dni);

    if (!user) {
      throw new Error(`No existe un usuario con dni "${dni}`);
    }

    const sql = `DELETE FROM tareas WHERE dni_usuario=${dni}`;

    await connection.query(sql, (err) => {
      if (err) {
        console.log(err);
        res.status(404).send({
          Observaciones: `Se encontraron los siguientes errores: `,
          err,
        });
      } else {
        res.status(200).send({
          Observaciones: `Las tareas del Usuario con DNI: ${dni} fueron eliminadas `,
        });
        console.info(
          ` Las tareas del Usuario con DNI: ${dni} fueron eliminadas`
        );
      }
    });
  },

  //Estas funciones que siguen las dejamos comentadas por ahora y las vamos incorporando a medida que las necesitamos

  // leer un usuario por DNI sin contraseña y pass
  // app.get ('/usuarios/:dni', (req, res) => {
  //     const {dni} = req.params;
  //     const sql = `SELECT   nombre_apellido,
  //     fecha_nacimiento,
  //     domicilio,
  //     localidad,
  //     telefono FROM usuarios WHERE dni_usuario= ${dni}`;
  //     connection.query (sql, (err, resultado) => {
  //       if (!err) {
  //         res.status (200).send ({
  //           Observaciones: `El usuario con DNI: ${dni} es:`,
  //           resultado,
  //         });
  //       } else {
  //         console.log (err);
  //         res.status (404).send ({
  //           Observaciones: `Se encontraron los siguientes errores: `,
  //           err,
  //         });
  //       }
  //     });
  //   });

  // leer un usuario por DNI sin contraseña y pass
  // app.get ('/usuarios_pass/:dni', (req, res) => {
  //     const {dni} = req.params;
  //     const sql = `SELECT   username,pass FROM usuarios WHERE dni_usuario= ${dni}`;
  //     connection.query (sql, (err, resultado) => {
  //       if (!err) {
  //         res.status (200).send ({
  //           Observaciones: `El Usuario y Password que corresponde al DNI: ${dni} es:`,
  //           resultado,
  //         });
  //       } else {
  //         console.log (err);
  //         res.status (404).send ({
  //           Observaciones: `Se encontraron los siguientes errores: `,
  //           err,
  //         });
  //       }
  //     });
  //   });
  //   // agregar usuarios
  //   //--  insert  en tabla usuarios
  //   app.post ('/add_usuarios', (req, res) => {
  //     // const sql_id = 'SELECT MAX(id) FROM usuarios';
  //     // id:sql_id+1,

  //     const sql = 'INSERT INTO usuarios SET ?';
  //     const info = {
  //       dni_usuario: req.body.dni_usuario,
  //       nombre_apellido: req.body.nombre_apellido,
  //       fecha_nacimiento: req.body.fecha_nacimiento,
  //       domicilio: req.body.domicilio,
  //       localidad: req.body.localidad,
  //       telefono: req.body.telefono,
  //       username: req.body.username,
  //       pass: req.body.pass,
  //     };
  //     connection.query (sql, info, err => {
  //       if (err) {
  //         console.log (err);
  //         res.status (404).send ({
  //           Observaciones: `Se encontraron los siguientes errores: `,
  //           err,
  //         });
  //       } else {
  //         console.log (' usuario ');
  //         res.status (200).send ({
  //           Observaciones: `Se agrego el usuario `,
  //           info,
  //         });
  //       }
  //     });
  //   });
  //   // agregar tareas
  //   //--  insert  en tabla tareas

  //   app.post ('/add_tareas', (req, res) => {
  //     const sql = 'INSERT INTO tareas SET ?';
  //     const info = {
  //       dni_usuario: req.body.dni_usuario,
  //       titulo: req.body.titulo,
  //       descripcion: req.body.descripcion,
  //       estado: req.body.estado,
  //       created: req.body.created,
  //       updated: req.body.updated,
  //       eliminated: req.body.eliminated,
  //     };
  //     connection.query (sql, info, err => {
  //       if (err) {
  //         console.log (err);
  //         res.status (404).send ({
  //           Observaciones: `Se encontraron los siguientes errores: `,
  //           err,
  //         });
  //       } else {
  //         res.status (200).send ({
  //           Observaciones: `la tarea nueva es: `,
  //           info,
  //         });
  //         console.log (' tarea actualizada');
  //       }
  //     });
  //   });
  //   //actualizar usuario
  //   app.put ('/update_usuario/:dni', (req, res) => {
  //     const {dni} = req.params;
  //     console.log (req.body);

  //     const {
  //       nombre_apellido,
  //       fecha_nacimiento,
  //       domicilio,
  //       localidad,
  //       telefono,
  //       username,
  //       pass,
  //     } = req.body;

  //     const sql = ` UPDATE usuarios SET  nombre_apellido='${nombre_apellido}', fecha_nacimiento='${fecha_nacimiento}', domicilio='${domicilio}',
  //     localidad='${localidad}', telefono='${telefono}', username='${username}', pass='${pass}'  WHERE dni_usuario='${dni}' `;
  //     connection.query (sql, err => {
  //       console.log (err);
  //       if (err) throw err;
  //       res.send (` dni=${dni} usuario modificado`);
  //       console.log (` dni=${dni} usuario modificado`);
  //     });
  //   });

  //   app.delete ('/delete_usuario/:dni', (req, res) => {
  //     const {dni} = req.params;
  //     const sql = `DELETE FROM usuarios WHERE dni_usuario=${dni}`;
  //     connection.query (sql, err => {
  //       if (err) {
  //         console.log (err);
  //         res.status (404).send ({
  //           Observaciones: `Se encontraron los siguientes errores: `,
  //           err,
  //         });
  //       } else {
  //         res.status (200).send ({
  //           Observaciones: `El usuario con DNI: ${dni} fue eliminado `,
  //         });
  //         console.info (` El usuario con  DNI= ${dni} fue eliminando`);
  //       }
  //     });
  //   });
};
