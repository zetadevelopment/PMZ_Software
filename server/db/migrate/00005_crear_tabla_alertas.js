module.exports = function migration00005() {
  this.createTable('alertas', function() {
    this.string('nombre', { not_null: true });
    this.string('autor', { not_null: true });
    this.boolean('cantidad', { default: false });
    this.boolean('fecha_expiracion', { default: false });
  });
}
