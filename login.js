function mockAuthentication() {
	document.querySelector('form').addEventListener('submit', (e) => {
		e.preventDefault();

		switch(document.querySelector('#inputEmail').value) {
			case 'cajero@maxisoft.co':
				window.location = '/cajero';
				break;
			default:
				window.location = '/soon';
				break;
		};
	});
}
