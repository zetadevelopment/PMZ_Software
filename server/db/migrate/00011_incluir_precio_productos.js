module.exports = function migration00011() {
  this.addColumn('productos', function() {
    this.float('precio', { not_null: true, default: 0.0 });
  });
}
