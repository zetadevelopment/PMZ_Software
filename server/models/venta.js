const Store = require('openrecord/store/mysql');

class Venta extends Store.BaseModel {
  static definition() {
    this.hasMany('facturas');
  }
}

module.exports = Venta;
