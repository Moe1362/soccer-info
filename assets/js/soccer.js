// Base URL
const url = 'https://api-football-v1.p.rapidapi.com/v3/countries';
// Main content element selector
const mainEl = document.querySelector('.main');

// API configuration
const soccerOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c4a75d9930msh9a64489fdec6eddp1ecc48jsnf0c05560708b',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

// Array to populate the list with the team info (to avoid having to do another fetch)
let teamInfoList = [];

/*
  This function gets a user selection of a country and does a fetch call to get that country code.
*/
function getCountryCode() {
    // Reset the display of the main content each time
    resetDisplay();

    // User selection of a country
    const userCountry = document.querySelector("#select-country").value;

    // Fetch request
    fetch(url, soccerOptions).then(function (response) {
        return response.json();
    }).then(function (data) {
        // Get all the list of responses
        const countriesId = data.response;

        // Go through each response
        for (let i = 0; i < countriesId.length; i++) {
            // If the response's country name matches the user selection of a country
            if (countriesId[i].name === userCountry) {
                getLeagues(countriesId[i].code);
            }
        }
    });
}

/*
  This function performs another fetch request and looks for specific leagues in each country.
  It takes in a country code as a parameter to use for the fetch request.
*/
function getLeagues(countryCode) {
    // URL with parameter
    const countryCodeUrl = `https://api-football-v1.p.rapidapi.com/v3/leagues?code=${countryCode}`;

    // Fetch request
    fetch(countryCodeUrl, options).then(function (response) {
        return response.json();
    }).then(function (data) {
        // Go through each response
        for (let i = 0; i < data.response.length; i++) {
            // Checking for specific leagues, mostly the main ones (otherwise it would be too much work)
            if ((data.response[i].league.name === "Serie A" && data.response[i].country.name === "Italy") ||
            (data.response[i].league.name === "La Liga" && data.response[i].country.name === "Spain") ||
            (data.response[i].league.name === "Premier League" && data.response[i].country.name === "England") ||
            (data.response[i].league.name === "Bundesliga" && data.response[i].country.name === "Germany") ||
            (data.response[i].league.name === "Ligue 1" && data.response[i].country.name === "France")) {
                displayLeagueInfo(data.response[i]);

                // Go through each season
                for (let j = 0; j < data.response[i].seasons.length; j++) {
                    // We only want the most recent season 
                    if (data.response[i].seasons[j].year === 2023) {
                        getTeams(data.response[i].league.id);
                    }
                }
            }
        }
    });
}

/*
  This function populates the main content with a display of the league name and league logo.
  It takes in the league data as a parameter and extracts the name and logo.
*/
function displayLeagueInfo(leagueData) {
    // League container and reset the display
    const leagueContainerEl = document.querySelector('#league-container');
    leagueContainerEl.innerHTML = "";

    // League name element that sets the CSS attribute and extracts the name and displays it using a 'p' tag
    const leagueNameEl = document.createElement("p");
    leagueNameEl.setAttribute("class", "league-name");
    leagueNameEl.textContent = leagueData.league.name;

    // League logo element that extracts the logo and displays it using an 'img' tag
    const leagueLogoEl = document.createElement("img");
    leagueLogoEl.setAttribute("src", `${leagueData.league.logo}`)

    // Set the CSS attribute and appends the other elements to the container
    leagueContainerEl.setAttribute("class", "league-container")
    leagueContainerEl.appendChild(leagueNameEl);
    leagueContainerEl.appendChild(leagueLogoEl);
}

/*
  This function performs another fetch request and gets all the teams in that league.
  It takes in the league data as a parameter to use for the fetch request.
*/
function getTeams(leagueData) {
    // URL with parameter
    const teamUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${leagueData}&season=2023`;

    // Fetch request
    fetch(teamUrl, options).then(function (response) {
        return response.json();
    }).then(function (data) {
        populateSelectTeam(data);
        populateTeamInfoList(data);
    });
}

/*
  This function populates the team selection dropdown with all the teams in the league.
  It takes in the team data as a parameter to create selection options by extracting the team name.
*/
function populateSelectTeam(teamData) {
    // Select team element and reset the selections
    const selectTeamEl = document.querySelector("#select-team");
    selectTeamEl.innerHTML = "";
    
    // Creates the default placeholder option
    const defaultOption = document.createElement("option");
    defaultOption.text = "Select Team";
    
    // Append the default placeholder option to the list of selections
    selectTeamEl.appendChild(defaultOption);
                                        
    // Append each of the team name to the list of selections
    for (let i = 0; i < teamData.response.length; i++) {
        const option = document.createElement("option");
        option.text = teamData.response[i].team.name;
        selectTeamEl.appendChild(option);
    }
}

/*
  This function populates an array with all the team data necessary to perform future functions.
  It takes in the team data as a parameter and extracts all the necessary fields.
  It then creates an object and pushes it to the array so that we can extract it later.
*/
function populateTeamInfoList(teamData) {
    // Reset the array
    teamInfoList = [];

    // Iterate through each team data and extract all the necessary fields to an object and push it to the array.
    for(let i=0; i < teamData.response.length; i++) {
        const teamInfo = {
            teamName: teamData.response[i].team.name,
            teamLogo: teamData.response[i].team.logo,
            teamFounded: teamData.response[i].team.founded,
            venueAddress: teamData.response[i].venue.address,
            venueCity: teamData.response[i].venue.city,
            venueName: teamData.response[i].venue.name,
            venueImage: teamData.response[i].venue.image,
            venueCapacity: teamData.response[i].venue.capacity
        }

        teamInfoList.push(teamInfo);
    }
}

/*
  This function gets a user selection of a team and extracts the information from that team in the array.
*/
function selectTeam() {
    // User selection of a team
    const selection = document.querySelector("#select-team").value;

    // Go through each team
    for (let i = 0; i < teamInfoList.length; i++) {
        // If the team name matches the user selection of a team
        if (teamInfoList[i].teamName === selection) {
            createTeamInfo(teamInfoList[i]);
            createTeamVenue(teamInfoList[i]);
            getCoords(teamInfoList[i]);
        }
    }
}

/*
  This function populates the main content with a display of the team name, logo and year founded.
  It takes in the team data as a parameter and extracts the name, logo and year.
*/
function createTeamInfo(teamData) {
    // Team info element and reset the display
    const teamInfoEl = document.querySelector('#team-info');
    teamInfoEl.innerHTML = "";

    // Team name element that extracts the name and displays it using a 'p' tag
    const teamNameEl = document.createElement("p");
    teamNameEl.textContent = teamData.teamName;

    // Team logo element that sets the CSS attribute and extracts the logo and displays it using a 'img' tag
    const teamLogoEl = document.createElement("img");
    teamLogoEl.setAttribute("id", "team-logo");
    teamLogoEl.setAttribute("src", `${teamData.teamLogo}`);

    // Team founded element that extracts the year founded and displays it using a 'p' tag
    const teamFoundedEl = document.createElement("p");
    teamFoundedEl.textContent = `Founded in: ${teamData.teamFounded}`

    // Team container that sets the CSS attribute and appends the other elements to the container
    const teamContainerEl = document.createElement("article");
    teamContainerEl.setAttribute("class", "team");
    teamContainerEl.appendChild(teamNameEl);
    teamContainerEl.appendChild(teamLogoEl);
    teamContainerEl.appendChild(teamFoundedEl);

    // Set the CSS attribute and appends the container to the team info element
    teamInfoEl.setAttribute("class", "team-info");
    teamInfoEl.appendChild(teamContainerEl);
}

/*
  This function populates the main content with a display of the venue city, name, image and capacity.
  It takes in the team data as a parameter and extracts the city, name, image and capacity.
*/
function createTeamVenue(teamData) {
    // Team info element
    const teamInfoEl = document.querySelector('#team-info');
    
    // Venue city element that extracts the city and displays it using a 'p' tag
    const venueCityEl = document.createElement("p");
    venueCityEl.textContent = `Located in: ${teamData.venueCity}`;
    
    // Venue name element that extracts the name and displays it using a 'p' tag
    const venueNameEl = document.createElement("p");
    venueNameEl.textContent = `Venue: ${teamData.venueName}`;
    
    // Venue image element that sets the CSS attribute and extracts the image and displays it using a 'img' tag
    const venueImageEl = document.createElement("img");
    venueImageEl.setAttribute("id", "stadium");
    venueImageEl.setAttribute("src", `${teamData.venueImage}`);

    // Venue capacity element that extracts the capacity and displays it using a 'p' tag
    const venueCapacityEl = document.createElement("p");
    venueCapacityEl.textContent = `Venue Capacity: ${teamData.venueCapacity}`
    
    // Venue container that sets the CSS attribute and appends the other elements to the container
    const venueContainerEl = document.createElement("article");
    venueContainerEl.setAttribute("class", "venue");
    venueContainerEl.appendChild(venueCityEl);
    venueContainerEl.appendChild(venueNameEl);
    venueContainerEl.appendChild(venueImageEl);
    venueContainerEl.appendChild(venueCapacityEl);
    
    // Appends the container to the team info element
    teamInfoEl.appendChild(venueContainerEl);
}

/*
  This function resets the display when a new country is selected.
*/
function resetDisplay() {
    // Reset the main content display
    mainEl.textContent = "";

    // Set up the league section with the CSS attribute to target for content population later
    const leagueSection = document.createElement("section");
    leagueSection.setAttribute("id", "league-container");
    
    // Set up the team section with the CSS attribute to target for content population later
    const teamSection = document.createElement("section");
    teamSection.setAttribute("id", "team-info");
    
    // Set up the map section with the CSS attribute to target for content population later
    const mapSection = document.createElement("section");
    mapSection.setAttribute("id", "map-container");

    // Appends the other elements to the main element
    mainEl.appendChild(leagueSection);
    mainEl.appendChild(teamSection);
    mainEl.appendChild(mapSection);
}

// Event listener that calls the appropriate function when the 'Select Country' dropdown is changed
document.querySelector("#select-country").addEventListener('change', getCountryCode);
// Event listener that calls the appropriate function when the 'Select Team' dropdown is changed
document.querySelector("#select-team").addEventListener('change', selectTeam);
