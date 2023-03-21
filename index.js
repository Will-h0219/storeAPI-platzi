require('dotenv').config();

const express = require('express');
const routerApi = require('./routing');

// Crear e servidor de express
const app = express();

// Lectura y parseo del body
app.use(express.json());

// Rutas
routerApi(app);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
