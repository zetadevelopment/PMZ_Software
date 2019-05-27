module.exports = function migration00010() {
  this.createTable('detalle_facturas', function() {
    this.integer('producto_id', { references: 'productos.id', not_null: true, unsigned: true });
    this.integer('factura_id', { references: 'facturas.id', not_null: true, unsigned: true });

    this.timestamp();
  });
}
