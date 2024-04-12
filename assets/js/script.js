const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'aae0c5abcemsh6bf0e83148c0bd5p195e59jsnb058a75e4341',
		'X-RapidAPI-Host': 'geocode-address-to-location.p.rapidapi.com'
	}
};

function getCoords(location) {
	resetMap();

	const coordsUrl = `https://geocode-address-to-location.p.rapidapi.com/v1/geocode/search?text=${location.venueName}`;
	fetch(coordsUrl, options1).then(function (response) {
		return response.json();
	}).then(function (data) {
		console.log("soccer api");
		console.log(data);
		
		for (let i = 0; i < data.features.length; i++) {
			const userCountry = document.querySelector("#select-country").value;

			if ((data.features[i].properties.country === "France") ||
				(data.features[i].properties.state === "France")) {
			//if ((data.features[i].properties.country === userCountry) ||
				//(data.features[i].properties.state === userCountry)) {
				
				if (data.features[i].properties.category === "sport.stadium") {
					const boxCoords1 = data.features[i].bbox[0];
					const boxCoords2 = data.features[i].bbox[1];
					const boxCoords3 = data.features[i].bbox[2];
					const boxCoords4 = data.features[i].bbox[3];

					const markerCoords1 = data.features[i].geometry.coordinates[0];
					const markerCoords2 = data.features[i].geometry.coordinates[1];

					const mapUrl = `https://www.openstreetmap.org/export/embed.html?` +
						`bbox=${boxCoords1}%2C${boxCoords2}%2C${boxCoords3}%2C${boxCoords4}` +
						`&layer=mapnik&marker=${markerCoords2}%2C${markerCoords1}`

					console.log(mapUrl);
					generateMap(mapUrl);
				}

				else if (data.features[i].properties.name === location.venueName) {
					const boxCoords1 = data.features[i].bbox[0];
					const boxCoords2 = data.features[i].bbox[1];
					const boxCoords3 = data.features[i].bbox[2];
					const boxCoords4 = data.features[i].bbox[3];

					const markerCoords1 = data.features[i].geometry.coordinates[0];
					const markerCoords2 = data.features[i].geometry.coordinates[1];

					const mapUrl = `https://www.openstreetmap.org/export/embed.html?` +
						`bbox=${boxCoords1}%2C${boxCoords2}%2C${boxCoords3}%2C${boxCoords4}` +
						`&layer=mapnik&marker=${markerCoords2}%2C${markerCoords1}`

					console.log(mapUrl);
					generateMap(mapUrl);
				}

				else if (data.features[i].properties.name === location.venueAddress.toLowerCase()) {
					const boxCoords1 = data.features[i].bbox[0];
					const boxCoords2 = data.features[i].bbox[1];
					const boxCoords3 = data.features[i].bbox[2];
					const boxCoords4 = data.features[i].bbox[3];

					const markerCoords1 = data.features[i].geometry.coordinates[0];
					const markerCoords2 = data.features[i].geometry.coordinates[1];

					const mapUrl = `https://www.openstreetmap.org/export/embed.html?` +
						`bbox=${boxCoords1}%2C${boxCoords2}%2C${boxCoords3}%2C${boxCoords4}` +
						`&layer=mapnik&marker=${markerCoords2}%2C${markerCoords1}`

					console.log(mapUrl);
					generateMap(mapUrl);
				}
			}
		}
	})
}

function generateMap(mapUrl) {
	const mapContainerEl = document.querySelector('#map-container');

	const frameEl = document.createElement("iframe");

	frameEl.setAttribute("class", "map-display");
	frameEl.setAttribute("src", `${mapUrl}`);

	mapContainerEl.innerHTML = "";
	mapContainerEl.appendChild(frameEl);
}

function resetMap() {
	const mapContainerEl = document.querySelector('#map-container');
	mapContainerEl.innerHTML = "";
}

function testMap() {
	const location = {
		//venueAddress: "Sir Matt Busby Way",
        //venueName: "Old Trafford"
		venueName: "Anfield",
		venueAddress: "Anfield Road",
		venueCity: "Liverpool"
	}

	testCoords(location);
}

function testCoords(location) {
	resetMap();

	const userCountry = document.querySelector("#select-country").value;
	//const userCountry = "England";
	let category;
	let mapUrl;

	const updateQuery = specialCases(location);
	const coordsUrl = `https://geocode-address-to-location.p.rapidapi.com/v1/geocode/search?text=${updateQuery}`;
	
	fetch(coordsUrl, options1).then(function (response) {
		return response.json();
	}).then(function (data) {
		console.log("soccer api");
		console.log(data);
		
		for (let i = 0; i < data.features.length; i++) {
			//if ((data.features[i].properties.country === "England") ||
				//(data.features[i].properties.state === "England") ||
				//(data.features[i].properties.city === location.city)) {
			if ((data.features[i].properties.country === userCountry) ||
				(data.features[i].properties.state === userCountry) ||
				(data.features[i].properties.city === location.venueCity)) {
				if (data.features[i].properties.category) {
					category = data.features[i].properties.category;
				}

				if (category && (category.startsWith("sport") || category.startsWith("activity"))) {
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					console.log(mapUrl);
					generateMap(mapUrl);
					return;
				}


				else if ((data.features[i].properties.name === location.venueName) &&
					(data.features[i].properties.name !== "Old Trafford") &&
					(data.features[i].properties.name !== "Anfield") &&
					(data.features[i].properties.name !== "Stamford Bridge")) {
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					console.log(mapUrl);
					generateMap(mapUrl);
					return;
				}

				else if (data.features[i].properties.name === location.venueAddress.toLowerCase()) {
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					console.log(mapUrl);
					generateMap(mapUrl);
					return;
				}

				else if ((data.features[i].properties.city === "Vitoria-Gasteiz") ||
					(data.features[i].properties.city === "Birmingham")) {
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					console.log(mapUrl);
					generateMap(mapUrl);
					return;
				}
			}
		}

		const mapContainerEl = document.querySelector('#map-container');
		console.log("what is my map container inner HTML?");
		console.log(mapContainerEl.innerHTML);
		console.log(mapContainerEl.innerHTML.length);
		if (mapContainerEl.innerHTML.length === 0) {
			for (let i = 0; i < 3; i++) {
				console.log(`retry attempt #${i + 1}`);

				if (i === 0) {
					newFetchAttempt(location, `${location.venueName} in ${location.venueCity}`);
					if (mapContainerEl.innerHTML.length !== 0) {
						return;
					}
				}

				else if (i === 1) {
					newFetchAttempt(location, `${location.venueName} in ${userCountry}`);
					if (mapContainerEl.innerHTML.length !== 0) {
						return;
					}
				}

				else if (i === 2) {
					newFetchAttempt(location, `${location.venueName} in ${location.venueCity} in ${userCountry}`);
					if (mapContainerEl.innerHTML.length !== 0) {
						return;
					}
				}
			}
		}
	})
}

function generateUrlBbox(coords) {
	const boxCoords1 = coords.bbox[0];
	const boxCoords2 = coords.bbox[1];
	const boxCoords3 = coords.bbox[2];
	const boxCoords4 = coords.bbox[3];

	const markerCoords1 = coords.geometry.coordinates[0];
	const markerCoords2 = coords.geometry.coordinates[1];

	return `https://www.openstreetmap.org/export/embed.html?` +
	`bbox=${boxCoords1}%2C${boxCoords2}%2C${boxCoords3}%2C${boxCoords4}` +
	`&layer=mapnik&marker=${markerCoords2}%2C${markerCoords1}`;
}

function generateUrlGeometry(coords) {
	const boxCoords1 = coords.geometry.coordinates[0];
	const boxCoords2 = coords.geometry.coordinates[1];
	const boxCoords3 = coords.geometry.coordinates[0];
	const boxCoords4 = coords.geometry.coordinates[1];

	const markerCoords1 = coords.geometry.coordinates[0];
	const markerCoords2 = coords.geometry.coordinates[1];

	return `https://www.openstreetmap.org/export/embed.html?` +
	`bbox=${boxCoords1}%2C${boxCoords2}%2C${boxCoords3}%2C${boxCoords4}` +
	`&layer=mapnik&marker=${markerCoords2}%2C${markerCoords1}`;
}

function newFetchAttempt(location, newQuery) {
	const userCountry = document.querySelector("#select-country").value;
	//const userCountry = "England";
	let category;
	let mapUrl;

	const coordsUrl = `https://geocode-address-to-location.p.rapidapi.com/v1/geocode/search?text=${newQuery}`;

	fetch(coordsUrl, options1).then(function (response) {
		return response.json();
	}).then(function (data) {
		console.log("soccer api");
		console.log(data);
		
		for (let i = 0; i < data.features.length; i++) {
			if ((data.features[i].properties.country === userCountry) ||
				(data.features[i].properties.state === userCountry) ||
				(data.features[i].properties.city === location.venueCity)) {
			//if ((data.features[i].properties.country === userCountry) ||
				//(data.features[i].properties.state === userCountry)) {
				
				if (data.features[i].properties.category) {
					category = data.features[i].properties.category;
				}

				if (category && (category.startsWith("sport") || category.startsWith("activity"))) {
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					console.log(mapUrl);
					generateMap(mapUrl);
					return;
				}

				else if ((data.features[i].properties.name === location.venueName) &&
					(data.features[i].properties.name !== "Old Trafford")) {
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
						
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					console.log(mapUrl);
					generateMap(mapUrl);
					return;
				}

				else if (data.features[i].properties.name === location.venueAddress.toLowerCase()) {
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					console.log(mapUrl);
					generateMap(mapUrl);
					return;
				}

				else if (data.features[i].properties.street === location.venueAddress) {
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					console.log(mapUrl);
					generateMap(mapUrl);
					return;
				}

				else if (data.features[i].properties.name === "Estadio de Mestalla Valencia CF") {
					if (data.features[i].bbox) {
						mapUrl = generateUrlBbox(data.features[i]);
					}
					
					else {
						mapUrl = generateUrlGeometry(data.features[i]);
					}

					console.log(mapUrl);
					generateMap(mapUrl);
					return;
				}
			}
		}
	})
}

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

function testDisplay() {
	const url = `https://www.openstreetmap.org/export/embed.html?` +
		`bbox=2.1545283%2C41.3635183%2C2.1568108%2C41.3660113` +
		`&amp;layer=mapnik&amp;marker=41.36472%2C2.155645096956145`

	console.log(url);
}

//testDisplay();
//testMap();
