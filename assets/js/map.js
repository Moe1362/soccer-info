// API configuration
const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'aae0c5abcemsh6bf0e83148c0bd5p195e59jsnb058a75e4341',
		'X-RapidAPI-Host': 'geocode-address-to-location.p.rapidapi.com'
	}
};

/*
  This function gets the coordinates given a query and attempts to get the geolocation.
  It takes in the location as a parameter and extracts specific fields to build the query.
*/
function getCoords(location) {
	// Reset the map display
	resetMap();

	// Variables that we will need for each part
	const userCountry = document.querySelector("#select-country").value;
	let category;
	let mapUrl;

	// Update the query for specific cases (because the map API doesn't like the original)
	const updateQuery = specialCases(location);
	// URL with parameter
	const coordsUrl = `https://geocode-address-to-location.p.rapidapi.com/v1/geocode/search?text=${updateQuery}`;
	
	// Fetch request
	fetch(coordsUrl, options1).then(function (response) {
		return response.json();
	}).then(function (data) {
		// Go through each response
		for (let i = 0; i < data.features.length; i++) {
			// Look for specific match cases (required multiple because of different API data)
			if ((data.features[i].properties.country === userCountry) ||
				(data.features[i].properties.state === userCountry) ||
				(data.features[i].properties.city === location.venueCity)) {
				// Check if the category is a field and extract it
				if (data.features[i].properties.category) {
					category = data.features[i].properties.category;
				}

				// If the category has 'sport' it is usually the stadium
				if (category && (category.startsWith("sport") || category.startsWith("activity"))) {
					// If the data has bbox coordinates
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					// If the data only has geometric coordinates
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					// Our map is generated so we can exit the function
					generateMap(mapUrl);
					return;
				}

				// Look for specific match cases (avoid certain ones because it gave the wrong intial location)
				else if ((data.features[i].properties.name === location.venueName) &&
					(data.features[i].properties.name !== "Old Trafford") &&
					(data.features[i].properties.name !== "Anfield") &&
					(data.features[i].properties.name !== "Stamford Bridge")) {
					// If the data has bbox coordinates
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					// If the data only has geometric coordinates
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					// Our map is generated so we can exit the function
					generateMap(mapUrl);
					return;
				}

				// Look for specific match cases because the APIs might be using different fields
				else if (data.features[i].properties.name === location.venueAddress.toLowerCase()) {
					// If the data has bbox coordinates
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					// If the data only has geometric coordinates
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					// Our map is generated so we can exit the function
					generateMap(mapUrl);
					return;
				}

				// Look for specific match cases (accept certain ones because the initial city is correct)
				else if ((data.features[i].properties.city === "Vitoria-Gasteiz") ||
					(data.features[i].properties.city === "Birmingham")) {
					// If the data has bbox coordinates
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					// If the data only has geometric coordinates
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					// Our map is generated so we can exit the function
					generateMap(mapUrl);
					return;
				}
			}
		}

		// Look at contents in the map container
		const mapContainerEl = document.querySelector('#map-container');

		// If the map container is empty that means no map is generated and a new query is needed
		if (mapContainerEl.innerHTML.length === 0) {
			// Allow up to 3 retry attempts (can change if needed) using different query combinations
			for (let i = 0; i < 3; i++) {
				console.log(`Retry Attempt #${i + 1}`);
				
				// First retry attempt combination
				if (i === 0) {
					newFetchAttempt(location, `${location.venueName} in ${location.venueCity}`);
					// If a map was able to be generated we can exit the function
					if (mapContainerEl.innerHTML.length !== 0) {
						return;
					}
				}

				// Second retry attempt combination
				else if (i === 1) {
					newFetchAttempt(location, `${location.venueName} in ${userCountry}`);
					// If a map was able to be generated we can exit the function
					if (mapContainerEl.innerHTML.length !== 0) {
						return;
					}
				}

				// Third retry attempt combination
				else if (i === 2) {
					newFetchAttempt(location, `${location.venueName} in ${location.venueCity} in ${userCountry}`);
					// If a map was able to be generated we can exit the function
					if (mapContainerEl.innerHTML.length !== 0) {
						return;
					}
				}
			}
		}
	})
}

/*
  This function generates a map URL based on the bbox coordinates it is given.
  It takes in the coordinates as a parameter and builds a map URL to return.
*/
function generateUrlBbox(coords) {
	// Bbox coordinates
	const boxCoords1 = coords.bbox[0];
	const boxCoords2 = coords.bbox[1];
	const boxCoords3 = coords.bbox[2];
	const boxCoords4 = coords.bbox[3];

	// Geometric coordinates as the marker
	const markerCoords1 = coords.geometry.coordinates[0];
	const markerCoords2 = coords.geometry.coordinates[1];

	return `https://www.openstreetmap.org/export/embed.html?` +
	`bbox=${boxCoords1}%2C${boxCoords2}%2C${boxCoords3}%2C${boxCoords4}` +
	`&layer=mapnik&marker=${markerCoords2}%2C${markerCoords1}`;
}

/*
  This function generates a map URL based on the geometric coordinates it is given.
  It takes in the coordinates as a parameter and builds a map URL to return.
*/
function generateUrlGeometry(coords) {
	// Bbox coordinates using geometric data (because bbox is not available)
	const boxCoords1 = coords.geometry.coordinates[0];
	const boxCoords2 = coords.geometry.coordinates[1];
	const boxCoords3 = coords.geometry.coordinates[0];
	const boxCoords4 = coords.geometry.coordinates[1];

	// Geometric coordinates as the marker
	const markerCoords1 = coords.geometry.coordinates[0];
	const markerCoords2 = coords.geometry.coordinates[1];

	return `https://www.openstreetmap.org/export/embed.html?` +
	`bbox=${boxCoords1}%2C${boxCoords2}%2C${boxCoords3}%2C${boxCoords4}` +
	`&layer=mapnik&marker=${markerCoords2}%2C${markerCoords1}`;
}

/*
  This function generates a map given a customized URL.
  It takes in the map URL as a parameter and builds a display for it in the main content.
*/
function generateMap(mapUrl) {
	// Map container and reset the selections
	const mapContainerEl = document.querySelector('#map-container');
	mapContainerEl.innerHTML = "";

	// Frame element that sets the CSS attribute and sets the URL source and displays it using an 'iframe' tag
	const frameEl = document.createElement("iframe");
	frameEl.setAttribute("class", "map-display");
	frameEl.setAttribute("src", `${mapUrl}`);

	// Append the element to the container
	mapContainerEl.appendChild(frameEl);
}

/*
  This function gets the coordinates given a query and attempts to get the geolocation.
  It takes in the location as a parameter and compares the values to the response fields.
  It takes in a customized query that can help with geolocation by attempting another fetch.
*/
function newFetchAttempt(location, newQuery) {
	// Variables that we will need for each part
	const userCountry = document.querySelector("#select-country").value;
	let category;
	let mapUrl;

	// URL with parameter
	const coordsUrl = `https://geocode-address-to-location.p.rapidapi.com/v1/geocode/search?text=${newQuery}`;

	// Fetch request
	fetch(coordsUrl, options1).then(function (response) {
		return response.json();
	}).then(function (data) {
		// Go through each response
		for (let i = 0; i < data.features.length; i++) {
			// Look for specific match cases (required multiple because of different API data)
			if ((data.features[i].properties.country === userCountry) ||
				(data.features[i].properties.state === userCountry) ||
				(data.features[i].properties.city === location.venueCity)) {
				
				// Check if the category is a field and extract it
				if (data.features[i].properties.category) {
					category = data.features[i].properties.category;
				}

				// If the category has 'sport' it is usually the stadium
				if (category && (category.startsWith("sport") || category.startsWith("activity"))) {
					// If the data has bbox coordinates
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					// If the data only has geometric coordinates
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					// Our map is generated so we can exit the function
					generateMap(mapUrl);
					return;
				}

				// Look for specific match cases (avoid certain ones because it gave the wrong intial location)
				else if ((data.features[i].properties.name === location.venueName) &&
					(data.features[i].properties.name !== "Old Trafford")) {
					// If the data has bbox coordinates
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					// If the data only has geometric coordinates
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					// Our map is generated so we can exit the function
					generateMap(mapUrl);
					return;
				}

				// Look for specific match cases because the APIs might be using different fields
				else if (data.features[i].properties.name === location.venueAddress.toLowerCase()) {
					// If the data has bbox coordinates
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					// If the data only has geometric coordinates
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					// Our map is generated so we can exit the function
					generateMap(mapUrl);
					return;
				}

				// Look for specific match cases because the APIs might be using different fields
				else if (data.features[i].properties.street === location.venueAddress) {
					// If the data has bbox coordinates
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					// If the data only has geometric coordinates
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					// Our map is generated so we can exit the function
					generateMap(mapUrl);
					return;
				}

				// Look for specific match cases (accept certain ones because the name is correct)
				else if (data.features[i].properties.name === "Estadio de Mestalla Valencia CF") {
					// If the data has bbox coordinates
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					// If the data only has geometric coordinates
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					// Our map is generated so we can exit the function
					generateMap(mapUrl);
					return;
				}
			}
		}
	})
}

/*
  This function creates a new query based on specific situations (due to difference in APIs).
  It takes in the location as a parameter and compares the venue name to specific cases.
  If a case matches, it creates a new query and returns that to use in the fetch.
*/
function specialCases(location) {
	if (location.venueName === "Stade de la Mosson-Mondial 98") {
		return `${location.venueName} in ${location.venueCity}`
	}

	else if (location.venueName === "Stadio Carlo Castellani – Computer Gross Arena") {
		return location.venueName.slice(0, 23);
	}

	else if (location.venueName === "Estadio de Mendizorroza") {
		return "Mendizorrotza Stadium";
	}

	else if (location.venueName === "Power Horse Stadium – Estadio de los Juegos Mediterráneos") {
		return location.venueName.slice(0, 20);
	}

	else if (location.venueName === "Estadio El Sadar") {
		return `${location.venueName.slice(8)} Stadium`
	}

	else if (location.venueName === "Estadio de Vallecas") {
		return "Campo de Fútbol de Vallecas";
	}

	else if (location.venueName === "Villa Park") {
		return `${location.venueName} in ${location.venueCity} B6 6HE`;
	}

	else if (location.venueName === "Kenilworth Road") {
		return `${location.venueName} in ${location.venueCity}`;
	}

	else {
		return location.venueName;
	}
}

/*
  This function resets the display when a new team is selected so a new map needs to be generated.
*/
function resetMap() {
	const mapContainerEl = document.querySelector('#map-container');
	mapContainerEl.innerHTML = "";
}
