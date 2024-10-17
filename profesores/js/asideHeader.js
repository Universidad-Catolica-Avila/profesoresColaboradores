const botonMenu = document.getElementById("boton_menu");
const aside = document.getElementById("aside");
const header = document.getElementById("header");

botonMenu.addEventListener("click", () => {
    aside.classList.toggle("open"); // Alternar la clase 'open'
    header.classList.toggle("moved"); // Alternar la clase 'moved' en el header
});


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

window.onload = () => {
    
    
};