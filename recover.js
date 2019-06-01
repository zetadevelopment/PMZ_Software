function validateData() {
  document.querySelector('#validatePassword').addEventListener('submit', (e) => {
    e.preventDefault();

    switch(document.querySelector('#inputEmail').value) {
      case 'cajero@maxisoft.co':
        window.location = '/recoverpass';
        break;
      default:
        window.location = '/soon';
        break;
    };
  });
}

function changePassword() {
  document.querySelector('#confirmPassword').addEventListener('submit', (e) => {
    e.preventDefault();

    if (document.querySelector('#inputPassword').value === document.querySelector('#samePassword').value) {
      document.querySelector('#alert').classList.toggle('d-none');
    }
  });
}
