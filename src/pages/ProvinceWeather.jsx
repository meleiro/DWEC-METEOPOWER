/*
  =========================================================
  COMPONENTE: ProvinceWeather
  =========================================================

  Este componente representa la "página de detalle" del tiempo
  de una provincia concreta.

  Flujo general:
  1) Lee el parámetro :slug de la URL (React Router).
  2) Busca la provincia correspondiente en el array PROVINCES.
  3) Usa la capital de la provincia para:
     - obtener coordenadas (lat/lon)
     - pedir el tiempo actual a OpenWeather
  4) Gestiona estados de carga, error y datos.
  5) Renderiza la información de forma condicional.
*/

import { useMemo, useEffect, useState } from "react";
/*
  useState:
  - Permite guardar estado dentro del componente.
  - Cada cambio de estado provoca un nuevo render.

  useEffect:
  - Permite ejecutar efectos secundarios:
    peticiones HTTP, timers, suscripciones, etc.
  - Se ejecuta tras renderizar el componente.

  useMemo:
  - Memoriza el resultado de un cálculo.
  - Evita recalcularlo en cada render si las dependencias no cambian.
*/

import { useParams, Link } from "react-router-dom";
/*
  useParams:
  - Lee los parámetros dinámicos definidos en el router.
  - Si la ruta es /provincia/:slug
    y entramos en /provincia/madrid
    => slug = "madrid"

  Link:
  - Enlace de navegación SPA (sin recargar la página).
*/

import { PROVINCES } from "../data/provincesES";


/*
  PROVINCES:
  - Array local con datos de provincias españolas.
  - Cada objeto suele tener:
      { slug, name, capital }
*/

import { geocodeCity, getCurrentWeather } from "../api/openweather";
/*
  Funciones de acceso a la API de OpenWeather.

  Ventaja:
  - El componente no sabe nada de URLs, fetch, API keys...
  - Solo llama a funciones de alto nivel.
*/

export default function ProvinceWeather() {

    /*
      1) OBTENER EL SLUG DE LA URL
      ---------------------------
      useParams devuelve un objeto con todos los parámetros
      dinámicos de la ruta.
    */
    const { slug } = useParams();



    /*
      2) BUSCAR LA PROVINCIA A PARTIR DEL SLUG
      ---------------------------------------

      - Buscamos en PROVINCES la provincia cuyo slug
        coincide con el slug de la URL.
      - Usamos useMemo para que este cálculo solo se
        repita cuando cambie slug.
    */
    const province = useMemo(
        () => PROVINCES.find(p => p.slug === slug),
        [slug]
    );

    /*
      3) ESTADOS DEL COMPONENTE
      ------------------------

      loading:
      - Indica si estamos esperando datos de la API.

      err:
      - Guarda un mensaje de error para mostrar al usuario.

      weather:
      - Guarda los datos meteorológicos devueltos por OpenWeather.

      place:
      - Guarda información del lugar (texto a mostrar + geo).
    */
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [weather, setWeather] = useState(null);
    const [place, setPlace] = useState(null);

    /*
      4) EFECTO PARA CARGAR LOS DATOS
      ------------------------------

      Este useEffect se ejecuta:
      - al montar el componente
      - cada vez que cambia la provincia

      Importante:
      - El componente puede desmontarse mientras esperamos
        una respuesta de la API.
      - Para evitar errores, usamos la variable "cancelled".
    */
    useEffect(() => {

        // Bandera para evitar setState en componente desmontado
        let cancelled = false;

        /*
          Definimos una función async interna.
          useEffect NO puede ser async directamente.
        */
        async function load() {

            try {
                /*
                  Antes de empezar la carga:
                  - activamos el estado de carga
                  - limpiamos errores anteriores
                  - borramos datos previos
                */
                setLoading(true);
                setErr("");
                setWeather(null);

                /*
                  Si no existe la provincia (slug inválido),
                  lanzamos un error manualmente.
                */
                if (!province) throw new Error("Provincia no encontrada");

                /*
                  PASO 1: GEOCODIFICACIÓN
                  -----------------------
                  Convertimos el nombre de la capital en
                  coordenadas geográficas.
                */
                const geo = await geocodeCity(province.capital);

                /*
                  PASO 2: TIEMPO ACTUAL
                  --------------------
                  Con latitud y longitud pedimos el tiempo.
                */
                const w = await getCurrentWeather(geo.lat, geo.lon);

                /*
                  Si el componente se desmontó mientras
                  esperábamos la respuesta, no hacemos nada.
                */
                if (cancelled) return;

                /*
                  Guardamos información del lugar para mostrar
                  en pantalla.
                */
                setPlace({
                    display: `${province.name}  (capital: ${province.capital})`,
                    geo,
                });

                /*
                  Guardamos los datos del tiempo.
                */
                setWeather(w);

            } catch (e) {
                /*
                  Capturamos cualquier error:
                  - provincia inexistente
                  - fallo de red
                  - error en la API
                */
                if (!cancelled) {
                    setErr(e?.message || "error desconocido");
                }

            } finally {
                /*
                  Este bloque se ejecuta siempre.
                  Quitamos el estado de carga.
                */
                if (!cancelled) setLoading(false);
            }
        }

        // Ejecutamos la carga de datos
        load();

        /*
          Cleanup del effect:
          - Se ejecuta cuando el componente se desmonta
            o antes de volver a ejecutar el effect.
        */
        return () => {
            cancelled = true;
        };

    }, [province]); // Se vuelve a ejecutar cuando cambia la provincia


    /*
      5) RENDER ESPECIAL: PROVINCIA NO ENCONTRADA
      ------------------------------------------
      Si el slug no coincide con ninguna provincia,
      mostramos un mensaje y salimos del componente.
    */
    if (!province) {
        return (
            <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>
                <p>Provincia no encontrada</p>
                <Link to="/">Volver</Link>
            </div>
        );
    }

    /*
      6) RENDER PRINCIPAL
      ------------------
      Renderizamos según el estado:
      - loading
      - error
      - datos correctos
    */
    return (
        <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>

            {/* Enlace para volver a la página principal */}
            <Link to="/">Volver</Link>

            <h2>Tiempo actual</h2>

            {/* Si loading es true, mostramos el mensaje */}
            {loading && <p>Cargando...</p>}

            {/* Si hay error, lo mostramos */}
            {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

            {/* Si hay datos del tiempo, los mostramos */}
            {weather && (

                <div style={{ border: "1px solid #000", borderRadius: 8, padding: 16 }}>

                    {/* Optional chaining para evitar errores si place es null */}
                    <h3>{place?.display}</h3>

                    {/* Temperatura redondeada */}
                    <p>{Math.round(weather.main.temp)}ºC</p>

                    {/* Descripción del tiempo */}
                    <p>{weather.weather?.[0]?.description}</p>

                    {/* Icono del tiempo (si existe) */}
                    {weather.weather?.[0]?.icon && (
                        <img
                            alt="icono del tiempo"
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        />
                    )}

                    {/* Información adicional */}
                    <ul>
                        <li>Humedad: {weather.main.humidity}%</li>
                        <li>Viento: {weather.main.speed} m/s</li>
                    </ul>

                </div>
            )}
        </div>
    );
}
