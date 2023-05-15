const { Client } = require('pg');

```
No se recomienda esta forma ya que cada vez que se realice una consulta
se crea una nueva instacnia, no es optimo.
Se recomienda el uso de pool
```
async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'william',
    password: 'admin123',
    database: 'my_store'
  });

  await client.connect();

  return client;
}

module.exports = getConnection;
