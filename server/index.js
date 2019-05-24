const express = require('express');
const Store = require('openrecord/store/mysql');
const path = require('path');

const store = new Store({
  type: 'mysql',
  autoLoad: true,
  database: 'maxisoft',
  host: '127.0.0.1',
  user: 'root',
  password: '',
  plugins: [require('openrecord/lib/base/dynamic_loading')],
  migrations: `${__dirname}/db/migrate/*`,
  models: `${__dirname}/models/*`
});

const app = express();
const port = process.env.PORT || 3000;

store.ready(async () => {
  console.log('Conexión a base de datos completada');
});

app.use(express.static(path.join(__dirname, '/..')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../login.html'));
});

app.listen(port, () => console.log(`Maxisoft running on port ${port}!`));
