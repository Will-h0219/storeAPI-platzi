const express = require('express');
const cors = require('cors');
const routerApi = require('./routing');
const { config } = require('./config/config');

const { boomErrorHandler, errorHandler, logErrors } = require('./middlewares/errorHandler.middleware');

// Crear el servidor de express
const app = express();

// Whitelist CORS
// const whitelist = ['domain1.com', 'domain2.com'];
// app.use(cors({
//   origin: whitelist
// }));

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

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
