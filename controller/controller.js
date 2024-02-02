/**
 * Controller.js: Controlador para manejar las solicitudes HTTP, conexiones de socket y comunicación con el modelo.
 * Este controlador configura el servidor Express, maneja las solicitudes POST y GET, y gestiona las conexiones de socket.
 * Mencionar que donde se despliega la vista es la ip de tu maquina
 * Para inicializar el servidor es con npm start
*/
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const moment = require('moment');
const model = require('../model/model.js');

//app.use(express.static(path.join(__dirname, '../view/public/')));

/* Configuración de tipos MIME
app.use(express.static(path.join(__dirname, '../view/public/'), {
    setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.jsx')) {
        res.setHeader('Content-Type', 'text/jsx');
    }
    },
  })); */

// Configuración de Express y middleware
app.use(express.static(path.join(__dirname, '../view/public/dist/')));
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar las solicitudes POST de datos de sensores desde la ESP32
app.post('/', (req, res) => {
    const Distance = parseInt(req.body.Distance);
    const comp = parseFloat(req.body.comp);

    console.log(`DIST:${Distance}`);
    console.log(`COMP:${comp}`);

    // Puedes procesar los datos recibidos como lo necesites aquí
    // Por ejemplo, llamar al modelo o realizar otras operaciones

    // Ejemplo de envío de respuesta
    res.status(200).json({ message: 'Datos recibidos correctamente' });
});

// Ruta principal para cargar la vista
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/public/index.html'));
});

// Rutas GET para obtener datos de sensores
/*Las ip usadas en los get es donde queremos mandar la instruccion
en este caso la del esp32 */

app.get('/getDistance', async (req, res) => {
    let time = moment().format('YYYY-MM-DD HH:mm:ss'); // Formato de fecha y hora deseado
    console.log(`[${time}] METHOD: GET ${req.path}`);
    try {
        const response = await axios.get('http://192.168.100.5:8080' + req.path);
        const qualityData = response.data; // Suponiendo que la respuesta contiene los datos de calidad
        time = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(`[${time}] Distancia: ${qualityData} cm\n`);
        
        // Enviarlo como respuesta a la solicitud GET
        res.json({ quality: qualityData });
    } catch (error) {
        console.error('Error al obtener la distancia:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener la distancia' });
    }
});

app.get('/getGirar', async (req, res) => {
    let time = moment().format('YYYY-MM-DD HH:mm:ss'); // Formato de fecha y hora deseado
    console.log(`[${time}] METHOD: GET ${req.path}`);
    try {
        const response = await axios.get('http://192.168.100.5:8080' + req.path); // Cambiar la ruta según tu API local
        const compData = response.data; // Suponiendo que la respuesta contiene los datos de temperatura
        time = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(`[${time}] Compuerta abierta: ${compData}\n`);

        // Enviarlo como respuesta a la solicitud GET
        res.json({ comp: compData });
    } catch (error) {
        console.error('Error al mover el motor:', error);
        res.status(500).json({ error: 'No se pudo mover el motor' });
    }
});

// Manejo de conexiones de socket
io.on('connection', (socket) => {
    const time = moment().format('YYYY-MM-DD HH:mm:ss'); // Formato de fecha y hora deseado
    console.log(`[${time}] Usuario conectado`);

    // Emitir un mensaje al cliente para verificar eventos
    socket.emit('connected', 'Conexión establecida con el servidor');

    // Manejar la desconexión del usuario
    socket.on('disconnect', () => {
        const disconnectTime = moment().format('YYYY-MM-DD HH:mm:ss'); // Hora de desconexión
        console.log(`[${disconnectTime}] Usuario desconectado`);
    });
});

// Iniciar el servidor en un puerto específico
const PORT = 8080;
http.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

/*
En el contexto de Express.js, un framework de aplicaciones web para Node.js, el middleware es una función que tiene acceso al objeto de solicitud (req), al objeto de respuesta (res), y a la siguiente función de middleware en el ciclo de solicitud-respuesta de la aplicación.

El middleware se utiliza para realizar tareas como:

Procesar y modificar los datos de la solicitud.
Agregar propiedades o métodos adicionales a los objetos de solicitud y respuesta.
Ejecutar tareas de autenticación y autorización.
Manejar errores y excepciones.
Realizar registro y seguimiento de solicitudes.
 */