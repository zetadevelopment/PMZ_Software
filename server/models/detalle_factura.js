const Store = require('openrecord/store/mysql');

class DetalleFactura extends Store.BaseModel {
  static definition() {
    this.hasMany('productos');
    this.hasMany('facturas');
  }
}

module.exports = DetalleFactura;
