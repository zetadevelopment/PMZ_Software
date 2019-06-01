$(() => {
  document.querySelector('#cash').addEventListener('change', function() {
    $('.card-details').hide();
  });

  document.querySelector('#credit').addEventListener('change', function() {
    $('.card-details').show();
  });

  document.querySelector('#debit').addEventListener('change', function() {
    $('.card-details').show();
  });

  let email = document.querySelector('#email');

  email.addEventListener('blur', (evt) => {
    $.get(`/cliente/${email.value}`, (res) => {
      console.log(res);
      document.querySelector('#firstName').value = res.user.nombre;
      document.querySelector('#lastName').value = res.user.apellido;
      document.querySelector('#username').value = res.user.email;
    });
  });

  let productosAdded = [];
  let addProducto = (nombre, unidad, precio) => {
    let li = document.createElement('li');
    let div = document.createElement('div');
    li.classList.add('list-group-item');
    li.classList.add('d-flex');
    li.classList.add('justify-content-between');
    li.classList.add('lh-condensed');
    div.innerHTML = `<h6 class="my-0">${nombre}, ${unidad}</h6>`;
    div.innerHTML += `<small class="text-muted"></small>`;
    li.appendChild(div);
    li.innerHTML += `<span class="text-muted">$${precio}</span>`;
    document.querySelector('#appendProduct').appendChild(li);

    let total = productosAdded.reduce((memo, prod) => {
      return memo += prod.precio;
    }, 0);
    document.querySelector('#precioFinalValue').innerHTML = `$${total}`;
    document.querySelector('#itemsCarrito').innerHTML = productosAdded.length;
  };


  document.querySelector('#crearProducto').addEventListener('click', () => {
    let nombre = document.querySelector('#producto_nombre').value;
    let unidad = document.querySelector('#producto_unidad').value;
    let cantidad = Math.floor(10 + Math.random() % 10000);
    let precio = parseFloat(document.querySelector('#producto_precio').value);

    if (productosAdded.includes({ nombre: nombre.trim().toLowerCase() })) {
      productosAdded.push({
        nombre: nombre.trim().toLowerCase(),
        precio: precio
      });

      addProducto(nombre, unidad, precio);
    } else {
      productosAdded.push({
        nombre: nombre.trim().toLowerCase(),
        precio: precio
      });

      $.post('/producto', {
        nombre,
        unidad,
        cantidad,
        precio
      }, (res) => {
        console.log('crear producto', res)

        if (res.ok) {
          addProducto(nombre, unidad, precio);
        }
      });
    }
  });
});
