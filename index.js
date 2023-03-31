require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routerApi = require('./routing');

const { boomErrorHandler, errorHandler, logErrors } = require('./middlewares/errorHandler.middleware');

// Crear el servidor de express
const app = express();

// CORS
app.use(cors())

// Lectura y parseo del body
app.use(express.json());

// Rutas
routerApi(app);

// Error middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
