const btnEnviarHabitacion = document.getElementById("btnEnviarHabitacion");
const opcionesLista = document.getElementById("opcionesLista");
const listaContenedor = document.getElementById("lista");

function agregarALista(nombreHabitacion) {
  listaContenedor.innerHTML = `<li class="bg-light p-2 border rounded d-inline-block">
              ${nombreHabitacion}
              <a href="">Info</a>
              <button type="button">Disponible</button>
              <button type="button">No disponible</button>
              <button type="button" id="btnGuardar">Publicar Habitación</button>
            </li>`;
  console.log("Seleccionó: " + nombreHabitacion);

  const btnNuevo = document.getElementById("btnGuardar");

  btnNuevo.addEventListener("click", function () {
    console.log("vamos bien");

    const nuevaHabitacion = {
      nombre: nombreHabitacion,
      estado: "Pendiente",
    };

    const guardar = JSON.parse(localStorage.getItem("guardar")) || [];
    guardar.push({ datosHabitacion });

    localStorage.setItem("guardar", JSON.stringify(guardar));
    console.log("Habitación agregada con éxito");
  });
}

btnEnviarHabitacion.addEventListener("click", function () {
  console.log("El botón funciona.");

  const habitacionSeleccionada =
    opcionesLista.options[opcionesLista.selectedIndex].text;

  if (opcionesLista.value.trim() === "") {
    alert("Seleccione una habitación.");
    return;
  } else {
    console.log(lista);
  }
  agregarALista(habitacionSeleccionada);
});

function mostrarLista() {
  const guardadas = JSON.parse(localStorage.getItem("guardar")) || [];

  guardadas.array.forEach((hab) => {
    const nuevoElemento = document.createElement("li");
    nuevoElemento.className = "bg-light p-2 border rounded mb-2";

    nuevoElemento.innerHTML = `${hab.nombre} 
    <span class="badge bg-primary">Publicada</span>`;

listaContenedor.appendChild(nuevoElemento);

  });
}
document.addEventListener("DOMContentLoaded", mostrarLista);