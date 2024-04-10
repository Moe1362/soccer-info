const teamName = document.querySelector("#select-team");


const url1 = 'https://football-devs.p.rapidapi.com/players-statistics?limit=50&league_id=eq.31&player_id=eq.14215&type=eq.away&team_id=eq.6760&season_id=eq.19&offset=0&lang=en';
const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'aae0c5abcemsh6bf0e83148c0bd5p195e59jsnb058a75e4341',
		'X-RapidAPI-Host': 'football-devs.p.rapidapi.com'
	}
};

fetch(url1, options1).then(function(response) {
    return response.json();
   
}).then(function(data) {
    console.log("soccer api");
    console.log(data);
    
    
})
