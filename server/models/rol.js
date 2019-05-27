const Store = require('openrecord/store/mysql');

class Rol extends Store.BaseModel {
  static definition() {
    this.validatesPresenceOf('nombre');

    this.belongsTo('usuario');
  }
}

module.exports = Rol;
