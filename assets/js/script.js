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
		const cityUrl = data.features[0].properties.datasource.url;
		console.log(cityUrl);
	})
}


