const divEl = document.querySelector('#click');
const url = 'https://api-football-v1.p.rapidapi.com/v3/countries';



const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'aae0c5abcemsh6bf0e83148c0bd5p195e59jsnb058a75e4341',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};



function display() {
    const userCountry = document.querySelector(".dropdown-country").value;
    fetch(url, options).then(function (response) {
        return response.json();
    }).then(function (data) {
        const countriesId = data.response;
        console.log(countriesId);
        for (let i = 0; i < countriesId.length; i++) {
            //console.log(countriesId[i].code, countriesId[i].flag);
            if (countriesId[i].name === userCountry) {
                console.log(countriesId[i]);
                console.log(countriesId[i].code);
                const countryCodeUrl = `https://api-football-v1.p.rapidapi.com/v3/leagues?code=${countriesId[i].code}`;
                fetch(countryCodeUrl, options).then(function (response) {
                    return response.json();
                }).then(function (data2) {
                    console.log(data2);
                    for (let i = 0; i < data2.response.length; i++) {
                        console.log(data2.response[i]);
                        console.log(data2.response[i].league.name === "Serie A" && data2.response[i].country.name === "Italy");
                        if (data2.response[i].league.name === "Serie A" && data2.response[i].country.name === "Italy") {
                            for (let j = 0; j < data2.response[i].seasons.length; j++) {
                                // console.log(data2.response[i].seasons[j]);
                                console.log(data2.response[i].seasons[j].year === 2023);
                                if (data2.response[i].seasons[j].year === 2023) {
                                    console.log(data2.response[i].seasons[j]);

                                    const teamUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${data2.response[i].league.id}&season=2023`;
                                    console.log(teamUrl);
                                }

                            }
                        }
                        if (data2.response[i].league.name === "La Liga" && data2.response[i].country.name === "Spain") {
                            for (let j = 0; j < data2.response[i].seasons.length; j++) {
                                // console.log(data2.response[i].seasons[j]);
                                if (data2.response[i].seasons[j].year === 2023 ) {
                                    console.log(data2.response[i].seasons[j]);

                                    const teamUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${data2.response[i].league.id}&season=2023`;
                                    console.log(teamUrl);

                                }

                            }
                        }
                        
                    }
                })

            }


        }
    });
}

document.querySelector(".dropdown-country").addEventListener('change', display);