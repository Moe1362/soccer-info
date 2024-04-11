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

			//if (data.features[i].properties.country === "Spain") {
			if ((data.features[i].properties.country === userCountry) ||
				(data.features[i].properties.state === userCountry)) {
				
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
		venueAddress: "Carrer de l&apos;Estadi",
		venueName: "Estadi Olímpic Lluís Companys"
	}

	getCoords(location);
}

function testDisplay() {
	const url = `https://www.openstreetmap.org/export/embed.html?` +
		`bbox=2.1545283%2C41.3635183%2C2.1568108%2C41.3660113` +
		`&amp;layer=mapnik&amp;marker=41.36472%2C2.155645096956145`

	console.log(url);
}

//testDisplay();
//testMap();
