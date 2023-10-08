// Obtén una referencia al botón y al elemento que deseas poner en pantalla completa
const fullscreenButton = document.getElementById("fullscreenButton");
const elementoParaFullscreen = document.documentElement; // En este ejemplo, usamos el documento completo

// Agrega un manejador de eventos para el botón
fullscreenButton.addEventListener("click", () => {
  if (document.fullscreenElement) {
    // Si ya estás en modo de pantalla completa, sal del modo de pantalla completa
    document.exitFullscreen().catch((error) => {
      console.error("Error al salir de pantalla completa:", error);
    });
  } else {
    // Si no estás en modo de pantalla completa, solicita entrar en pantalla completa
    elementoParaFullscreen.requestFullscreen().catch((error) => {
      console.error("Error al entrar en pantalla completa:", error);
    });
  }
});
