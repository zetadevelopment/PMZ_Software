const express = require('express');
const Store = require('openrecord/store/mysql');
const path = require('path');

const store = new Store({
  type: 'mysql',
  autoLoad: true,
  database: 'maxisoft',
  host: '127.0.0.1',
  user: 'root',
  global: true,
  password: '',
  plugins: [require('openrecord/lib/base/dynamic_loading')],
  models: `${__dirname}/models/*`,
  migrations: `${__dirname}/db/migrate/*`,
  autoSave: true,
  // We need to add words here that are not detected by reflection module.
  inflection: {
    'alerta': 'alertas',
    'rols': 'roles',
    'sesions': 'sesiones',
    'venta': 'ventas'
  }
});

const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

store.ready(async () => {
  console.log('Conexión a base de datos completada');
  app.use(express.static(path.join(__dirname, '/..')));
  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../login.html'));
  });

  app.get('/css/:file', (req, res) => {
    if (req.params.file.endsWith('css')) {
      res.sendFile(path.join(__dirname, `/../${req.params.file}`));
    } else {
      res.sendStatus(404);
    }
  });

  app.get('/js/:file', (req, res) => {
    if (req.params.file.endsWith('js')) {
      res.sendFile(path.join(__dirname, `/../${req.params.file}`));
    } else {
      res.sendStatus(404);
    }
  });

  app.get('/:file', (req, res) => {
    if (req.params.file === 'favicon.ico') {
      res.sendStatus(200);
    } else {
      res.sendFile(path.join(__dirname, `/../${req.params.file}.html`));
    }
  });

  app.get('/cliente/:email', async (req, res) => {
    if (req.params.email) {
      let user = await Usuario.where({ email: req.params.email }).first();
      res.json({ ok: true, user: user && user.toJson() });
    } else {
      res.json({ ok: false });
    }
  });

  app.post('/cliente', async (req, res) => {
    if (req.body && req.body.nombre && req.body.email) {
      Usuario.create({
        nombre: req.body.nombre,
        apellido: req.body.nombre.split(' ')[1] || 'no-apellido',
        email: req.body.email,
        password: 'password',
      }).then((user) => {
        res.json({ ok: !!user, id: user && user.id });
      }).catch((er) => {
        res.json({ ok: false, error: er.message.sqlMessage });
      });
    } else {
      res.json({ ok: false, error: 'campos requeridos no definidos.' });
    }
  });

  app.post('/producto', async (req, res) => {
    let product;

    if (req.body && req.body.nombre && req.body.cantidad) {
      product = await Producto.create({
        nombre: req.body.nombre,
        codigo: 'COD',
        unidad: req.body.unidad || 'unidad',
        fecha_expiracion: new Date('2020-08-20T14:20:00'),
        cantidad: req.body.cantidad
      }).catch((er) => { console.log(er) });
    }

    res.json({ ok: !!product });
  });

  app.post('/factura', async (req, res) => {
    let usuario = await Usuario.where({ email: req.body.email }).first();
    let producto = await Producto.where({ id: req.body.producto_id }).first();

    if (usuario == null) {
      res.json({ ok: false, error: 'usuario no encontrado' });
    } else if (producto == null || producto.cantidad <= 0) {
      res.json({ ok: false, error: 'producto no encontrado o agotado' });
    } else {
      let venta = await Venta.create({
        valor_caja_inicial: 1000,
        valor_caja_final: 1000,
        created_at: new Date(),
      }).catch((er) => console.log('venta', er));

      let factura = await Factura.create({
        detalle_facturas: [{ producto_id: producto.id }],
        subtotal: req.body.subtotal,
        total: req.body.total,
        descuento: req.body.descuento || 0,
        venta_id: venta.id,
        usuario_id: usuario.id,
        cajero_id: usuario.id,
        created_at: new Date()
      });

      res.json({ ok: !!factura });
    }
  });

  app.listen(port, () => console.log(`Maxisoft running on port ${port}!`));
}).catch((e) => {
  console.log('Error intentando preparar la conexión a base de datos');
  console.error(e);
});

