// Récupérati0n des éléments du DOM (document objet model)
let button = document.querySelector('.button');
let inputValue = document.querySelector('.inputvalue');
let nom = document.querySelector('.nom');
let latLong = document.querySelector('.lat-long');
let temperature = document.querySelector('.temperature');
let card = document.querySelector('.card');


// écoute l'évenement "click"
button.addEventListener('click', () => {
    // récupère les éléments de l'api gràce au fetch mais aussi à l'insertion de l'inputinputValue.value qui me permet de lancer
    // une recherche . Ici je lance ma recherche par nom de ville .
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.value + '&appid=0dc13f6c999bbc944a50b773503797fd&units=metric')
        .then(response => response.json())
        .then(value => {

            // récupere les éléments à partir de mot clé contenue dans l'api sous forme JSON
            // que j'affecte au variable correspondant à mes querySelector.
            nom.innerHTML = value.city.name;
            const c = value.city.coord
            latLong.innerHTML = `Latitude : ${c.lat} - Longitude : ${c.lon}`
            let template = ''
            // parcours la liste contenue dans l'API  grace au for each .
            for (let entry of value.list) {
                //console.log("ici c'est paris", entry.main.temp)
                // récupre les éléments et transforme en HTML que j'affecte à la div template
                template += `
                <div class="weather-wrapper">
                    <p>température :${entry.main.temp}</p>
                    <p>${entry.dt_txt}</p>
                    <center>
                       <img src="https://openweathermap.org/img/w/${entry.weather[0].icon}.png"/>
                    </center>
                    <hr/>
                    <div class="center">
                    <ul><li>Min :${entry.main.temp_min}</li>
                        <li>Max :${entry.main.temp_max}</li>
                    </ul>
                    <p>Humidité :${entry.main.humidity}</p>
                    </div>
                </div>`;

            }
            // affectation de template à card.innerHTML afin d'injecter mon code dynamiquement.
            card.innerHTML = template;

        })
        // Récupère l'erreur en cas d'insertion éronnée dans mon input.
        .catch(err => alert("Cette ville n'existe pas"))
})
