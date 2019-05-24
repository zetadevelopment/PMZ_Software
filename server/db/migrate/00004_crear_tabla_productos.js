module.exports = function migration00004() {
  this.createTable('productos', function() {
    this.string('nombre', { not_null: true });
    this.string('codigo', { not_null: true });
    this.string('unidad');
    this.date('fecha_expiracion', { not_null: true });
    this.integer('cantidad', { not_null: true, unsigned: true });
    this.timestamp();
  });
}
