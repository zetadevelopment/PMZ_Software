const Store = require('openrecord/store/mysql');

class Usuario extends Store.BaseModel {
  static definition() {
    // validaciones
    this.validatesPresenceOf('nombre', 'email', 'password');
    this.validatesFormatOf('email', 'email');
    this.validatesLengthOf('password', 8);

    // relaciones
    this.hasMany('sesiones');
    this.hasMany('roles');
  }

  nombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }
}

module.exports = Usuario;
