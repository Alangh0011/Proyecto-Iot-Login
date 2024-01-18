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

app.use(express.static(path.join(__dirname, '../view/public/dist/')));

  // Middleware para analizar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Middleware para analizar application/x-www-form-urlencoded
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

// Rutas GET
app.get('/getDistance', async (req, res) => {
    let time = moment().format('YYYY-MM-DD HH:mm:ss'); // Formato de fecha y hora deseado
    console.log(`[${time}] METHOD: GET ${req.path}`);
    try {
        const response = await axios.get('http://192.168.0.5:8080' + req.path);
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
        const response = await axios.get('http://192.168.0.5:8080' + req.path); // Cambiar la ruta según tu API local
        const compData = response.data; // Suponiendo que la respuesta contiene los datos de temperatura
        time = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(`[${time}] Compuerta abierta: ${compData}\n`);

        // Enviarlo como respuesta a la solicitud GET
        res.json({ comp: compData });
    } catch (error) {
        console.error('Error al mover el motor:', error);
        res.status(500).json({ error: 'no se puedo mover el motor' });
    }
});

// Al conectar un usuario
io.on('connection', (socket) => {
    const time = moment().format('YYYY-MM-DD HH:mm:ss'); // Formato de fecha y hora deseado
    console.log(`[${time}] Usuario conectado`);

    // Mensaje de registro para verificar eventos
    socket.emit('connected', 'Conexión establecida con el servidor');

    socket.on('disconnect', () => {
        const disconnectTime = moment().format('YYYY-MM-DD HH:mm:ss'); // Hora de desconexión
        console.log(`[${disconnectTime}] Usuario desconectado`);
    });
});

// Verificar la conexión del servidor a un puerto específico
const PORT = 8080;
http.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});