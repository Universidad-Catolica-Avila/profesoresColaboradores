window.onload = function () {
    document.querySelector(".bars").addEventListener("click", ocultarMostrarLateral);
    document.querySelector(".expand").addEventListener("click", mostrarPantallaCompleta);
    document.querySelector(".boton-nuevo").addEventListener("click", añadirUsuario);
    document.querySelector("#descatalogados").addEventListener("change", ocultarMostrarProfesores);
    document.querySelector("#nombre-filtrar").addEventListener("keyup", cargarUsuarios);
    document.querySelector("#correo-filtrar").addEventListener("keyup", cargarUsuarios);
    document.querySelector("#telefono-filtrar").addEventListener("keyup", cargarUsuarios);
    document.querySelector("#rol-filtrar").addEventListener("keyup", cargarUsuarios);
    document.querySelector(".boton-exportar").addEventListener("click", exportarExcel);
    cargarUsuarios();
}

let isVisible = true;
let UserIndex = null;
let currentPage = 1;//pagina actual de la paginación
let rowsPerPage = 3;// cuantos usuarios se mostraran por página
let realIndex = null;//recogemos el index 
let check = false;//saber cuando hemos pulsado el check de descatalogados

const usuariosOriginales = [
    { nombre: "Esteban", email: "esteban1@gmail.com", telefono: "610235478", rol: "Admin", eliminado: false },
    { nombre: "jose juan", email: "joseJuan@gmail.com", telefono: "674123569", rol: "Usuario", eliminado: false },
    { nombre: "Ernesto", email: "Ernesto@gmail.com", telefono: "600147855", rol: "Admin", eliminado: false },
    { nombre: "cesar", email: "cesar@gmail.com", telefono: "665214788", rol: "Usuario", eliminado: false },
    { nombre: "jose", email: "jose@gmail.com", telefono: "687410235", rol: "Usuario", eliminado: false },
    { nombre: "ester", email: "estar@gmail.com", telefono: "623014785", rol: "Admin", eliminado: false },
    { nombre: "juan", email: "juan@gmail.com", telefono: "698231478", rol: "Empleado", eliminado: false },
    { nombre: "irene", email: "irne@gmail.com", telefono: "623589741", rol: "Empleado", eliminado: false },

];
let usuarios = [...usuariosOriginales];

let textoInformativo = [
    { texto: "Usuario añadido", icono: `<i class="fa-solid fa-user-plus"></i>` },
    { texto: "Usuario eliminado", icono: `<i class="fa-solid fa-user-xmark"></i>` },
    { texto: "Usuario editado", icono: `<i class="fa-solid fa-user-pen"></i>` },
    { texto: "No puedes borrar un profesor descatalogado", icono: `<i class="fa-solid fa-xmark"></i>` },
    { texto: "No puedes editar un profesor descatalogado", icono: `<i class="fa-solid fa-xmark"></i>` },
    { texto: "Asegurate de que todos los campos sean válidos", icono: `<i class="fa-solid fa-xmark"></i>` }
]

function ocultarMostrarLateral() {
    const lateral = document.querySelector(".lateral");
    const cabecera = document.querySelector(".cabecera");
    const menu = document.querySelector(".menu");

    if (isVisible) {
        lateral.classList.add('hidden');
        cabecera.classList.remove('normal-width');
        cabecera.classList.add('full-width');
        menu.classList.remove('normal-width');
        menu.classList.add('full-width');
    } else {
        lateral.classList.remove('hidden');
        menu.classList.remove('full-width');
        cabecera.classList.remove('full-width');
        cabecera.classList.add('normal-width');
    }

    isVisible = !isVisible;
}

function mostrarPantallaCompleta() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error al intentar habilitar pantalla completa: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Funciones de validación
function validarNombre(nombre) {
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ]+$/; // Solo letras 
    return regex.test(nombre);
}

function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato de correo
    return regex.test(correo);
}

function validarTelefono(telefono) {
    const regex = /^[0-9]{9}$/; // Solo números, solamente valido con 9 numeros
    return regex.test(telefono);
}

function validarRol(rol) {
    const rolesPermitidos = ['admin', 'usuario']; // Ejemplo de roles permitidos
    return rolesPermitidos.includes(rol.toLowerCase());
}

// Función para cargar usuarios
function cargarUsuarios() {
    const tabla = document.getElementById('userTable');
    tabla.innerHTML = '';

    const filaEncabezado = document.createElement("tr");
    const encabezados = ["Nombre", "Correo electrónico", "Número", "Rol", "Acciones"];

    encabezados.forEach(encabezado => {
        const th = document.createElement("th");
        th.textContent = encabezado;
        filaEncabezado.appendChild(th);
    });

    tabla.appendChild(filaEncabezado);

    // Obtener los valores de los inputs de filtrar
    const nombreValue = document.querySelector("#nombre-filtrar").value.toLowerCase();
    const correoValue = document.querySelector("#correo-filtrar").value.toLowerCase();
    const telefonoValue = document.querySelector("#telefono-filtrar").value;
    const rolValue = document.querySelector("#rol-filtrar").value.toLowerCase();

    // Filtrar los datos
    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.nombre.toLowerCase().startsWith(nombreValue) &&
        usuario.email.toLowerCase().startsWith(correoValue) &&
        usuario.telefono.startsWith(telefonoValue) &&
        usuario.rol.toLowerCase().startsWith(rolValue)
    );

    //paginacion
    const totalPages = Math.ceil(usuariosFiltrados.length / rowsPerPage); //saber numero de paginas, ceil redondea para arriba.
    const paginateUsers = usuariosFiltrados.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage); //calcula los datos que debe mostrar ,0-2,3-5
    // Iterar sobre los usuarios y crear filas
    paginateUsers.forEach((usuario, index) => {
        const fila = document.createElement('tr');
        if (usuario.eliminado) fila.classList.add("color-rojo");

        const celdas = [usuario.nombre, usuario.email, usuario.telefono, usuario.rol];
        celdas.forEach(text => {
            const celda = document.createElement('td');
            celda.textContent = text;
            fila.appendChild(celda);
        });

        const celdaAcciones = document.createElement('td');
        celdaAcciones.innerHTML = `
            <i class="fa-solid fa-pen edit"></i>
            <i class="fa-solid fa-trash-can delete"></i>
        `;
        //BORRAR    
        celdaAcciones.querySelector('.delete').addEventListener('click', () => {
            if (check === false) {
                if (usuario.eliminado === false) {

                    realIndex = usuarios.indexOf(usuario);//recoge el index real de usuario 
                    if (confirm(`¿Estás seguro que quieres eliminar a ${usuario.nombre}?`)) {
                        eliminarUsuario(realIndex);
                    }
                } else {
                    //borrar
                    let texto = textoInformativo[3].texto;
                    let icono = textoInformativo[3].icono;
                    let modalInformativa = document.querySelector(".modalInformativa");

                    modalInformativa.innerHTML = `
                 <div class="modal-content-informativa fondo-rojo">${texto} ${icono}</div>
                 
                `
                    modalInformativa.style.display = "flex";
                    setInterval(() => {
                        modalInformativa.style.display = "none";
                    }, 1500);
                }
            }else{
                let modalInformativa = document.querySelector(".modalInformativa");

                modalInformativa.innerHTML = `
                  <div class="modal-content-informativa fondo-rojo"> No puedes eliminar usuarios estando en profesores descatalogados</div>
                 `;
                 
                modalInformativa.style.display="flex";
                 setInterval(()=>{
                    modalInformativa.style.display="none";
                 },1500);

            }
        });
        //editar
        celdaAcciones.querySelector('.edit').addEventListener('click', () => {
            UserIndex = usuarios.indexOf(usuario);;
            if (usuario.eliminado === false) {


                abrirEditModal(usuario);
            } else {
                //editar
                let texto = textoInformativo[4].texto;
                let icono = textoInformativo[4].icono;
                let modalInformativa = document.querySelector(".modalInformativa");

                modalInformativa.innerHTML = `
                  <div class="modal-content-informativa fondo-rojo">${texto} ${icono}</div>
                 `
                modalInformativa.style.display = "flex";
                setTimeout(() => {
                    modalInformativa.style.display = "none";
                }, 1500);

            }
        });

        fila.appendChild(celdaAcciones);
        tabla.appendChild(fila);
    });
    setupPagination(totalPages);
}
//paginacion
function setupPagination(totalPages) {
    const prevButton = document.querySelector("#prevButton");
    const nextButton = document.querySelector("#nextButton");
    const page = document.querySelector("#pageButtons");

    prevButton.disabled = currentPage === 1;//desabilitar el boton de anterior cuadno estemos en la pagina 1
    nextButton.disabled = currentPage === totalPages; //desabiliar el boton siguiente cuando estemos en la ultima pagina

    // Actualizar la página mostrada
    page.innerHTML = `Página ${currentPage} de ${totalPages}`;

    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            cargarUsuarios();
        }
    };
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            cargarUsuarios();
        }
    }
}
// Función eliminar usuario
function eliminarUsuario(index) {
    usuarios[index].eliminado = true;
    let texto = textoInformativo[1].texto;
    let icono = textoInformativo[1].icono;
    let modal = document.querySelector(".modalInformativa");

    // Muestra el modal
    modal.innerHTML = `
  <div class="modal-content-informativa fondo-verde">${texto} ${icono}</div>
`;
    modal.style.display = 'block'; // Asegúrate de que el modal se muestre

    // Oculta el modal después de 2 segundos
    setTimeout(() => {
        modal.style.display = 'none'; // Oculta el modal
    }, 1000); // Tiempo que se muestra (2 segundos)

    cargarUsuarios();
}

// Función de editar usuario
function abrirEditModal(usuario) {
    const modal = document.querySelector("#modal-modificar");
    document.getElementById("nombre-edit").value = usuario.nombre;
    document.getElementById("email-edit").value = usuario.email;
    document.getElementById("numero-edit").value = usuario.telefono;
    document.getElementById("rol-edit").value = usuario.rol;
    modal.style.display = 'block';

    document.querySelector(".btn-modificar").onclick = function () {
        const nuevoNombre = document.getElementById("nombre-edit").value;
        const nuevoEmail = document.getElementById("email-edit").value;
        const nuevoNumero = document.getElementById("numero-edit").value;
        const nuevoRol = document.getElementById("rol-edit").value;

        if (validarNombre(nuevoNombre) && validarCorreo(nuevoEmail) && validarTelefono(nuevoNumero) && validarRol(nuevoRol)) {
            usuarios[UserIndex] = { nombre: nuevoNombre, email: nuevoEmail, telefono: nuevoNumero, rol: nuevoRol, eliminado: false };
            modal.style.display = "none";
            /*texto informativo*/
            let texto = textoInformativo[2].texto;
            let icono = textoInformativo[2].icono;
            let modalInformativa = document.querySelector(".modalInformativa");

            // Muestra el modal
            modalInformativa.innerHTML = `
              <div class="modal-content-informativa fondo-verde">${texto} ${icono}</div>
            `;
            modalInformativa.style.display = 'flex'; // Asegúrate de que el modal se muestre
            setTimeout(() => {
                modalInformativa.style.display = "none";
            }, 1000);

            cargarUsuarios();
        } else {
            modal.style.display = "none";
            /*texto informativo*/
            let texto = textoInformativo[5].texto;
            let icono = textoInformativo[5].icono;
            let modalInformativa = document.querySelector(".modalInformativa");
            // Muestra el modal
            modalInformativa.innerHTML = `
          <div class="modal-content-informativa fondo-rojo">${texto} ${icono}</div>
        `;
            modalInformativa.style.display = 'flex'; // Asegúrate de que el modal se muestre

            // Oculta el modal después de 1 segundos
            setTimeout(() => {
                modalInformativa.style.display = 'none'; // Oculta el modal
                modal.style.display = 'block'; // Oculta el modal

            }, 1000); // Tiempo que se muestra (2 segundos)

        }
    };
    document.querySelector(".btn-cancelar-modificar").onclick = function () {
        modal.style.display = "none";
    };
}

function añadirUsuario() {
    const modal = document.querySelector("#modal-añadir");
    document.getElementById("nombre-add").value = "";
    document.getElementById("email-add").value = "";
    document.getElementById("numero-add").value = "";
    document.getElementById("rol-input-add").value = "";

    modal.style.display = 'block';

    document.querySelector(".btn-añadir").onclick = function () {
        const nuevoNombre = document.getElementById("nombre-add").value;
        const nuevoEmail = document.getElementById("email-add").value;
        const nuevoNumero = document.getElementById("numero-add").value;
        const nuevoRol = document.getElementById("rol-input-add").value;

        if (validarNombre(nuevoNombre) && validarCorreo(nuevoEmail) && validarTelefono(nuevoNumero) && validarRol(nuevoRol)) {
            usuarios.push({ nombre: nuevoNombre, email: nuevoEmail, telefono: nuevoNumero, rol: nuevoRol, eliminado: false });
            modal.style.display = "none";
            /*texto informativo*/
            let texto = textoInformativo[0].texto;
            let icono = textoInformativo[0].icono;
            let modalInformativa = document.querySelector(".modalInformativa");

            // Muestra el modal
            modalInformativa.innerHTML = `
              <div class="modal-content-informativa fondo-verde">${texto} ${icono}</div>
            `;
            modalInformativa.style.display = 'flex'; // Asegúrate de que el modal se muestre
            setTimeout(() => {
                modalInformativa.style.display = "none";
            }, 1000);

            cargarUsuarios();
        } else {
            modal.style.display = "none";
            /*texto informativo*/
            let texto = textoInformativo[5].texto;
            let icono = textoInformativo[5].icono;
            let modalInformativa = document.querySelector(".modalInformativa");
            // Muestra el modal
            modalInformativa.innerHTML = `
          <div class="modal-content-informativa fondo-rojo">${texto} ${icono}</div>
        `;
            modalInformativa.style.display = 'flex'; // Asegúrate de que el modal se muestre

            // Oculta el modal después de 1 segundos
            setTimeout(() => {
                modalInformativa.style.display = 'none'; // Oculta el modal
                modal.style.display = 'block'; // Oculta el modal

            }, 1000); // Tiempo que se muestra (2 segundos)

        }
    };

    document.querySelector(".btn-cancelar-añadir").onclick = function () {
        modal.style.display = "none";
    };
}

function ocultarMostrarProfesores() {
    let checkValue = document.querySelector("#descatalogados").checked;

    if (checkValue) {
        check = true;
        usuarios = usuariosOriginales.filter(usuario => !usuario.eliminado);

    } else {
        check = false;
        usuarios = [...usuariosOriginales];

    }
    cargarUsuarios();
}
function exportarExcel() {
    const table = document.getElementById("userTable");

    // Convertir la tabla HTML a una hoja de trabajo
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Usuarios" });

    // Exportar el libro de trabajo a un archivo Excel
    XLSX.writeFile(workbook, "usuarios.xlsx");
}
