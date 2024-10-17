window.addEventListener('load', function() {

    const datos = [
        { nombre: "Diego", apellido: "Blazquez", email: "diego.blazquez@ucavila.es", telefono: "666666666", rol: "Admin", eliminado: "no"},
        { nombre: "Prueba01", apellido: "01", email: "prueba@ucavila.es", telefono: "699887454", rol: "Usuario", eliminado: "no"},
        { nombre: "Gestor01", apellido: "01" , email: "gestor@ucavila.es", telefono: "699777111", rol: "Usuario", eliminado: "si" }
    ];

    const profesoresList = document.getElementById('profesores-list');
    const formbody = document.getElementById('form-container');
    const formConfirm = document.getElementById('form-container2');
    const avisoConfirm = document.getElementById('confirm-container');
    const mensaje_avisoConfirm = document.getElementById('avisoConfirm');
    const cbx_3 = document.getElementById("cbx-3");
    let editIndex = null;

    function agregarFila(dato, index) {

        const fila = document.createElement('div');
        fila.classList.add('fila');

        const nombre = document.createElement('div');
        nombre.textContent = dato.nombre;
        nombre.className = "nombre";

        const apellido = document.createElement('div');
        apellido.textContent = dato.apellido;
        apellido.className += "apellido";

        const email = document.createElement('div');
        email.textContent = dato.email;
        email.className += "email";

        const telefono = document.createElement('div');
        telefono.textContent = dato.telefono;
        telefono.className += "telefono";

        const rol = document.createElement('div');
        rol.textContent = dato.rol;
        rol.className += "rol";

        const acciones = document.createElement('div');

        const botonEditar = document.createElement('span');
        botonEditar.innerHTML = "edit";
        botonEditar.className = "material-symbols-outlined";
        botonEditar.style.cursor = "pointer";
        botonEditar.onclick = function() {
            cargarFormularioParaEdicion(fila, dato);
        };
        acciones.appendChild(botonEditar);

        if (dato.rol !== "Admin" && dato.eliminado === "no") {
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
                    
                    // Desactiva el checkbox cbx-3 y oculta filas eliminadas
                    cbx_3.checked = false;
                    filtrar(); // Aplica los filtros para ocultar las filas eliminadas
                    
                    mensaje_avisoConfirm.textContent = "Se ha borrado el usuario";
                    mensaje_avisoConfirm.style.backgroundColor = "red";
                    avisoConfirm.style.opacity = "100";
            
                    setTimeout(function() {
                        avisoConfirm.style.opacity = "0";
                        avisoConfirm.style.pointerEvents = "none";
                    }, 1500);

                    botonEliminar.style.display = "none";
            
                    console.log(datos);
                });
            };
            acciones.appendChild(botonEliminar);
        }
            
        fila.appendChild(nombre);
        fila.appendChild(apellido);
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
        document.getElementById("apellido").value = dato.apellido;
        document.getElementById("email").value = dato.email;
        document.getElementById("telefono").value = dato.telefono;
        document.getElementById("rol").value = dato.rol;

        formbody.style.opacity = "100"; 
        formbody.style.pointerEvents = "auto";  
        editIndex = fila; 
    }

    function actualizarFila(fila, dato) {
        fila.children[0].textContent = dato.nombre;
        fila.children[1].textContent = dato.apellido;
        fila.children[2].textContent = dato.email;
        fila.children[3].textContent = dato.telefono;
        fila.children[4].textContent = dato.rol;

        const index = Array.from(profesoresList.children).indexOf(fila); // Obtiene el índice de la fila en el DOM
        if (index !== -1) {
            datos[index] = { ...dato }; // Actualiza el array con los nuevos valores
        }
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

    const input_nombre = document.getElementById("nombre");
    const input_apellido = document.getElementById("apellido");
    const input_email = document.getElementById("email");

    input_nombre.addEventListener("input", generarEmail);
    input_apellido.addEventListener("input", generarEmail);

    function generarEmail() {
        const nombre = input_nombre.value.trim().toLowerCase();
        const apellido = input_apellido.value.trim().toLowerCase();
        if (nombre && apellido) {
            input_email.value = `${nombre}.${apellido}@ucavila.es`;
        }else{
            input_email.value = "";
        }
        
    }

    nuevoUsuarioForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const nuevoUsuario = {
            nombre: input_nombre.value.trim(),
            apellido: input_apellido.value.trim(),
            email: input_email.value.trim(),
            telefono: document.getElementById("telefono").value,
            rol: document.getElementById("rol").value,
            eliminado: "no"
        }

        if (editIndex === null) {
            agregarFila(nuevoUsuario, datos.length);
            datos.push(nuevoUsuario);
        } else {
            actualizarFila(editIndex, nuevoUsuario);
        }


        nuevoUsuarioForm.reset(); 
        formbody.style.opacity = "0"; 
        formbody.style.pointerEvents = "none"; 

        mensaje_avisoConfirm.textContent = "Se he agregado el usuario";
        mensaje_avisoConfirm.style.backgroundColor = "green";
        avisoConfirm.style.opacity = "100";

        setInterval(function() {
            avisoConfirm.style.opacity = "0";
            avisoConfirm.style.pointerEvents = "none";
        }, 1500);

        console.log(datos);
        
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
            ['Nombre', 'Apellido','Email', 'Teléfono', 'Rol', 'Descatalogado'], ...data
        ]);
        
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Hoja1');
        XLSX.writeFile(workBook, 'informeUsuarios.xlsx');
    });
    
    document.getElementById("cbx-3").addEventListener("change", function () {
        const filas = document.querySelectorAll('#profesores-list .fila');
        const isChecked = this.checked;
    
        filas.forEach((fila, index) => {
            const nombreTermino = document.getElementById("filtro-nombre").value.toLowerCase();
            const apellidoTermino = document.getElementById("filtro-apellido").value.toLowerCase();
            const emailTermino = document.getElementById("filtro-email").value.toLowerCase();
            const telefonoTermino = document.getElementById("filtro-telefono").value.toLowerCase();
            const rolSeleccionado = document.getElementById("filtro-rol").value;
    
            const nombre = fila.children[0].textContent.toLowerCase();
            const apellido = fila.children[1].textContent.toLowerCase();
            const email = fila.children[2].textContent.toLowerCase();
            const telefono = fila.children[3].textContent.toLowerCase();
            const rol = fila.children[4].textContent;
    
            const nombreCoincide = nombre.startsWith(nombreTermino);
            const apellidoCoincide = apellido.startsWith(apellidoTermino);
            const emailCoincide = email.startsWith(emailTermino);
            const telefonoCoincide = telefono.startsWith(telefonoTermino);
            const rolCoincide = rolSeleccionado === "" || rol === rolSeleccionado;
    
            if (isChecked) {
                // Se muestran todos los que coincidan con los filtros actuales (incluidos los eliminados)
                if (datos[index].eliminado === "si" && nombreCoincide && apellidoCoincide && emailCoincide && telefonoCoincide && rolCoincide) {
                    fila.style.display = "flex";
                    fila.className += " eliminado"
                } else if (datos[index].eliminado === "no" && nombreCoincide && apellidoCoincide && emailCoincide && telefonoCoincide && rolCoincide) {
                    fila.style.display = "flex"; // Mantener los no eliminados también si coinciden con los filtros
                } else {
                    fila.style.display = "none";
                }
            } else {
                // Si el checkbox no está activado, se aplican los filtros pero se ocultan los eliminados
                if (datos[index].eliminado === "no" && nombreCoincide && apellidoCoincide && emailCoincide && telefonoCoincide && rolCoincide) {
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
        const apellidoTermino = document.getElementById("filtro-apellido").value.toLowerCase();
        const emailTermino = document.getElementById("filtro-email").value.toLowerCase();
        const telefonoTermino = document.getElementById("filtro-telefono").value.toLowerCase();
        const rolSeleccionado = document.getElementById("filtro-rol").value;

        const checkbox2_checked = document.getElementById("cbx-3").checked;
        const filas = document.querySelectorAll('#profesores-list .fila');

        filas.forEach((fila, index) => {
            const nombre = fila.children[0].textContent.toLowerCase();
            const apellido = fila.children[1].textContent.toLowerCase();
            const email = fila.children[2].textContent.toLowerCase();
            const telefono = fila.children[3].textContent.toLowerCase();
            const rol = fila.children[4].textContent;
    
            const nombreCoincide = nombre.startsWith(nombreTermino);
            const apellidoCoincide = apellido.startsWith(apellidoTermino);
            const emailCoincide = email.startsWith(emailTermino);
            const telefonoCoincide = telefono.startsWith(telefonoTermino);
            const rolCoincide = rolSeleccionado === "" || rol === rolSeleccionado;

            if (datos[index].eliminado === "no" && nombreCoincide && apellidoCoincide && emailCoincide && telefonoCoincide && rolCoincide) {
                fila.style.display = "flex";
            }else if (checkbox2_checked && datos[index].eliminado === "si" && nombreCoincide && apellidoCoincide && emailCoincide && telefonoCoincide && rolCoincide) {
                fila.style.display = "flex";
                fila.className += " eliminado";
            }else {
                fila.style.display = "none";
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
    document.getElementById("filtro-apellido").addEventListener("keyup", filtrar);
    document.getElementById("filtro-email").addEventListener("keyup", filtrar);
    document.getElementById("filtro-telefono").addEventListener("keyup", filtrar);
    document.getElementById("filtro-rol").addEventListener("change", filtrar);

    document.getElementById("reset-filtro").addEventListener("click", function () {
        document.getElementById("filtro-nombre").value = "";
        document.getElementById("filtro-apellido").value = "";
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
                    fila.className += " eliminado"
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
            const apellidoTermino = document.getElementById("filtro-apellido").value.toLowerCase();
            const emailTermino = document.getElementById("filtro-email").value.toLowerCase();
            const telefonoTermino = document.getElementById("filtro-telefono").value.toLowerCase();
            const rolSeleccionado = document.getElementById("filtro-rol").value;
    
            const nombre = fila.children[0].textContent.toLowerCase();
            const apellido = fila.children[1].textContent.toLowerCase();
            const email = fila.children[2].textContent.toLowerCase();
            const telefono = fila.children[3].textContent.toLowerCase();
            const rol = fila.children[4].textContent;
    
            const nombreCoincide = nombre.startsWith(nombreTermino);
            const apellidoCoincide = apellido.startsWith(apellidoTermino);
            const emailCoincide = email.startsWith(emailTermino);
            const telefonoCoincide = telefono.startsWith(telefonoTermino);
            const rolCoincide = rolSeleccionado === "" || rol === rolSeleccionado;
    
            if (isChecked) {
                // Se muestran todos los que coincidan con los filtros actuales (solo los eliminados)
                if (datos[index].eliminado === "si" && nombreCoincide && apellidoCoincide && emailCoincide && telefonoCoincide && rolCoincide) {
                    fila.style.display = "flex";
                    fila.className += " eliminado";
                } else {
                    fila.style.display = "none";
                }
            } else {
                // Si el checkbox no está activado, se aplican los filtros pero se ocultan los eliminados
                if (datos[index].eliminado === "no" && nombreCoincide && apellidoCoincide && emailCoincide && telefonoCoincide && rolCoincide) {
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