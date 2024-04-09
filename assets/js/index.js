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

                                        const teamName = document.querySelector("#select-team");
                                        teamName.innerHTML = "";
                                        const defaultOption = document.createElement("option");
                                        defaultOption.text = "Select Team";
                                        teamName.appendChild(defaultOption);
                                        
                                        for (let i = 0; i < data3.response.length; i++) {
                                            const options = document.createElement("option");
                                            options.text = data3.response[i].team.name;
                                            teamName.appendChild(options);

                                            for(let k=0;k<data3.response.length;k++){
                                                console.log(data3.response[i].team.logo,data3.response[i].team.name,data3.response[i].team.founded);
                                            }
                                            for(let p=0;p<data3.response.length;p++){
                                                console.log(data3.response[i].venue.city,data3.response[i].venue.name,data3.response[i].venue.image,data3.response[i].venue.capacity);



                                        }



                                        }
                                    });
                                }

                            }
                        }
                        if (data2.response[i].league.name === "La Liga" && data2.response[i].country.name === "Spain") {
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

                                            for(let k=0;k<data3.response.length;k++){
                                                console.log(data3.response[i].team.logo,data3.response[i].team.name,data3.response[i].team.founded);
                                            }
                                            for(let p=0;p<data3.response.length;p++){
                                                console.log(data3.response[i].venue.city,data3.response[i].venue.name,data3.response[i].venue.image,data3.response[i].venue.capacity);



                                        }



                                        }
                                    })

                                }

                            }
                        }if (data2.response[i].league.name === "Premier League" && data2.response[i].country.name === "England") {
                            for (let j = 0; j < data2.response[i].seasons.length; j++) {
                                // console.log(data2.response[i].seasons[j]);
                                if (data2.response[i].seasons[j].year === 2023) {
                                    console.log(data2.response[i].seasons[j]);

                                    const teamUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${data2.response[i].league.id}&season=2023`;
                                    fetch(teamUrl, options).then(function (response) {
                                        return response.json();
                                    }).then(function (data5) {
                                        console.log(data5);
                                        const teamName = document.querySelector("#select-team");
                                        teamName.innerHTML = "";
                                        const defaultOption = document.createElement("option");
                                        defaultOption.text = "Select Team";
                                        teamName.appendChild(defaultOption);
                                        
                                        for (let i = 0; i < data5.response.length; i++) {
                                            const options = document.createElement("option");
                                            options.text = data5.response[i].team.name;
                                            teamName.appendChild(options);
                                            for(let k=0;k<data5.response.length;k++){
                                                console.log(data5.response[i].team.logo,data5.response[i].team.name,data5.response[i].team.founded);
                                            }
                                            for(let p=0;p<data5.response.length;p++){
                                                console.log(data5.response[i].venue.city,data5.response[i].venue.name,data5.response[i].venue.image,data5.response[i].venue.capacity);



                                        }



                                        }
                                    })

                                }

                            }
                        }if (data2.response[i].league.name === "Bundesliga" && data2.response[i].country.name === "Germany") {
                            for (let j = 0; j < data2.response[i].seasons.length; j++) {
                                // console.log(data2.response[i].seasons[j]);
                                if (data2.response[i].seasons[j].year === 2023) {
                                    console.log(data2.response[i].seasons[j]);

                                    const teamUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${data2.response[i].league.id}&season=2023`;
                                    fetch(teamUrl, options).then(function (response) {
                                        return response.json();
                                    }).then(function (data6) {
                                        console.log(data6);
                                        const teamName = document.querySelector("#select-team");
                                        teamName.innerHTML = "";
                                        const defaultOption = document.createElement("option");
                                        defaultOption.text = "Select Team";
                                        teamName.appendChild(defaultOption);
                                        
                                        for (let i = 0; i < data6.response.length; i++) {
                                            const options = document.createElement("option");
                                            options.text = data6.response[i].team.name;
                                            teamName.appendChild(options);

                                            for(let k=0;k<data6.response.length;k++){
                                                console.log(data6.response[i].team.logo,data6.response[i].team.name,data6.response[i].team.founded);
                                            }
                                            for(let p=0;p<data6.response.length;p++){
                                                console.log(data6.response[i].venue.city,data6.response[i].venue.name,data6.response[i].venue.image,data6.response[i].venue.capacity);



                                        }



                                        }
                                    })

                                }

                            }
                        }if (data2.response[i].league.name === "Ligue 1" && data2.response[i].country.name === "France") {
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

                                            for(let k=0;k<data3.response.length;k++){
                                                console.log(data3.response[i].team.logo,data3.response[i].team.name,data3.response[i].team.founded);

                                            }
                                            for(let p=0;p<data3.response.length;p++){
                                                console.log(data3.response[i].venue.city,data3.response[i].venue.name,data3.response[i].venue.image,data3.response[i].venue.capacity);



                                        }
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