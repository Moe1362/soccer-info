const cityName = document.querySelector("#city-container")




const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'aae0c5abcemsh6bf0e83148c0bd5p195e59jsnb058a75e4341',
		'X-RapidAPI-Host': 'geocode-address-to-location.p.rapidapi.com'
	}
};


function getMap(location) {
	const url1 = `https://geocode-address-to-location.p.rapidapi.com/v1/geocode/search?text=${location.venueName}`;
	fetch(url1, options1).then(function(response) {
		return response.json();
	   
	}).then(function(data) {
		console.log("soccer api");
		console.log(data);
		
		const coord1 = data.features[1].bbox[0];
		const coord2 = data.features[1].bbox[1];
		const coord3 = data.features[1].bbox[2];
		const coord4 = data.features[1].bbox[3];
		const coord5 = data.features[1].geometry.coordinates[0];
		const coord6 = data.features[1].geometry.coordinates[1];

		const url = `https://www.openstreetmap.org/export/embed.html?bbox=${coord1}%2C${coord2}%2C${coord3}%2C${coord4}&amp;layer=mapnik&amp;marker=${coord5}%2C${coord6}`

		console.log(url);
	})
}


