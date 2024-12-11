const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Seattle';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '2ea92cd1a6msh621fad4f5baf088p1643b3jsn80893aed377a',
		'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

fetch(url,options).then(response => response.json()).then(response =>console.log(response)).catch(err => console.error(err));