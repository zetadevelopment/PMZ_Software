const Store = require('openrecord/store/mysql');

class Alerta extends Store.BaseModel {
  static definition() {
    this.validatesPresenceOf('nombre', 'autor');

    this.hasMany('alerta_productos');
    this.hasMany('productos', { through: 'alerta_productos', relation: 'productos' });
  }
}

module.exports = Alerta;
