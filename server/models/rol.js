const Store = require('openrecord/store/mysql');

class Sesion extends Store.BaseModel {
  static definition() {
    this.validatesPresenceOf('nombre');

    this.belongsTo('usuario');
  }
}

module.exports = Sesion;
