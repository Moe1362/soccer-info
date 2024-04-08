const divEl = document.querySelector('#click');
const url = 'https://api-football-v1.p.rapidapi.com/v3/leagues?code=GB';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'aae0c5abcemsh6bf0e83148c0bd5p195e59jsnb058a75e4341',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
	}
};



function display() {
    fetch(url, options).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
    });
}

divEl.addEventListener('click', display);