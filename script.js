// Lista de profesores colaboradores
const profesores = [
    "Profesor A",
    "Profesor B",
    "Profesor C",
    "Profesor D"
];

// Seleccionamos el elemento ul donde se mostrarán los profesores
const listaProfesores = document.getElementById("profesores-list");

// Función para mostrar los profesores en la lista
function mostrarProfesores() {
    profesores.forEach(profesor => {
        const li = document.createElement("li");
        li.textContent = profesor;
        listaProfesores.appendChild(li);
    });
}

// Ejecutamos la función cuando se carga la página
window.onload = mostrarProfesores;
