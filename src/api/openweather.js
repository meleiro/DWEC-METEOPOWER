// Leemos la API KEY desde las variables de entorno de Vite
// Vite SOLO expone al frontend las variables que empiezan por VITE_
const API_KEY = import.meta.env.VITE_OWM_API_KEY;

/*
  =========================================================
  FUNCIÓN: geocodeCity
  ---------------------------------------------------------
  OBJETIVO:
  - Convertir el nombre de una ciudad en coordenadas (lat, lon)
  - OpenWeather recomienda usar coordenadas en lugar de nombres
  ---------------------------------------------------------
  PARÁMETRO:
  - cityName → nombre de la ciudad (string)
  ---------------------------------------------------------
  DEVUELVE:
  - Un objeto con latitud, longitud y nombre
  =========================================================
*/
export async function geocodeCity(cityName) {

  // Comprobación de seguridad:
  // Si no existe la API key, lanzamos un error
  if (!API_KEY) {
    throw new Error("Falta VITE_OWM_API_KEY en .env");
  }

  // Creamos la URL base de la API de geolocalización
  // URL es una clase nativa de JavaScript
  const url = new URL("https://api.openweathermap.org/geo/1.0/direct");

  // Añadimos parámetros a la URL (query string)
  // q = ciudad + país (ES = España)
  url.searchParams.set("q", `${cityName},ES`);

  // limit = número máximo de resultados (1 nos basta)
  url.searchParams.set("limit", "1");

  // appid = API key obligatoria para OpenWeather
  url.searchParams.set("appid", API_KEY);

  // Realizamos la petición HTTP con fetch (API nativa del navegador)
  const res = await fetch(url);

  // Si la respuesta NO es correcta (404, 401, etc.), lanzamos error
  if (!res.ok) {
    throw new Error(`Geocoding error: ${res.status}`);
  }

  // Convertimos la respuesta JSON en un objeto JavaScript
  const data = await res.json();

  // Comprobamos que la API ha devuelto resultados
  // data es un array; si está vacío, no se encontró la ciudad
  if (!data?.length) {
    throw new Error("No se encontró la localización");
  }

  // Devolvemos SOLO los datos que nos interesan
  // (no todo el objeto que devuelve la API)
  return {
    lat: data[0].lat,   // latitud
    lon: data[0].lon,   // longitud
    name: data[0].name  // nombre normalizado
  };
}

/*
  =========================================================
  FUNCIÓN: getCurrentWeather
  ---------------------------------------------------------
  OBJETIVO:
  - Obtener el tiempo actual usando latitud y longitud
  ---------------------------------------------------------
  PARÁMETROS:
  - lat → latitud
  - lon → longitud
  ---------------------------------------------------------
  DEVUELVE:
  - El JSON completo del tiempo actual
  =========================================================
*/
export async function getCurrentWeather(lat, lon) {

  // Verificación de que la API key existe
  if (!API_KEY) {
    throw new Error("Falta VITE_OWM_API_KEY en .env");
  }

  // Creamos la URL base de la API de tiempo actual
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");

  // Parámetros obligatorios: latitud y longitud
  // String() asegura que se envían como texto
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));

  // units=metric → temperatura en grados Celsius
  url.searchParams.set("units", "metric");

  // lang=es → descripciones del tiempo en español
  url.searchParams.set("lang", "es");

  // API key
  url.searchParams.set("appid", API_KEY);

  // Llamada HTTP a la API
  const res = await fetch(url);

  // Si la respuesta no es correcta, lanzamos error
  if (!res.ok) {
    throw new Error(`Weather error: ${res.status}`);
  }

  // Devolvemos el JSON completo con los datos del tiempo
  return res.json();
}
