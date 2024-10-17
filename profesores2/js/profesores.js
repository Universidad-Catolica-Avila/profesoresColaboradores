// Lista de profesores colaboradores con ID asignado
const profesores = [
    { id: 1, nombre: "Diego Blázquez", email: "diego.blazquez@ucavila.es", telefono: "111111111", rol: "Admin", descatalogado: false },
    { id: 2, nombre: "Ana Pérez", email: "ana.perez@ucavila.es", telefono: "222222222", rol: "Usuario", descatalogado: false },
    { id: 3, nombre: "Luis García", email: "luis.garcia@ucavila.es", telefono: "333333333", rol: "Usuario", descatalogado: false },
    { id: 4, nombre: "María López", email: "maria.lopez@ucavila.es", telefono: "444444444", rol: "Usuario", descatalogado: true },
    { id: 5, nombre: "Juan Martínez", email: "juan.martinez@ucavila.es", telefono: "555555555", rol: "Usuario", descatalogado: false },
    { id: 6, nombre: "Laura Sánchez", email: "laura.sanchez@ucavila.es", telefono: "666666666", rol: "Usuario", descatalogado: false },
    { id: 7, nombre: "José Fernández", email: "jose.fernandez@ucavila.es", telefono: "777777777", rol: "Usuario", descatalogado: true },
    { id: 8, nombre: "Clara Ruiz", email: "clara.ruiz@ucavila.es", telefono: "888888888", rol: "Usuario", descatalogado: false },
    { id: 9, nombre: "Pedro Jiménez", email: "pedro.jimenez@ucavila.es", telefono: "999999999", rol: "Usuario", descatalogado: false },
    { id: 10, nombre: "Sofía Torres", email: "sofia.torres@ucavila.es", telefono: "101010101", rol: "Usuario", descatalogado: true },
    { id: 11, nombre: "David Morales", email: "david.morales@ucavila.es", telefono: "202020202", rol: "Usuario", descatalogado: false },
    { id: 12, nombre: "Isabel Castro", email: "isabel.castro@ucavila.es", telefono: "303030303", rol: "Usuario", descatalogado: false },
    { id: 13, nombre: "Fernando Gómez", email: "fernando.gomez@ucavila.es", telefono: "404040404", rol: "Usuario", descatalogado: true },
    { id: 14, nombre: "Patricia Romero", email: "patricia.romero@ucavila.es", telefono: "505050505", rol: "Usuario", descatalogado: false },
    { id: 15, nombre: "Ricardo Herrera", email: "ricardo.herrera@ucavila.es", telefono: "606060606", rol: "Usuario", descatalogado: false },
    { id: 16, nombre: "Valentina Ruiz", email: "valentina.ruiz@ucavila.es", telefono: "707070707", rol: "Usuario", descatalogado: true },
    { id: 17, nombre: "Cristina Díaz", email: "cristina.diaz@ucavila.es", telefono: "808080808", rol: "Usuario", descatalogado: false },
    { id: 18, nombre: "Javier Castillo", email: "javier.castillo@ucavila.es", telefono: "909090909", rol: "Usuario", descatalogado: false },
    { id: 19, nombre: "Gloria Vargas", email: "gloria.vargas@ucavila.es", telefono: "111222333", rol: "Usuario", descatalogado: true },
    { id: 20, nombre: "Andrés Ortega", email: "andres.ortega@ucavila.es", telefono: "444555666", rol: "Usuario", descatalogado: false }
];

// Obtener el elemento del ícono de ampliar
const iconoAmpliar = document.getElementById("icono_ampliar");

// Función para activar/desactivar pantalla completa
function togglePantallaCompleta() {
    if (!document.fullscreenElement) {
        // Si no está en pantalla completa, entrar en modo de pantalla completa
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error al intentar entrar en pantalla completa: ${err.message}`);
        });
        iconoAmpliar.querySelector("i").classList.remove("fa-expand");
        iconoAmpliar.querySelector("i").classList.add("fa-compress");
    } else {
        // Si ya está en pantalla completa, salir del modo de pantalla completa
        document.exitFullscreen();
        iconoAmpliar.querySelector("i").classList.remove("fa-compress");
        iconoAmpliar.querySelector("i").classList.add("fa-expand");
    }
}

// Agregar el evento de clic al ícono
iconoAmpliar.addEventListener("click", togglePantallaCompleta);

// Salir de pantalla completa al presionar la tecla Esc
document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        iconoAmpliar.querySelector("i").classList.remove("fa-compress");
        iconoAmpliar.querySelector("i").classList.add("fa-expand");
    }
});

// Seleccionamos el elemento div donde se mostrarán los profesores
const listaProfesores = document.getElementById("profesores-lista");
const modal = document.getElementById("modal");
const btnAddUsuario = document.getElementById("boton_add_usuario");
const spanClose = document.getElementsByClassName("close")[0];


// Función para mostrar los profesores en la lista
function mostrarProfesores(profesoresFiltrados) {
    const listaProfesores = document.getElementById("profesores-lista");
    listaProfesores.innerHTML = ""; // Limpiar la lista antes de mostrar

    // Crear cabecera de la lista
    const cabecera = document.createElement("div");
    cabecera.className = "cabecera";

    const cabeceraProfesor = document.createElement("div");
    cabeceraProfesor.textContent = "Profesor";
    cabeceraProfesor.className = "cabecera-lista";
    cabecera.appendChild(cabeceraProfesor);

    const cabeceraEmail = document.createElement("div");
    cabeceraEmail.textContent = "Email";
    cabeceraEmail.className = "cabecera-lista";
    cabecera.appendChild(cabeceraEmail);

    const cabeceraTelefono = document.createElement("div");
    cabeceraTelefono.textContent = "Teléfono";
    cabeceraTelefono.className = "cabecera-lista";
    cabecera.appendChild(cabeceraTelefono);
    
    const cabeceraRol = document.createElement("div");
    cabeceraRol.textContent = "Rol";
    cabeceraRol.className = "cabecera-lista";
    cabecera.appendChild(cabeceraRol);

    const cabeceraAcciones = document.createElement("div");
    cabeceraAcciones.textContent = "Acciones";
    cabeceraAcciones.className = "cabecera-lista";
    cabecera.appendChild(cabeceraAcciones);

    listaProfesores.appendChild(cabecera);

    // Mostrar cada profesor
    profesoresFiltrados.forEach(profesor => {
        // Crear un div para el profesor
        const divProfesor = document.createElement("div");
        divProfesor.className = "profesor";
        divProfesor.id = `profesor_${profesor.id}`;
        divProfesor.dataset.descatalogado = profesor.descatalogado; 
        // Si el profesor está eliminado, aplicar clase especial
        if (profesor.descatalogado) {
            divProfesor.style.backgroundColor = "#F8D7DA"; // Cambiar el color a rojo
        }

        // Crear y agregar el nombre
        const nombre = document.createElement("p");
        nombre.textContent = profesor.nombre;
        divProfesor.appendChild(nombre);

        // Crear y agregar el email
        const email = document.createElement("p");
        email.textContent = `${profesor.email}`;
        divProfesor.appendChild(email);

        // Crear y agregar el teléfono
        const telefono = document.createElement("p");
        telefono.textContent = `${profesor.telefono}`;
        divProfesor.appendChild(telefono);

        // Crear y agregar el rol
        const rol = document.createElement("p");
        rol.textContent = `${profesor.rol}`;
        divProfesor.appendChild(rol);

        // Crear un div para las acciones
        const acciones = document.createElement("div");
        acciones.className = "acciones";

        // Crear y agregar el icono de editar
        const editIcon = document.createElement("i");
        editIcon.className = 'fas fa-pencil-alt edit_user';
        editIcon.title = 'Editar';
        acciones.appendChild(editIcon);

        // Crear y agregar el icono de eliminar si no está descatalogado

        const deleteIcon = document.createElement("i");
        if (profesor.descatalogado) {
            deleteIcon.className = 'fas fa-archive delete_user';
            deleteIcon.style.opacity = 0;
            deleteIcon.style.pointerEvents = "none";
            acciones.appendChild(deleteIcon);
        }else{
            deleteIcon.className = 'fas fa-archive delete_user';
            deleteIcon.title = 'Eliminar';
            acciones.appendChild(deleteIcon);
        }

        // Usar addEventListener para manejar el clic
        deleteIcon.addEventListener("click", () => eliminarProfesor(profesor.id));

        // Agregar el div de acciones al div del profesor
        divProfesor.appendChild(acciones);

        // Agregar el div del profesor a la lista
        listaProfesores.appendChild(divProfesor);
    });
}

// Función para filtrar profesores eliminados
function filtrarProfesores() {
    const nombreFiltro = document.getElementById("nombreFiltro")?.value.toLowerCase().trim() || '';
    const emailFiltro = document.getElementById("emailFiltro")?.value.toLowerCase().trim() || '';
    const telefonoFiltro = document.getElementById("telefonoFiltro")?.value.trim() || '';
    const rolFiltro = document.getElementById("rolFiltro")?.value || '';
    const mostrarDescatalogados = document.getElementById("descatalogados")?.checked || false;

    const profesoresFiltrados = profesores.filter(profesor => {
        const nombreCoincide = profesor.nombre.toLowerCase().startsWith(nombreFiltro); // startWith
        const emailCoincide = profesor.email.toLowerCase().startsWith(emailFiltro);
        const telefonoCoincide = profesor.telefono.startsWith(telefonoFiltro);
        const rolCoincide = rolFiltro === "" || profesor.rol === rolFiltro;
        const noDescatalogado = mostrarDescatalogados || !profesor.descatalogado;

        return nombreCoincide && emailCoincide && telefonoCoincide && rolCoincide && noDescatalogado;
    });
    
    // Mostrar todos los profesores al cargar
    mostrarProfesores(profesoresFiltrados);

}


// Agregar el evento KeyUp a los campos de filtro
document.getElementById("nombreFiltro").addEventListener("keyup", filtrarProfesores);
document.getElementById("emailFiltro").addEventListener("keyup", filtrarProfesores);
document.getElementById("telefonoFiltro").addEventListener("keyup", filtrarProfesores);
document.getElementById("rolFiltro").addEventListener("change", filtrarProfesores);
document.getElementById("descatalogados").addEventListener("change", filtrarProfesores);


// Funcion para añadir un nuevo profesor a la lista
const formNuevoProfesor = document.getElementById("form_nuevo_profesor");

// Función para añadir un nuevo profesor a la lista
function añadirNuevoProfesor(event) {
    const nuevoProfesor = {
        id: profesores.length + 1, // Generar un ID único basado en la longitud del array
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        rol: document.getElementById("rol").value,
        descatalogado: false // Asignar estado inicial
    };
    console.log(nuevoProfesor);
    
    profesores.push(nuevoProfesor); // Añadir el nuevo profesor al array
    mostrarProfesores(profesores); // Volver a mostrar la lista
    formNuevoProfesor.reset(); // Limpiar el formularioç
    cerrarModal(); // Cerrar el modal
    mostrarMensajeAddProfesor();

}

function mostrarMensajeAddProfesor(){
    const mensaje = document.getElementById("mensajeAddProfesor");

    mensaje.style.display = "block"; // Mostrar el mensaje
    mensaje.style.opacity = "1"; // Hacerlo visible
    
    
    // Ocultar el mensaje y el overlay después de 2 segundos
    setTimeout(() => {
        mensaje.style.opacity = "0"; // Hacerlo invisible
        mensaje.style.transform = "translate(-50%, -50%) scale(1)"; // Restablecer el tamaño
        setTimeout(() => {
            mensaje.style.display = "none"; // Ocultar el mensaje
        }, 2000); // Tiempo de la transición
    }, 2000); // Tiempo que el mensaje estará visible
}


// Elementos del modal
const modalConfirmacionEliminar = document.getElementById("modalConfirmacionEliminar");
const btnConfirmarEliminar = document.getElementById("btnConfirmarEliminar");
const btnCancelarEliminar = document.getElementById("btnCancelarEliminar");
const spanCerrarConfirmacion = document.getElementsByClassName("cerrarConfirmacion")[0];


let profesorIdActual = null; // Variable para almacenar el ID del profesor actual

// Función para abrir el modal de edición
function abrirModalEdicion(profesor) {
    document.getElementById("modal_titulo").textContent = "Editar Profesor";
    document.getElementById("nombre").value = profesor.nombre;
    document.getElementById("email").value = profesor.email;
    document.getElementById("telefono").value = profesor.telefono;
    document.getElementById("rol").value = profesor.rol;
    profesorIdActual = profesor.id;

    abrirModal(); // Mostrar el modal
}

// Función para guardar los cambios
function guardarCambios(id) {
    const index = profesores.findIndex(profesor => profesor.id === profesorIdActual);
    if (index !== -1) {
        profesores[index].nombre = document.getElementById("nombre").value;
        profesores[index].email = document.getElementById("email").value;
        profesores[index].telefono = document.getElementById("telefono").value;
        profesores[index].rol = document.getElementById("rol").value;
        
        mostrarProfesores(profesores); // Volver a mostrar la lista actualizada
        cerrarModal(); // Cerrar el modal
        profesorIdActual = null; // Restablecer el ID actual
    }
}

// Modificar el evento de submit para el formulario
document.getElementById("form_nuevo_profesor").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevenir el envío del formulario

    if (profesorIdActual) {
        // Si hay un ID actual, estamos editando
        guardarCambios();
    } else {
        // De lo contrario, añadir un nuevo profesor
        añadirNuevoProfesor(event);
    }
});

// Agregar evento al icono de editar
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit_user")) {
        const divProfesor = event.target.closest(".profesor");
        const id = parseInt(divProfesor.id.split("_")[1]); // Extraer ID del div
        const profesor = profesores.find(p => p.id === id);
        abrirModalEdicion(profesor); // Abrir el modal de edición
    }
});


// Función para eliminar un profesor
function eliminarProfesor(id) {
    // Mostrar el modal de confirmación
    modalConfirmacionEliminar.style.display = "block";

    // Confirmar eliminación
    btnConfirmarEliminar.onclick = function() {
        // Encontrar el índice del profesor a eliminar
        const index = profesores.findIndex(profesor => profesor.id === id);
        // Si se encuentra el profesor, eliminarlo
        if (index !== -1) {
            profesores[index].descatalogado = true; // Marcar el profesor como eliminado
            mostrarProfesores(profesores); // Volver a mostrar la lista actualizada
            
            // Mostrar el mensaje de eliminación
            mostrarMensajeEliminacion();
        }
        modalConfirmacionEliminar.style.display = "none"; // Cerrar el modal
    };

    // Cancelar eliminación
    btnCancelarEliminar.onclick = function() {
        modalConfirmacionEliminar.style.display = "none"; // Cerrar el modal
    };

    // Cerrar el modal al hacer clic en la 'X'
    spanCerrarConfirmacion.onclick = function() {
        modalConfirmacionEliminar.style.display = "none"; // Cerrar el modal
    };
}

// Función para mostrar el mensaje de eliminación
function mostrarMensajeEliminacion() {
    const mensaje = document.getElementById("mensajeEliminacion");

    mensaje.style.display = "block"; // Mostrar el mensaje
    mensaje.style.opacity = "1"; // Hacerlo visible


    // Ocultar el mensaje y el overlay después de 2 segundos
    setTimeout(() => {
        mensaje.style.opacity = "0"; // Hacerlo invisible
        mensaje.style.transform = "translate(-50%, -50%) scale(1)"; // Restablecer el tamaño
        setTimeout(() => {
            mensaje.style.display = "none"; // Ocultar el mensaje
        }, 2000); // Tiempo de la transición
    }, 2000); // Tiempo que el mensaje estará visible
}


// Cerrar el modal al hacer clic fuera de él
window.onclick = function(event) {
    if (event.target === modalConfirmacionEliminar) {
        modalConfirmacionEliminar.style.display = "none"; // Cerrar el modal
    }
};

// Función para abrir la modal
function abrirModal() {
    modal.style.display = "block";
}

// Función para cerrar la modal
function cerrarModal() {
    modal.style.display = "none";
}

const botonMenu = document.getElementById("boton_menu");
const aside = document.getElementById("aside");
const header = document.getElementById("header");

botonMenu.addEventListener("click", () => {
    aside.classList.toggle("open"); // Alternar la clase 'open'
    header.classList.toggle("moved"); // Alternar la clase 'moved' en el header
});

// Exportar lista a excel
document.getElementById('boton_exportar').addEventListener('click', function() {
    const listaProfesores = document.getElementById("profesores-lista");
    const profesores = Array.from(listaProfesores.querySelectorAll('.profesor'));

    // Crear un array para los datos
    const datos = [['Profesor', 'Email', 'Teléfono', 'Rol', 'Descatalogado']]; // Añadir la cabecera para Descatalogado

    // Recorrer cada profesor y agregar su información
    profesores.forEach(profesor => {
        const nombre = profesor.querySelector('p:nth-child(1)').textContent;
        const email = profesor.querySelector('p:nth-child(2)').textContent;
        const telefono = profesor.querySelector('p:nth-child(3)').textContent;
        const rol = profesor.querySelector('p:nth-child(4)').textContent;
        const descatalogado = profesor.dataset.descatalogado === 'true' ? 'Sí' : 'No'; // Obtener estado de descatalogado
        // Agregar cada fila de datos
        datos.push([nombre, email, telefono, rol, descatalogado]);

        console.log(profesor);
        

    });

    // Convertir el array a formato CSV
    const csv = datos.map(row => row.map(value => `"${value.replace(/"/g, '""')}"`).join(";")).join("\n");

    // Crear un blob y un enlace para descargar
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', 'profesores.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
});
    

// Ejecutar funciones al cargar la página
window.onload = () => {
    
    mostrarProfesores(profesores);
    btnAddUsuario.onclick = abrirModal; // Abrir modal al hacer clic en el botón
    spanClose.onclick = cerrarModal; // Cerrar modal al hacer clic en "X"
    window.onclick = (event) => {
        if (event.target === modal) {
            cerrarModal(); // Cerrar modal al hacer clic fuera de ella
        }
    };
};