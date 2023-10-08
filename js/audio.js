// Obtén una referencia al elemento de audio y al botón de pausa
const miCancion = document.getElementById("miCancion");
const pausarBoton = document.getElementById("pausarBoton");

// Agrega un manejador de eventos para el botón de pausa
pausarBoton.addEventListener("click", () => {
  if (miCancion.paused) {
    miCancion.play(); // Si está pausada, reanuda la reproducción
  } else {
    miCanción.pause(); // Si está reproduciéndose, pausa la reproducción
  }
});
