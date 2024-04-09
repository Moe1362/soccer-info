const divEl = document.querySelector('#click');
const url = 'https://api-football-v1.p.rapidapi.com/v3/countries';
const leagueContainerEl = document.querySelector('.league-container');
const teamInfoEl = document.querySelector('.team-info');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'aae0c5abcemsh6bf0e83148c0bd5p195e59jsnb058a75e4341',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

function display() {
    const userCountry = document.querySelector("#select-country").value;
    
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
                        
                        if (data2.response[i].league.name === "Serie A" && data2.response[i].country.name === "Italy") {
                            const leagueNameEl = document.createElement("p");
                            const leagueLogoEl = document.createElement("img");

                            leagueNameEl.setAttribute("class", "league-name");
                            leagueLogoEl.setAttribute("src", `${data2.response[i].league.logo}`)

                            leagueContainerEl.innerHTML = "";

                            leagueNameEl.textContent = data2.response[i].league.name;
                            leagueContainerEl.appendChild(leagueNameEl);
                            leagueContainerEl.appendChild(leagueLogoEl);

                            for (let j = 0; j < data2.response[i].seasons.length; j++) {
                                // console.log(data2.response[i].seasons[j]);
                                console.log(data2.response[i].seasons[j].year === 2023);
                                
                                if (data2.response[i].seasons[j].year === 2023) {
                                    console.log(data2.response[i].seasons[j]);

                                    const teamUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${data2.response[i].league.id}&season=2023`;
                                    fetch(teamUrl, options).then(function (response) {
                                        return response.json();
                                    }).then(function (data3) {
                                        console.log(data3);

                                        const selectTeamEl = document.querySelector("#select-team");
                                        selectTeamEl.innerHTML = "";
                                        const defaultOption = document.createElement("option");
                                        defaultOption.text = "Select Team";
                                        selectTeamEl.appendChild(defaultOption);
                                        
                                        for (let i = 0; i < data3.response.length; i++) {
                                            const option = document.createElement("option");
                                            option.text = data3.response[i].team.name;
                                            selectTeamEl.appendChild(option);
                                        }

                                        for(let i=0;i<data3.response.length;i++){
                                            console.log(data3.response[i].team.logo,data3.response[i].team.name,data3.response[i].team.founded);

                                            const teamNameEl = document.createElement("p");
                                            const teamLogoEl = document.createElement("img");
                                            const teamFoundedEl = document.createElement("p");

                                            teamNameEl.textContent = data3.response[i].team.name;
                                            teamLogoEl.setAttribute("src", `${data3.response[i].team.logo}`);
                                            teamFoundedEl.textContent = `Founded in: ${data3.response[i].team.founded}`

                                            teamInfoEl.innerHTML = "";
                                            teamInfoEl.appendChild(teamNameEl);
                                            teamInfoEl.appendChild(teamLogoEl);
                                            teamInfoEl.appendChild(teamFoundedEl);
                                        }
                                        
                                        for(let i=0;i<data3.response.length;i++){
                                            console.log(data3.response[i].venue.city,data3.response[i].venue.name,data3.response[i].venue.image,data3.response[i].venue.capacity);
                                        
                                            const venueContainerEl = document.createElement("div");
                                            const venueCityEl = document.createElement("p");
                                            const venueNameEl = document.createElement("p");
                                            const venueImageEl = document.createElement("img");
                                            const venueCapacityEl = document.createElement("p");

                                            venueCityEl.textContent = `Located in: ${data3.response[i].venue.city}`;
                                            venueNameEl.textContent = `Venue: ${data3.response[i].venue.name}`;
                                            venueImageEl.setAttribute("src", `${data3.response[i].venue.image}`);
                                            venueCapacityEl.textContent = `Venue Capacity: ${data3.response[i].venue.capacity}`

                                            venueContainerEl.appendChild(venueCityEl);
                                            venueContainerEl.appendChild(venueNameEl);
                                            venueContainerEl.appendChild(venueImageEl);
                                            venueContainerEl.appendChild(venueCapacityEl);
                                            teamInfoEl.appendChild(venueContainerEl);
                                        }
                                    });
                                }

                            }
                        }
                        
                        if (data2.response[i].league.name === "La Liga" && data2.response[i].country.name === "Spain") {
                            const leagueNameEl = document.createElement("p");
                            const leagueLogoEl = document.createElement("img");

                            leagueNameEl.setAttribute("class", "league-name");
                            leagueLogoEl.setAttribute("src", `${data2.response[i].league.logo}`)

                            leagueContainerEl.innerHTML = "";

                            leagueNameEl.textContent = data2.response[i].league.name;
                            leagueContainerEl.appendChild(leagueNameEl);
                            leagueContainerEl.appendChild(leagueLogoEl);
                            
                            for (let j = 0; j < data2.response[i].seasons.length; j++) {
                                // console.log(data2.response[i].seasons[j]);
                                if (data2.response[i].seasons[j].year === 2023) {
                                    console.log(data2.response[i].seasons[j]);

                                    const teamUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${data2.response[i].league.id}&season=2023`;
                                    
                                    fetch(teamUrl, options).then(function (response) {
                                        return response.json();
                                    }).then(function (data3) {
                                        
                                        console.log(data3);
                                        const teamName = document.querySelector("#select-team");
                                        teamName.innerHTML = "";

                                        const defaultOption = document.createElement("option");
                                        defaultOption.text = "Select Team";
                                        teamName.appendChild(defaultOption);
                                        
                                        for (let i = 0; i < data3.response.length; i++) {
                                            const options = document.createElement("option");
                                            options.text = data3.response[i].team.name;
                                            teamName.appendChild(options);
                                        }

                                        for(let i=0;i<data3.response.length;i++){
                                            console.log(data3.response[i].team.logo,data3.response[i].team.name,data3.response[i].team.founded);

                                            const teamNameEl = document.createElement("p");
                                            const teamLogoEl = document.createElement("img");
                                            const teamFoundedEl = document.createElement("p");

                                            teamNameEl.textContent = data3.response[i].team.name;
                                            teamLogoEl.setAttribute("src", `${data3.response[i].team.logo}`);
                                            teamFoundedEl.textContent = `Founded in: ${data3.response[i].team.founded}`

                                            teamInfoEl.innerHTML = "";
                                            teamInfoEl.appendChild(teamNameEl);
                                            teamInfoEl.appendChild(teamLogoEl);
                                            teamInfoEl.appendChild(teamFoundedEl);
                                        }
                                        
                                        for(let i=0;i<data3.response.length;i++){
                                            console.log(data3.response[i].venue.city,data3.response[i].venue.name,data3.response[i].venue.image,data3.response[i].venue.capacity);
                                        
                                            const venueContainerEl = document.createElement("div");
                                            const venueCityEl = document.createElement("p");
                                            const venueNameEl = document.createElement("p");
                                            const venueImageEl = document.createElement("img");
                                            const venueCapacityEl = document.createElement("p");

                                            venueCityEl.textContent = `Located in: ${data3.response[i].venue.city}`;
                                            venueNameEl.textContent = `Venue: ${data3.response[i].venue.name}`;
                                            venueImageEl.setAttribute("src", `${data3.response[i].venue.image}`);
                                            venueCapacityEl.textContent = `Venue Capacity: ${data3.response[i].venue.capacity}`

                                            venueContainerEl.appendChild(venueCityEl);
                                            venueContainerEl.appendChild(venueNameEl);
                                            venueContainerEl.appendChild(venueImageEl);
                                            venueContainerEl.appendChild(venueCapacityEl);
                                            teamInfoEl.appendChild(venueContainerEl);
                                        }
                                    })
                                }
                            }
                        }
                        
                        if (data2.response[i].league.name === "Premier League" && data2.response[i].country.name === "England") {
                            const leagueNameEl = document.createElement("p");
                            const leagueLogoEl = document.createElement("img");

                            leagueNameEl.setAttribute("class", "league-name");
                            leagueLogoEl.setAttribute("src", `${data2.response[i].league.logo}`)

                            leagueContainerEl.innerHTML = "";

                            leagueNameEl.textContent = data2.response[i].league.name;
                            leagueContainerEl.appendChild(leagueNameEl);
                            leagueContainerEl.appendChild(leagueLogoEl);
                            
                            for (let j = 0; j < data2.response[i].seasons.length; j++) {
                                // console.log(data2.response[i].seasons[j]);
                                if (data2.response[i].seasons[j].year === 2023) {
                                    console.log(data2.response[i].seasons[j]);

                                    const teamUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${data2.response[i].league.id}&season=2023`;
                                    
                                    fetch(teamUrl, options).then(function (response) {
                                        return response.json();
                                    }).then(function (data3) {
                                        
                                        console.log(data3);
                                        const teamName = document.querySelector("#select-team");
                                        teamName.innerHTML = "";
                                        const defaultOption = document.createElement("option");
                                        defaultOption.text = "Select Team";
                                        teamName.appendChild(defaultOption);
                                        
                                        for (let i = 0; i < data3.response.length; i++) {
                                            const options = document.createElement("option");
                                            options.text = data3.response[i].team.name;
                                            teamName.appendChild(options);
                                        }

                                        for(let i=0;i<data3.response.length;i++){
                                            console.log(data3.response[i].team.logo,data3.response[i].team.name,data3.response[i].team.founded);

                                            const teamNameEl = document.createElement("p");
                                            const teamLogoEl = document.createElement("img");
                                            const teamFoundedEl = document.createElement("p");

                                            teamNameEl.textContent = data3.response[i].team.name;
                                            teamLogoEl.setAttribute("src", `${data3.response[i].team.logo}`);
                                            teamFoundedEl.textContent = `Founded in: ${data3.response[i].team.founded}`

                                            teamInfoEl.innerHTML = "";
                                            teamInfoEl.appendChild(teamNameEl);
                                            teamInfoEl.appendChild(teamLogoEl);
                                            teamInfoEl.appendChild(teamFoundedEl);
                                        }
                                        
                                        for(let i=0;i<data3.response.length;i++){
                                            console.log(data3.response[i].venue.city,data3.response[i].venue.name,data3.response[i].venue.image,data3.response[i].venue.capacity);
                                        
                                            const venueContainerEl = document.createElement("div");
                                            const venueCityEl = document.createElement("p");
                                            const venueNameEl = document.createElement("p");
                                            const venueImageEl = document.createElement("img");
                                            const venueCapacityEl = document.createElement("p");

                                            venueCityEl.textContent = `Located in: ${data3.response[i].venue.city}`;
                                            venueNameEl.textContent = `Venue: ${data3.response[i].venue.name}`;
                                            venueImageEl.setAttribute("src", `${data3.response[i].venue.image}`);
                                            venueCapacityEl.textContent = `Venue Capacity: ${data3.response[i].venue.capacity}`

                                            venueContainerEl.appendChild(venueCityEl);
                                            venueContainerEl.appendChild(venueNameEl);
                                            venueContainerEl.appendChild(venueImageEl);
                                            venueContainerEl.appendChild(venueCapacityEl);
                                            teamInfoEl.appendChild(venueContainerEl);
                                        }
                                    })
                                }
                            }
                        }
                        
                        if (data2.response[i].league.name === "Bundesliga" && data2.response[i].country.name === "Germany") {
                            const leagueNameEl = document.createElement("p");
                            const leagueLogoEl = document.createElement("img");

                            leagueNameEl.setAttribute("class", "league-name");
                            leagueLogoEl.setAttribute("src", `${data2.response[i].league.logo}`)

                            leagueContainerEl.innerHTML = "";

                            leagueNameEl.textContent = data2.response[i].league.name;
                            leagueContainerEl.appendChild(leagueNameEl);
                            leagueContainerEl.appendChild(leagueLogoEl);
                            
                            for (let j = 0; j < data2.response[i].seasons.length; j++) {
                                // console.log(data2.response[i].seasons[j]);
                                if (data2.response[i].seasons[j].year === 2023) {
                                    console.log(data2.response[i].seasons[j]);

                                    const teamUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${data2.response[i].league.id}&season=2023`;
                                    
                                    fetch(teamUrl, options).then(function (response) {
                                        return response.json();
                                    }).then(function (data3) {
                                        
                                        console.log(data3);
                                        const teamName = document.querySelector("#select-team");
                                        teamName.innerHTML = "";
                                        const defaultOption = document.createElement("option");
                                        defaultOption.text = "Select Team";
                                        teamName.appendChild(defaultOption);
                                        
                                        for (let i = 0; i < data3.response.length; i++) {
                                            const options = document.createElement("option");
                                            options.text = data3.response[i].team.name;
                                            teamName.appendChild(options);
                                        }

                                        for(let i=0;i<data3.response.length;i++){
                                            console.log(data3.response[i].team.logo,data3.response[i].team.name,data3.response[i].team.founded);

                                            const teamNameEl = document.createElement("p");
                                            const teamLogoEl = document.createElement("img");
                                            const teamFoundedEl = document.createElement("p");

                                            teamNameEl.textContent = data3.response[i].team.name;
                                            teamLogoEl.setAttribute("src", `${data3.response[i].team.logo}`);
                                            teamFoundedEl.textContent = `Founded in: ${data3.response[i].team.founded}`

                                            teamInfoEl.innerHTML = "";
                                            teamInfoEl.appendChild(teamNameEl);
                                            teamInfoEl.appendChild(teamLogoEl);
                                            teamInfoEl.appendChild(teamFoundedEl);
                                        }
                                        
                                        for(let i=0;i<data3.response.length;i++){
                                            console.log(data3.response[i].venue.city,data3.response[i].venue.name,data3.response[i].venue.image,data3.response[i].venue.capacity);
                                        
                                            const venueContainerEl = document.createElement("div");
                                            const venueCityEl = document.createElement("p");
                                            const venueNameEl = document.createElement("p");
                                            const venueImageEl = document.createElement("img");
                                            const venueCapacityEl = document.createElement("p");

                                            venueCityEl.textContent = `Located in: ${data3.response[i].venue.city}`;
                                            venueNameEl.textContent = `Venue: ${data3.response[i].venue.name}`;
                                            venueImageEl.setAttribute("src", `${data3.response[i].venue.image}`);
                                            venueCapacityEl.textContent = `Venue Capacity: ${data3.response[i].venue.capacity}`

                                            venueContainerEl.appendChild(venueCityEl);
                                            venueContainerEl.appendChild(venueNameEl);
                                            venueContainerEl.appendChild(venueImageEl);
                                            venueContainerEl.appendChild(venueCapacityEl);
                                            teamInfoEl.appendChild(venueContainerEl);
                                        }
                                    })
                                }
                            }
                        }
                        
                        if (data2.response[i].league.name === "Ligue 1" && data2.response[i].country.name === "France") {
                            const leagueNameEl = document.createElement("p");
                            const leagueLogoEl = document.createElement("img");

                            leagueNameEl.setAttribute("class", "league-name");
                            leagueLogoEl.setAttribute("src", `${data2.response[i].league.logo}`)

                            leagueContainerEl.innerHTML = "";

                            leagueNameEl.textContent = data2.response[i].league.name;
                            leagueContainerEl.appendChild(leagueNameEl);
                            leagueContainerEl.appendChild(leagueLogoEl);
                            
                            for (let j = 0; j < data2.response[i].seasons.length; j++) {
                                // console.log(data2.response[i].seasons[j]);
                                if (data2.response[i].seasons[j].year === 2023) {
                                    console.log(data2.response[i].seasons[j]);

                                    const teamUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${data2.response[i].league.id}&season=2023`;
                                    
                                    fetch(teamUrl, options).then(function (response) {
                                        return response.json();
                                    }).then(function (data3) {
                                        
                                        console.log(data3);
                                        const teamName = document.querySelector("#select-team");
                                        teamName.innerHTML = "";
                                        const defaultOption = document.createElement("option");
                                        defaultOption.text = "Select Team";
                                        teamName.appendChild(defaultOption);
                                        
                                        for (let i = 0; i < data3.response.length; i++) {
                                            const options = document.createElement("option");
                                            options.text = data3.response[i].team.name;
                                            teamName.appendChild(options);
                                        }

                                        for(let i=0;i<data3.response.length;i++){
                                            console.log(data3.response[i].team.logo,data3.response[i].team.name,data3.response[i].team.founded);

                                            const teamNameEl = document.createElement("p");
                                            const teamLogoEl = document.createElement("img");
                                            const teamFoundedEl = document.createElement("p");

                                            teamNameEl.textContent = data3.response[i].team.name;
                                            teamLogoEl.setAttribute("src", `${data3.response[i].team.logo}`);
                                            teamFoundedEl.textContent = `Founded in: ${data3.response[i].team.founded}`

                                            teamInfoEl.innerHTML = "";
                                            teamInfoEl.appendChild(teamNameEl);
                                            teamInfoEl.appendChild(teamLogoEl);
                                            teamInfoEl.appendChild(teamFoundedEl);
                                        }
                                        
                                        for(let i=0;i<data3.response.length;i++){
                                            console.log(data3.response[i].venue.city,data3.response[i].venue.name,data3.response[i].venue.image,data3.response[i].venue.capacity);
                                        
                                            const venueContainerEl = document.createElement("div");
                                            const venueCityEl = document.createElement("p");
                                            const venueNameEl = document.createElement("p");
                                            const venueImageEl = document.createElement("img");
                                            const venueCapacityEl = document.createElement("p");

                                            venueCityEl.textContent = `Located in: ${data3.response[i].venue.city}`;
                                            venueNameEl.textContent = `Venue: ${data3.response[i].venue.name}`;
                                            venueImageEl.setAttribute("src", `${data3.response[i].venue.image}`);
                                            venueCapacityEl.textContent = `Venue Capacity: ${data3.response[i].venue.capacity}`

                                            venueContainerEl.appendChild(venueCityEl);
                                            venueContainerEl.appendChild(venueNameEl);
                                            venueContainerEl.appendChild(venueImageEl);
                                            venueContainerEl.appendChild(venueCapacityEl);
                                            teamInfoEl.appendChild(venueContainerEl);
                                        }
                                    })
                                }
                            }
                        }
                    }
                })
            }
        }
    });
}

document.querySelector("#select-country").addEventListener('change', display);