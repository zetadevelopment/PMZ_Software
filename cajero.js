$(() => {
  let email = document.querySelector('#email');

  email.addEventListener('blur', (evt) => {
    $.get(`/cliente/${email.value}`, (res) => {
      console.log(res);
      document.querySelector('#firstName').value = res.user.nombre;
      document.querySelector('#lastName').value = res.user.apellido;
      document.querySelector('#username').value = res.user.email;
    });
  });
});
