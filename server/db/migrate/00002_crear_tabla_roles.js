module.exports = function migration_00002() {
  this.createTable('roles', function() {
    this.string('nombre', { not_null: true });
    this.integer('usuarios_id', { references: 'usuarios.id', unsigned: true });
  });
}
