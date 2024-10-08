window.onload = function() {

    const datos = [
        { nombre: "Diego", email: "diego.blazquez@ucavila.es", telefono: "666666666", rol: "Admin" },
        { nombre: "Prueba", email: "prueba@ucavila.es", telefono: "699887454", rol: "Usuario" },
        { nombre: "Gestor01", email: "gestor@ucavila.es", telefono: "699777111", rol: "Usuario" }
    ];

    const profesoresList = document.getElementById('profesores-list');

    function agregarFila(dato) {

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
            acciones.appendChild(botonEditar);

        if (dato.rol !== "Admin") {
            const botonEliminar = document.createElement('span');
            botonEliminar.innerHTML = "delete";
            botonEliminar.className = "material-symbols-outlined";
            botonEliminar.style.cursor = "pointer";
            botonEliminar.onclick = function() {
                fila.remove();
            };
            acciones.appendChild(botonEliminar);
        }

        fila.appendChild(nombre);
        fila.appendChild(email);
        fila.appendChild(telefono);
        fila.appendChild(rol);
        fila.appendChild(acciones);

        profesoresList.appendChild(fila);
    }

    datos.forEach((dato) => {
        agregarFila(dato);
    });

    document.getElementById("nuevoUsuarioBtn").addEventListener("click", function() {
        agregarFila({
            nombre: "Nuevo Usuario",
            email: "nuevo.usuario@example.com",
            telefono: "555-555-5555",
            rol: "Usuario"
        });
    });
};
