// Chargez le fichier de configuration JSON
fetch('config.json')
  .then(response => response.json())
  .then(config => {
    // Obtenez la ville actuelle à partir du fichier de configuration
    const currentCity = config.cities[0]; // Choisissez la première ville par défaut

    // Utilisez la ville pour récupérer les données météo
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity.name}&appid=${currentCity.apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        const weather = {
          city: data.name,
          description: data.weather[0].description,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          icon: data.weather[0].icon,
        };
        displayWeather(weather);
      })
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));

function displayWeather(weather) {
    const weatherDiv = document.getElementById("weather");

    // Vérifiez si l'élément weatherDiv existe
    if (weatherDiv) {
        weatherDiv.innerHTML = '';
        const card = document.createElement('div');
        card.classList.add('weather-card');

        const title = document.createElement('h2');
        title.textContent = weather.city;
        card.appendChild(title);

        const icon = document.createElement('img');
        icon.src = `http://openweathermap.org/img/wn/${weather.icon}.png`;
        card.appendChild(icon);

        const description = document.createElement('p');
        description.textContent = weather.description;
        card.appendChild(description);

        const temperature = document.createElement('p');
        temperature.textContent = `Temperature: ${weather.temperature} °C`;
        card.appendChild(temperature);

        const humidity = document.createElement('p');
        humidity.textContent = `Humidity: ${weather.humidity}%`;
        card.appendChild(humidity);

        weatherDiv.appendChild(card);
        weatherDiv.style.display = 'block';
    } else {
        console.error("Element with id 'weather' not found.");
    }
}

