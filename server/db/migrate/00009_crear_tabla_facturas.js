module.exports = function migration00009() {
  this.createTable('facturas', function() {
    this.integer('usuario_id', { references: 'usuarios.id', not_null: true, unsigned: true });
    this.integer('venta_id', { references: 'ventas.id', not_null: true, unsigned: true });
    this.integer('cajero_id', { references: 'usuarios.id', not_null: true, unsigned: true });
    this.float('subtotal', { not_null: true });
    this.float('total', { not_null: true });
    this.float('descuento', { not_null: true });
    this.datetime('created_at', { not_null: true, default: 'NOW()' });
  });
}
