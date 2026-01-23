/*
  =========================================================
  ARCHIVO: main.jsx
  =========================================================
  ¿QUÉ ES ESTE ARCHIVO?
  - Es el punto de entrada de la aplicación React.
  - Es el primer archivo que se ejecuta en el navegador.
  - Se encarga de "enganchar" React al HTML real.
  - Indica a React dónde debe renderizar la aplicación.

  IDEA CLAVE PARA CLASE:
  - React NO vive solo.
  - Necesita un elemento HTML real donde montarse.
  =========================================================
*/

import React from "react";
// Importamos React.
// Aunque en versiones modernas no siempre es obligatorio
// escribir React explícitamente en JSX, sigue siendo habitual
// importarlo para claridad y compatibilidad.

import ReactDOM from "react-dom/client";
// ReactDOM es el módulo encargado de interactuar con el DOM real.
// "react-dom/client" contiene la API moderna de React 18.

import App from "./App.jsx";
// Importamos el componente raíz de la aplicación.
// App define las rutas y estructura general.

/*
  ReactDOM.createRoot(...)

  - createRoot es la API moderna introducida en React 18.
  - Crea un "root" de React.
  - Ese root es el punto donde React controla el DOM.
*/
ReactDOM.createRoot(

  /*
    document.getElementById("root")

    - Buscamos un elemento HTML real con id="root".
    - Este elemento suele estar en index.html:
        <div id="root"></div>
    - React renderizará TODA la aplicación dentro de ese div.
  */
  document.getElementById("root")

  /*
    .render(...)

    - render indica qué se va a mostrar dentro del root.
    - A partir de aquí React toma el control del DOM.
  */
).render(

  /*
    <React.StrictMode>

    - StrictMode NO es obligatorio.
    - Solo se usa en desarrollo.
    - Ayuda a detectar:
        * efectos secundarios peligrosos
        * uso incorrecto de hooks
        * código no recomendado
    - En producción NO afecta al rendimiento.

    IMPORTANTE:
    - En desarrollo puede hacer que ciertos efectos se ejecuten dos veces
      (a propósito) para detectar errores.
  */
  <React.StrictMode>

    {/*
      <App />

      - Componente raíz de la aplicación.
      - Todo lo que ve el usuario cuelga de App.
      - App contiene el router y las páginas.
    */}
    <App />

  </React.StrictMode>
);
