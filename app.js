
var executer = () => {

	var demand = document.getElementById('idInput').value;

	if (demand == 'books') {
		var response = fetch('http://localhost:3000/books');

		response.then((result) => result.json())

		.then((data) => {
			console.log(data);
			document.getElementById('displayer').innerHTML = `${data[0].bookId}<br/> ${data[0].category}<br/> ${data[0].author}`
		});

		response.catch((error) => {
			console.log('error obtained!')
		})
	};
 };
