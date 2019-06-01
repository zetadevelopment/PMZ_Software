const Store = require('openrecord/store/mysql');

class Producto extends Store.BaseModel {
  static definition() {
    this.validatesPresenceOf('nombre', 'codigo', 'cantidad');
    // this.validatesFormatOf('fecha_expiracion', 'date');
    this.validatesNumericalityOf('cantidad', { gt: 0 });

    this.hasMany('alerta_productos');
    this.hasMany('alertas', { through: 'alerta_productos', relation: 'alertas' });
  }

  esta_expirado() {
    return this.fecha_expiracion <= Date.now();
  }

  hay_existencia(cantidad_minima = 0) {
    return this.cantidad > cantidad_minima;
  }

  stock() {
    return `${this.cantidad} ${this.unidad}`.trim();
  }
}

module.exports = Producto;
