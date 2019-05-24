const Store = require('openrecord/store/mysql');

class Sesion extends Store.BaseModel {
  static definition() {
    this.validatesPresenceOf('accion', 'usuarios_id');

    this.belongsTo('usuario');
  }
}

module.exports = Sesion;
