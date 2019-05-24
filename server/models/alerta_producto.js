const Store = require('openrecord/store/mysql');

class AlertaProducto extends Store.BaseModel {
  static definition() {
    this.hasOne('producto', { model: 'Producto' });
    this.hasOne('alerta', { model: 'Alerta' });
  }
}

module.exports = AlertaProducto;
