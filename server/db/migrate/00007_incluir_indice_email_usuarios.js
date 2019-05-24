module.exports = function migration00007() {
  this.createIndex('usuarios', ['email']);
}
