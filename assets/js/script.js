// Paso 1: Definir nuestro arreglo con 3 tareas iniciales (id, nombre, estado completado)
let tareas = [
    { id: 16, nombre: "Hacer mercado", completado: true },
    { id: 60, nombre: "Estudiar para la prueba", completado: false },
    { id: 24, nombre: "Sacar a pasear a Tobby", completado: false },
];

console.log("Paso 1: Arreglo inicial de tareas cargado.", tareas);

// Capturamos los elementos del HTML
const inputTarea = document.getElementById("nuevaTareaInput");
const btnAgregar = document.getElementById("btnAgregar");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const spanTotal = document.getElementById("totalTareas");
const spanRealizadas = document.getElementById("tareasRealizadas");

// Función principal que dibuja las tareas en la pantalla y actualiza contadores
function renderizarTareas() {
    console.log("Paso X: Actualizando la pantalla...");

    // Limpiamos la tabla antes de volver a pintarla para que no se dupliquen
    cuerpoTabla.innerHTML = "";

    // Recorremos el arreglo usando un ciclo (puedes usar for of)
    for (let tarea of tareas) {
        // Creamos una fila por cada tarea
        const fila = document.createElement("tr");

        // Verificamos si está completada para agregarle estilo tachado o marcar el checkbox
        let claseTexto = tarea.completado ? "tachado" : "";
        let estadoCheck = tarea.completado ? "checked" : "";

        fila.innerHTML = `
                    <td>${tarea.id}</td>
                    <td class="${claseTexto}">${tarea.nombre}</td>
                    <td><input type="checkbox" ${estadoCheck} onclick="cambiarEstado(${tarea.id})"></td>
                    <td><button class="btn-borrar" onclick="borrarTarea(${tarea.id})">❌</button></td>
                `;

        cuerpoTabla.appendChild(fila);
    }

    // Actualizamos los contadores en pantalla
    actualizarContadores();
}

// Función para actualizar los contadores (Total y Realizadas)
function actualizarContadores() {
    // Total de tareas
    spanTotal.textContent = tareas.length;
    console.log("Contador Total actualizado:", tareas.length);

    // Tareas realizadas (usando filter como pide la pista)
    const realizadas = tareas.filter((t) => t.completado === true);
    spanRealizadas.textContent = realizadas.length;
    console.log("Contador Realizadas actualizado:", realizadas.length);
}

// Paso 2: Agregar una nueva tarea desde el input
btnAgregar.addEventListener("click", () => {
    const textoDesc = inputTarea.value.trim();

    // Validar que el input no esté vacío
    if (textoDesc === "") {
        alert("Por favor escribe una descripción para la tarea.");
        return;
    }

    // Crear el nuevo objeto tarea
    const nuevaT = {
        id: Math.floor(Math.random() * 90) + 10, // Genera un ID aleatorio de 2 dígitos
        nombre: textoDesc,
        completado: false, // Inicia siempre en falso como pide la pista
    };

    // Agregamos al arreglo
    tareas.push(nuevaT);
    console.log("Paso 2: Tarea agregada con éxito:", nuevaT);

    // Limpiamos el input
    inputTarea.value = "";

    // Actualizamos la vista
    renderizarTareas();
});

// Paso 3: Borrar una tarea según su ID
window.borrarTarea = function (id) {
    console.log("Paso 3: Borrando la tarea con ID:", id);

    // Buscamos el índice de la tarea en el arreglo
    const index = tareas.findIndex((t) => t.id === id);

    if (index !== -1) {
        // Eliminamos del arreglo usando splice
        tareas.splice(index, 1);
        console.log("Tarea eliminada. Arreglo actual:", tareas);
        // Actualizamos la pantalla
        renderizarTareas();
    }
};

// Paso 4: Cambiar el estado de la tarea (completado true/false)
window.cambiarEstado = function (id) {
    console.log("Paso 4: Cambiando estado de la tarea con ID:", id);

    // Buscamos la tarea dentro del arreglo
    const tareaEncontrada = tareas.find((t) => t.id === id);

    if (tareaEncontrada) {
        // Invertimos su valor (si era false pasa a true, y viceversa)
        tareaEncontrada.completado = !tareaEncontrada.completado;
        console.log("Nuevo estado de la tarea:", tareaEncontrada);

        // Actualizamos la pantalla
        renderizarTareas();
    }
};

// Ejecutamos la función por primera vez al cargar la página para mostrar las 3 tareas iniciales
renderizarTareas();