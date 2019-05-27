module.exports = function migration00008() {
  this.createTable('ventas', function() {
    this.boolean('confirmada', { default: true });
    this.boolean('anulada', { default: false });
    this.float('valor_caja_inicial', { not_null: true });
    this.float('valor_caja_final', { not_null: true });

    this.timestamp();
  });
}
