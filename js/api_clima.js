// Intentare poner diccion de viento con letras y no usando garados la cuanta es 
// Indice =Math.trunc((variable / 22.5) + 0.49999999999999999999) siendo indice entero y variable float
const ptosCardinales=['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO', 'N']

const apiKey = '8b2e17f3b249e84f6d81bc14f257219d'; // Asegúrate de reemplazar esto con tu API key.
const lat = -34.616667;  // Latitud Barrio caballito CABA
const lon = -58.45;  // Longitud de Barrio caballito CABA

// Función para convertir la fecha y hora UNIX a formato legible
function unixToTime(unixtime) {
    const date = new Date(unixtime * 1000);
    return date.toLocaleTimeString();
}

// Función para crear y agregar el contenido dinámico
function crearTarjetaClima(data) {
    // Crear contenedor principal
    const card = document.createElement('div');
    card.classList.add('tarjeta-clima');

    // Motrar ubicacion
    // Crear encabezado con ubicación y hora
    const Encabezado = document.createElement('div');
    Encabezado.classList.add('Encabezado');
    const localizacion = document.createElement('h2');
    localizacion.id = 'localizacion';
    localizacion.innerText = `Ubicación: ${data.name}`;
    Encabezado.appendChild(localizacion);

    // Crear icono del clima
    const weatherIcon = document.createElement('div');
    weatherIcon.classList.add('icono-clima');
    const imgIcon = document.createElement('img');
    imgIcon.id = 'icono-clima';
    imgIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    imgIcon.alt = 'Icono del Clima';
    weatherIcon.appendChild(imgIcon);

    // Crear condiciones actuales
    const estadoCielo = document.createElement('div');
    estadoCielo.classList.add('descripcion-cielo');   
    const descripcionCielo = document.createElement('p');
    descripcionCielo.id ="estado-cielo";
    descripcionCielo.innerHTML =`<strong>Cielo:</strong><span> ${data.weather[0].description}</span>`;
    estadoCielo.appendChild(descripcionCielo);
    const CondicionActual = document.createElement('div');
    CondicionActual.classList.add('clima-actual');

    const temperatura = document.createElement('div');
    temperatura.classList.add('temperatura');   
    const tempText = document.createElement('p');
    tempText.id = 'temperatura';
    tempText.innerHTML =`<strong>Temperatura:</strong><span> ${data.main.temp}°C</span>`;
    const senTermica = document.createElement('p');
    senTermica.id = 'sen-termica';
    senTermica.innerHTML = `<strong>Sensación Térmica:</strong><span> ${data.main.feels_like}°C</span>`;   
    temperatura.appendChild(tempText);
    temperatura.appendChild(senTermica);
    const humedad = document.createElement('div');
    humedad.classList.add('humedad');
    const humedadText = document.createElement('p');
    humedadText.id = 'humedad';
    humedadText.innerHTML = `<strong>Humedad:</strong><span> ${data.main.humidity}%</span>`;
    humedad.appendChild(humedadText);
    const presion = document.createElement('div');
    presion.classList.add('presion');
    const presionText = document.createElement('p');
    presionText.id = 'presion';
    presionText.innerHTML = `<strong>Presión:</strong><span> ${data.main.pressure} hPa</span>`;
    presion.appendChild(presionText);
    CondicionActual.appendChild(temperatura);
    CondicionActual.appendChild(humedad);
    CondicionActual.appendChild(presion);

/*********************************************** */

    // Crear información sobre el viento
    // poner diceccion del viento en letras
    let idDireccion=Math.trunc((data.wind.deg / 22.5) + 0.49999999999999999999);
    let direccionViento= ptosCardinales[idDireccion];


    const wind = document.createElement('div');
    wind.classList.add('wind');
    const windText = document.createElement('p');
    windText.id = 'viento';
    windText.innerHTML = `<strong>Viento: </strong><span>${data.wind.speed} m/s (${direccionViento})</span>`;
    wind.appendChild(windText);

    // Crear información sobre la precipitación
    const precipitation = document.createElement('div');
    precipitation.classList.add('precipitation');
    const rain = document.createElement('p');
    rain.in='lluvia'
    rain.innerHTML = `<strong>Lluvias: </strong><span>${data.rain ? data.rain['1h'] : 0}</span> mm/h`;
    precipitation.appendChild(rain);


    // Añadir todos los elementos al contenedor principal
    card.appendChild(Encabezado);
    card.appendChild(weatherIcon);
    card.appendChild(estadoCielo);
    card.appendChild(CondicionActual);
    card.appendChild(wind);
    card.appendChild(precipitation);

    // Insertar la tarjeta en el div "resultadoClima"
    document.getElementById('resultadoClima').appendChild(card);
}

// Función para obtener los datos de la API
async function getWeatherData() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`);
        const data = await response.json();
        crearTarjetaClima(data);  // Llamamos la función para crear la tarjeta con los datos obtenidos
        console.log(data);
    } catch (error) {
        console.error('Error al obtener los datos meteorológicos:', error);
    }
}

// Llamar a la función para cargar los datos al cargar la página
window.onload = getWeatherData;

