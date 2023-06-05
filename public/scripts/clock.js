window.addEventListener('DOMContentLoaded', function () {
    // Obtener la referencia del elemento del contador
    const countdownElement = document.getElementById('countdown');

    // Establecer la hora inicial (en segundos)
    let timeLeft = 3600; // 1 hora

    // Función para actualizar el contador
    function updateCountdown() {
        // Convertir el tiempo restante a formato hh:mm:ss
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        // Mostrar el tiempo restante en el elemento del contador
        countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Restar 1 segundo al tiempo restante
        timeLeft--;

        // Comprobar si el tiempo ha llegado a cero
        if (timeLeft < 0) {
            // Cerrar la página
            window.close();
        }
    }

    // Actualizar el contador cada segundo
    setInterval(updateCountdown, 1000);
});