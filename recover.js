function validateData() {
	document.querySelector('#validatePassword').addEventListener('submit', (e) => {
		e.preventDefault();
		
		switch(document.querySelector('#inputEmail').value) {
			case 'cajero@maxisoft.co':
				window.location = 'recoverpass.html';
				break;
			default:
				window.location = 'soon.html';
				break;
		};
	});
}

function changePassword() {
	document.querySelector('#confirmPassword').addEventListener('submit', (e) => {
		e.preventDefault();
		
		if (document.querySelector('#inputPassword').value === document.querySelector('#validatePassword').value) {
		}
	});
}