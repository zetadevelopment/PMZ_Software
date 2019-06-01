const Store = require('openrecord/store/mysql');

class Factura extends Store.BaseModel {
  static definition() {
    this.hasMany('detalle_facturas');
    this.hasMany('productos', { through: 'detalle_facturas', relation: 'productos' });
    this.hasOne('venta');
  }
}

module.exports = Factura;
