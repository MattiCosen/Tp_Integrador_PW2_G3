// Referencia al div contenedor de tareas
const contentTable = document.getElementById("contentTable");
// Tomo el template y su contenido
const row = document.getElementById("contentRow").content;

// Referencia al div contenedor de datos del usuario
const contentUser = document.getElementById("contentUser");
// Tomo el template usuario y su contenido
const userRow = document.getElementById("contentUserRow").content;

function addRow(titulo, estado, created, id) {
  // Clono el template en una nueva variable
  const fila = row.cloneNode(true);

  fila.querySelector(".tituloTarea").innerText = titulo;
  fila.querySelector(".estadoTarea").innerText = estado;
  fila.querySelector(".creadoTarea").innerText = created;
  fila
    .querySelector(".btnDelete")
    .addEventListener("click", () => eliminarTarea(id));
  fila
    .querySelector(".btnUpdate")
    .addEventListener("click", () => modificarTarea(id));
  fila.querySelector(".row").dataset.id = id;

  // Inserto la nueva fila en la tabla
  contentTable.appendChild(fila);
}

/**
 * Busco usuario por dni y pongo sus datos en el template, luego incluyo en el contenedor html
 */
async function buscarUsuario(dni) {
  const user = await api(`/usuarios/${dni}`, "get");

  // Clono el template en una nueva variable
  const userBlock = userRow.cloneNode(true);
  userBlock.querySelector(
    ".usrInfo"
  ).innerText = `Bienvenido ${usuario.nombre_apellido}`;
  userBlock
    .querySelector("#logoutButton")
    .addEventListener("click", () => logout());

  // Inserto userBlock con la nueva info, en su contenedor
  contentUser.appendChild(userBlock);
}

/**
 *
 * @param {'get'|'post'|'put'|'delete'} method
 * @param {'/tareas'|'/tareas:dni'} endpoint
 * @returns
 */

async function api(endpoint, method, body = undefined) {
  if (body) {
    body = JSON.stringify(body);
  }

  // Obtengo el valor "token" almacenado en local storage
  const token = localStorage.getItem("token");
  const headers = {
    "Content-type": "application/json",
  };

  // Copio el valor de token en el header para mandarlo en el request
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // se procesa el fetch con todos los datos que vienen por parámetro
  const response = await fetch(`/api${endpoint}`, {
    method,
    body,
    headers,
  });

  const data = await response.json();

  return data;
}

/**
 * Inicio de la app
 */

async function initApp() {
  if (localStorage.getItem("token")) {
    // Si la app está iniciando y el token está guardado en local storage, debo "limpiar" esa información porque puede ser un token caducado y nunca me va a dejar acceder
    localStorage.removeItem("token");
  } else {
    // Usuario no logueado, oculto el contenedor que muestra bienvenida al usuario y botón de logout
    contentUser.style.display = "none";
  }

  await mostrarTareas();
}

async function mostrarTareas() {
  // Si el usuario está logueado, muestro sus tareas
  if (localStorage.getItem("token")) {
    while (contentTable.children.length > 1) {
      //// Iteración para eliminar todos los elementos, menos el 1º que es la fila cabecera
      let item = contentTable.lastElementChild;
      contentTable.removeChild(item);
    }

    const data = await api("/tarea/:dni", "get");

    data.forEach(({ titulo, estado, created, id }) =>
      addRow(titulo, estado, created, id)
    );
  }
}

// chequeo de conexión
connection.connect((error) => {
  if (error) throw error;
  console.info("la base de datos esta funcionando");
});

// escuchar el puerto (alt96 = `)
app.listen(PORT, () =>
  console.info(`El servidor esta escuchando en el puerto:${PORT}`)
);
