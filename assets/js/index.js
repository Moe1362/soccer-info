const divEl = document.querySelector('#click');
const url = 'https://api-football-v1.p.rapidapi.com/v3/countries';

const teamUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2021`;

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
        const countriesId = data.response;
        console.log(countriesId);
        for(let i=0;i<countriesId.length;i++){
            const leagueUrl = `https://api-football-v1.p.rapidapi.com/v3/leagues?code=${countriesId[i].code}`;
            fetch()
        }
    });
}

divEl.addEventListener('click', display);