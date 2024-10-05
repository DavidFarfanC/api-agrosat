// server.js
const express = require('express');
const app = express();
const axios = require('axios');

// Middleware para procesar el cuerpo de la solicitud como JSON
app.use(express.json());

// Ruta básica para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('API AgroSat funcionando correctamente');
});

// Ruta para recibir datos de sensores (POST)
app.post('/api/sensores', (req, res) => {
  const { humedad, temperatura, gps } = req.body;

  if (!humedad || !temperatura || !gps) {
    return res.status(400).json({ error: 'Faltan datos del sensor' });
  }

  // Aquí podrías almacenar los datos en la base de datos si lo necesitas
  console.log(`Datos recibidos: Humedad: ${humedad}, Temperatura: ${temperatura}, GPS: ${gps.latitud}, ${gps.longitud}`);
  
  res.status(200).json({ message: 'Datos recibidos correctamente' });
});

// Ruta para consultar datos de NASA (GET)
app.get('/api/nasa', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Se requieren coordenadas (lat, lon)' });
  }

  try {
    // Ejemplo simple de consulta a NASA (esto debería adaptarse a la API de NASA que estás usando)
    const response = await axios.get(`https://gpm.nasa.gov/data`, {
      params: {
        lat: lat,
        lon: lon
      }
    });

    const data = response.data;
    res.status(200).json({ nasa_data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos de NASA' });
  }
});

// Endpoint para el Health Check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
