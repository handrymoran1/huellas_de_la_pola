const btnEnviarHabitacion = document.getElementById("btnEnviarHabitacion");
const opcionesLista = document.getElementById("opcionesLista");
const listaContenedor = document.getElementById("lista");

let listaHabitaciones = {habitación:};

function agregarALista(nombreHabitacion) {
  listaContenedor.innerHTML = `<li class="bg-light p-2 border rounded d-inline-block">
              ${nombreHabitacion}
              <a href="#">Info</a>
              <button type="btnDisponibilidad">Disponible</button>
              <button type="btnDisponibilidad">No disponible</button>
            </li>`;

  console.log("funcionó" + nombreHabitacion);
}

btnEnviarHabitacion.addEventListener("click", function () {
  console.log("El botón funciona.");

  const habitacionSeleccionada = opcionesLista.options[opcionesLista.selectedIndex].text;
  
  if (opcionesLista.value.trim() === "") {
    alert("Seleccione una habitación.");
    return;
  } else {
    console.log(lista);
  }
  agregarALista(habitacionSeleccionada);
});
