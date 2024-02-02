/**
 * Model.js: Funciones para manejar los datos y la lógica de negocio.
 * Este módulo proporciona funciones para mostrar información relacionada con la distancia y la compuerta.
 */

/**
 * Muestra la distancia recibida del sensor.
 * @param {number} value - El valor de la distancia.
 */
function displayDistancia(value) {
    // Esta función muestra la calidad del aire en la interfaz de usuario.
    // Ejemplo de uso: displayDistancia(50);
    // document.getElementById('quality').innerText = `Calidad del aire: ${value} PPM`;
}

/**
 * Muestra el estado de la compuerta.
 * @param {number} value - El valor del estado de la compuerta.
 */
function displayCompuerta(value){
    // Esta función muestra la temperatura en la interfaz de usuario.
    // Ejemplo de uso: displayCompuerta(25);
    // document.getElementById('temperature').innerText = `Temperatura: ${value} °C`;
}

// Exporta las funciones para ser utilizadas en otros módulos.
module.exports = { 
    displayDistancia, 
    displayCompuerta
};
