module.exports = function migration00003() {
  this.createTable('sesiones', function() {
    this.string('accion', { not_null: true });
    this.integer('usuarios_id', { references: 'usuarios.id', unsigned: true });
  });
}
