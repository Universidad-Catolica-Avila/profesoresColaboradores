
window.addEventListener('load', function() {

    const datos = [
        { nombre: "Diego", email: "diego.blazquez@ucavila.es", telefono: "666666666", rol: "Admin", eliminado: "no"},
        { nombre: "Prueba", email: "prueba@ucavila.es", telefono: "699887454", rol: "Usuario", eliminado: "no"},
        { nombre: "Gestor01", email: "gestor@ucavila.es", telefono: "699777111", rol: "Usuario", eliminado: "si" }
    ];

    const profesoresList = document.getElementById('profesores-list');
    const formbody = document.getElementById('form-container');
    const formConfirm = document.getElementById('form-container2');
    let editIndex = null;

    function agregarFila(dato, index) {

        const fila = document.createElement('div');
        fila.classList.add('fila');

        const nombre = document.createElement('div');
        nombre.textContent = dato.nombre;

        const email = document.createElement('div');
        email.textContent = dato.email;

        const telefono = document.createElement('div');
        telefono.textContent = dato.telefono;

        const rol = document.createElement('div');
        rol.textContent = dato.rol;

        const acciones = document.createElement('div');

        const botonEditar = document.createElement('span');
        botonEditar.innerHTML = "edit";
        botonEditar.className = "material-symbols-outlined";
        botonEditar.style.cursor = "pointer";
        botonEditar.onclick = function() {
            cargarFormularioParaEdicion(fila, dato);
        };
        acciones.appendChild(botonEditar);

        if (dato.rol !== "Admin") {
            const botonEliminar = document.createElement('span');
            botonEliminar.innerHTML = "delete";
            botonEliminar.className = "material-symbols-outlined";
            botonEliminar.style.cursor = "pointer";
            botonEliminar.onclick = function() {
                formConfirm.style.opacity = "100"; 
                formConfirm.style.pointerEvents = "auto";  
                document.getElementById("confirmarBtn").addEventListener("click", function() {
                    formConfirm.style.opacity = "0"; 
                    formConfirm.style.pointerEvents = "none";
                    datos[index].eliminado = "si"; 
                    fila.style.display = "none";
                    document.getElementById("cbx-3").checked = false;
               });
            };
            acciones.appendChild(botonEliminar);
        }

        fila.appendChild(nombre);
        fila.appendChild(email);
        fila.appendChild(telefono);
        fila.appendChild(rol);
        fila.appendChild(acciones);

        profesoresList.appendChild(fila);

        if (dato.eliminado === "si") {
            fila.style.display = "none";
        }
    }

    function cargarFormularioParaEdicion(fila, dato) {
        document.getElementById("nombre").value = dato.nombre;
        document.getElementById("email").value = dato.email;
        document.getElementById("telefono").value = dato.telefono;
        document.getElementById("rol").value = dato.rol;

        formbody.style.opacity = "100"; 
        formbody.style.pointerEvents = "auto";  
        editIndex = fila; 
    }

    function actualizarFila(fila, dato) {
        fila.children[0].textContent = dato.nombre;
        fila.children[1].textContent = dato.email;
        fila.children[2].textContent = dato.telefono;
        fila.children[3].textContent = dato.rol;
    }

    datos.forEach((dato, index) => {
        agregarFila(dato, index);
    });

    document.getElementById("nuevoUsuarioBtn").addEventListener("click", function() {
        formbody.style.opacity = "100"; 
        formbody.style.pointerEvents = "auto"; 
        nuevoUsuarioForm.reset(); 
        editIndex = null; 
    });

    /*
    document.getElementById("nombre").addEventListener("keyup", function(){
        this.value = this.value.replace(/[^a-z A-Z]/g, '')
    });
    */

    document.getElementById("telefono").addEventListener("keyup", function(){
        this.value = this.value.replace(/[^0-9]/g, '')
    });

    nuevoUsuarioForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const nuevoUsuario = {
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            telefono: document.getElementById("telefono").value,
            rol: document.getElementById("rol").value,
        }

        if (editIndex === null) {
            agregarFila(nuevoUsuario);
        } else {
            actualizarFila(editIndex, nuevoUsuario);
        }

        nuevoUsuarioForm.reset(); 
        formbody.style.opacity = "0"; 
        formbody.style.pointerEvents = "none"; 
    });

    document.getElementById("cancelBtn").addEventListener("click", function() {
        formbody.style.opacity = "0"; 
        formbody.style.pointerEvents = "none"; 

        formConfirm.style.opacity = "0"; 
        formConfirm.style.pointerEvents = "none"; 
    });

    document.getElementById("cancelBtn2").addEventListener("click", function() {
        formConfirm.style.opacity = "0"; 
        formConfirm.style.pointerEvents = "none"; 
    });

    document.getElementById("exportarTabla").addEventListener("click", function() {
        const data = [];
    
        const filas = document.querySelectorAll('#profesores-list .fila'); 
        filas.forEach((fila, index) => {
            const rowData = [];
            const cells = fila.children;

            for (let i = 0; i < cells.length - 1; i++) { 
                rowData.push(cells[i].textContent);
            }
    
            if (datos[index].eliminado === "si") {
                rowData.push("Sí");
            } else {
                rowData.push("No");
            }
    
            data.push(rowData);
        });

        console.log(data); 
    
        const workBook = XLSX.utils.book_new();
        const workSheet = XLSX.utils.aoa_to_sheet([
            ['Nombre', 'Email', 'Teléfono', 'Rol', 'Descatalogado'], ...data
        ]);
        
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Hoja1');
        XLSX.writeFile(workBook, 'informeUsuarios.xlsx');
    });
    
    document.getElementById("cbx-3").addEventListener("change", function () {
        const filas = document.querySelectorAll('#profesores-list .fila');
        const isChecked = this.checked;
    
        filas.forEach((fila, index) => {
            const nombreTermino = document.getElementById("filtro-nombre").value.toLowerCase();
            const emailTermino = document.getElementById("filtro-email").value.toLowerCase();
            const telefonoTermino = document.getElementById("filtro-telefono").value.toLowerCase();
            const rolSeleccionado = document.getElementById("filtro-rol").value;
    
            const nombre = fila.children[0].textContent.toLowerCase();
            const email = fila.children[1].textContent.toLowerCase();
            const telefono = fila.children[2].textContent.toLowerCase();
            const rol = fila.children[3].textContent;
    
            const nombreCoincide = nombre.includes(nombreTermino);
            const emailCoincide = email.includes(emailTermino);
            const telefonoCoincide = telefono.includes(telefonoTermino);
            const rolCoincide = rolSeleccionado === "" || rol === rolSeleccionado;
    
            if (isChecked) {
                // Se muestran todos los que coincidan con los filtros actuales (incluidos los eliminados)
                if (datos[index].eliminado === "si" && nombreCoincide && emailCoincide && telefonoCoincide && rolCoincide) {
                    fila.style.display = "flex";
                    fila.style.backgroundColor = "#F8D7DA"; // Color de eliminados
                } else if (datos[index].eliminado === "no" && nombreCoincide && emailCoincide && telefonoCoincide && rolCoincide) {
                    fila.style.display = "flex"; // Mantener los no eliminados también si coinciden con los filtros
                } else {
                    fila.style.display = "none";
                }
            } else {
                // Si el checkbox no está activado, se aplican los filtros pero se ocultan los eliminados
                if (datos[index].eliminado === "no" && nombreCoincide && emailCoincide && telefonoCoincide && rolCoincide) {
                    fila.style.display = "flex";
                } else {
                    fila.style.display = "none";
                }
            }
        });
    });
    
    
    //FILTRADO

    function filtrar() {
        const nombreTermino = document.getElementById("filtro-nombre").value.toLowerCase();
        const emailTermino = document.getElementById("filtro-email").value.toLowerCase();
        const telefonoTermino = document.getElementById("filtro-telefono").value.toLowerCase();
        const rolSeleccionado = document.getElementById("filtro-rol").value;

        const filas = document.querySelectorAll('#profesores-list .fila');

        filas.forEach(fila => {
            const nombre = fila.children[0].textContent.toLowerCase();
            const email = fila.children[1].textContent.toLowerCase();
            const telefono = fila.children[2].textContent.toLowerCase();
            const rol = fila.children[3].textContent;

            const nombreCoincide = nombre.includes(nombreTermino);
            const emailCoincide = email.includes(emailTermino);
            const telefonoCoincide = telefono.includes(telefonoTermino);
            const rolCoincide = rolSeleccionado === "" || rol === rolSeleccionado;

            if (nombreCoincide && emailCoincide && telefonoCoincide && rolCoincide) {
                fila.style.display = 'flex';
            } else {
                fila.style.display = 'none';
            }
        });
    }
    /*
    document.getElementById("filtro-nombre").addEventListener("keyup", function(){
        this.value = this.value.replace(/[^a-z A-Z]/g, '')
    });
    */

    document.getElementById("filtro-telefono").addEventListener("keyup", function(){
        this.value = this.value.replace(/[^0-9]/g, '')
    });

    document.getElementById("filtro-nombre").addEventListener("keyup", filtrar);
    document.getElementById("filtro-email").addEventListener("keyup", filtrar);
    document.getElementById("filtro-telefono").addEventListener("keyup", filtrar);
    document.getElementById("filtro-rol").addEventListener("change", filtrar);

    document.getElementById("reset-filtro").addEventListener("click", function () {
        document.getElementById("filtro-nombre").value = "";
        document.getElementById("filtro-email").value = "";
        document.getElementById("filtro-telefono").value = "";
        document.getElementById("filtro-rol").value = "";
        document.getElementById("filtro-descatalogado");


        const checkbox1_checked = document.getElementById("filtro-descatalogado").checked = false;
        const checkbox2_checked = document.getElementById("cbx-3").checked;

        const filas = document.querySelectorAll('#profesores-list .fila');

        filas.forEach((fila, index) => {
            if (checkbox1_checked) {
                if (datos[index].eliminado === "si") {
                    fila.style.display = "flex";
                } else {
                    fila.style.display = "none";
                }
            } 
            else if (checkbox2_checked) {
                fila.style.display = "flex"; 
            } 
            else {
                if (datos[index].eliminado === "no") {
                    fila.style.display = "flex"; 
                } else {
                    fila.style.display = "none";
                }
            }
        });
    });

    document.getElementById("filtro-descatalogado").addEventListener("change", function () {
        const filas = document.querySelectorAll('#profesores-list .fila');
        const isChecked = this.checked;
    
        filas.forEach((fila, index) => {
            const nombreTermino = document.getElementById("filtro-nombre").value.toLowerCase();
            const emailTermino = document.getElementById("filtro-email").value.toLowerCase();
            const telefonoTermino = document.getElementById("filtro-telefono").value.toLowerCase();
            const rolSeleccionado = document.getElementById("filtro-rol").value;
    
            const nombre = fila.children[0].textContent.toLowerCase();
            const email = fila.children[1].textContent.toLowerCase();
            const telefono = fila.children[2].textContent.toLowerCase();
            const rol = fila.children[3].textContent;
    
            const nombreCoincide = nombre.includes(nombreTermino);
            const emailCoincide = email.includes(emailTermino);
            const telefonoCoincide = telefono.includes(telefonoTermino);
            const rolCoincide = rolSeleccionado === "" || rol === rolSeleccionado;
    
            if (isChecked) {
                // Se muestran todos los que coincidan con los filtros actuales (solo los eliminados)
                if (datos[index].eliminado === "si" && nombreCoincide && emailCoincide && telefonoCoincide && rolCoincide) {
                    fila.style.display = "flex";
                    fila.style.backgroundColor = "#F8D7DA";
                } else {
                    fila.style.display = "none";
                }
            } else {
                // Si el checkbox no está activado, se aplican los filtros pero se ocultan los eliminados
                if (datos[index].eliminado === "no" && nombreCoincide && emailCoincide && telefonoCoincide && rolCoincide) {
                    fila.style.display = "flex";
                } else {
                    fila.style.display = "none";
                }
            }
        });
    });

    /*FUNCION PARA NO PODER TENER LOS DOS CHECKBOX ACTIVOS AL MISMO TIEMPO*/
    function uncheck(){
        var checkbox1 = document.getElementById("filtro-descatalogado");
        var checkbox2 = document.getElementById("cbx-3");
        checkbox1.onclick = function(){
        if(checkbox1.checked != false){
           checkbox2.checked =null;
        }
    }
    checkbox2.onclick = function(){
        if(checkbox2.checked != false){
            checkbox1.checked=null;
        }
      }
    }

    document.getElementById("filtro-descatalogado").addEventListener("click", function() {
        uncheck();
    });
    document.getElementById("cbx-3").addEventListener("click", function() {
        uncheck();
    });

});
