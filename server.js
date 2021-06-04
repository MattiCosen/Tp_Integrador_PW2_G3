/*  para ejecutar la aplicacion --> npm install -->  npm start  */
// requerir o importar express
const express = require("express");
// el numero de puerto esta en config
const { PORT } = require("./src/config");
// initConnection es una función async que importamos desde database
const { initConnection } = require("./src/database");

// crear constante llamada app y generamos una instancia de express
const app = express();

// utilizamos app.use y le pasamos bodyparser
app.use(express.json());
// servimos la carpeta public para que pueda ser accedida desde el navegador
app.use(express.static("./public"));

const tasksAPI = require("./src/handlers");
app.use("/", tasksAPI);

// chequeo de conexión
connection.connect((error) => {
  if (error) throw error;
  console.info("la base de datos esta funcionando");
});

initConnection().then(() => {
  // escuchar el puerto (alt96 = `)
  app.listen(PORT, () => {
    console.info(`El servidor esta escuchando en el puerto ${PORT}`);
  });
});
