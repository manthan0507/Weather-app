const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const weatherIcon = document.querySelector('#weather-icon');
const currentLocation = document.querySelector('#currentLocation');

currentLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported');

    }
    navigator.geolocation.getCurrentPosition((position) => {
        const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        messageOne.textContent = 'Loading...',
            messageTwo.textContent = '',
            weatherIcon.innerHTML = '';

        fetch(`/weather/?latitude=${location.latitude}&longitude=${location.longitude}`).then((Response) => {
            Response.json().then((data) => {

                if (data.error) {
                    // console.log(data.error);
                    messageOne.textContent = data.error;
                } else {
                    // console.log("Location: " + data.location + ", temperature: " + data.forecast.temperature);
                    messageOne.textContent = data.forecast.location;
                    messageTwo.textContent = data.forecast.temperature + '℃ , ' + data.forecast.weather_descriptions;
                    weatherIcon.innerHTML = `<img src="${data.forecast.icon}" id="weather-icon" alt="weather icon">`;

                }
            }).catch((error) => {
                messageOne.textContent = error;
            });
        }).catch((error) => {
            // console.error(error);
            messageOne.textContent = error;

        })

    }, (error) => {
        messageOne.textContent = error.message;
    })
})

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log("Testing");
    const location = search.value;
    messageOne.textContent = 'Loading...',
        messageTwo.textContent = '',
        weatherIcon.innerHTML = '';
    if (search.value) {
        fetch("/weather/?address=" + location).then((Response) => {
            Response.json().then((data) => {
                if (data.error) {
                    // console.log(data.error);
                    messageOne.textContent = data.error;
                } else {
                    // console.log("Location: " + data.location + ", temperature: " + data.forecast.temperature);
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast.temperature + '℃ , ' + data.forecast.weather_descriptions;
                    weatherIcon.innerHTML = `<img src="${data.forecast.icon}" id="weather-icon" alt="weather icon">`;

                }
            }).catch((error) => {
                messageOne.textContent = error;
            });
        }).catch((error) => {
            // console.error(error);
            messageOne.textContent = error;

        })
    } else {
        messageOne.textContent = "Please enter apropriate location";
    }
});