module.exports = function migration00006() {
  this.createTable('alerta_productos', function() {
    this.integer('producto_id', { references: 'productos.id', not_null: true, unsigned: true });
    this.integer('alerta_id', { references: 'alertas.id', not_null: true, unsigned: true });
  });

  this.createUniqueIndex('alerta_productos', ['producto_id', 'alerta_id']);
}
