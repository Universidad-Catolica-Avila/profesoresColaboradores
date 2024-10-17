// Lista de profesores colaboradores
const profesores = [
    "Profesor A",
    "Profesor B",
    "Profesor C",
    "Profesor D"
];

const email = [
    "ProfesorA@gmail.com",
    "ProfesorB@gmail.com",
    "ProfesorC@gmail.com",
    "ProfesorD@gmail.com"
];

// Seleccionamos el elemento ul donde se mostrarán los profesores
const listaProfesores = document.getElementById("profesores-list");
const listaEmail = document.getElementById("email-list");

// Función para mostrar los profesores en la lista
function mostrarProfesores() {
    profesores.forEach(profesor => {
        const li = document.createElement("li");
        li.textContent = profesor;
        listaProfesores.appendChild(li);
    });
}

function mostrarMail() {
    email.forEach(email => {
        const li = document.createElement("li");
        li.textContent = email;
        listaEmail.appendChild(li);
    });
}

function cargarFunciones() {
    mostrarProfesores();    
    mostrarMail();    
}
// Ejecutamos la función cuando se carga la página
window.onload = cargarFunciones();

