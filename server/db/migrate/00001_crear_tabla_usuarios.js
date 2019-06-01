module.exports = function migration00001() {
  this.createTable('usuarios', function() {
    this.string('nombre', { not_null: true });
    this.string('apellido', { not_null: true });
    this.string('email', { not_null: true, unique: true });
    this.string('password', { not_null: true });
  });
}
