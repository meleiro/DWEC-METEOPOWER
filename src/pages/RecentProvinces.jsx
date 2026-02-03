// =========================================================
// PÁGINA: RecentProvinces
// =========================================================
//
// ¿QUÉ HACE ESTE COMPONENTE?
// - Muestra el historial de provincias visitadas recientemente.
// - El historial se guarda en localStorage como una lista de slugs.
// - Esta página:
//     1) Lee los slugs guardados
//     2) Los transforma en objetos provincia reales
//     3) Los muestra como enlaces
//     4) Permite borrar el historial
//
// CONCEPTOS QUE SE PRACTICAN:
// - useState con inicialización diferida
// - useMemo para cálculos derivados
// - uso de Map para búsquedas eficientes
// - renderizado condicional
// - navegación con React Router
// =========================================================

import { useMemo, useState } from "react";
/*
  useState:
  - Permite almacenar estado interno en el componente.
  - Cuando el estado cambia, React vuelve a renderizar.

  useMemo:
  - Memoriza el resultado de un cálculo.
  - Evita recalcularlo en cada render si las dependencias no cambian.
*/

import { Link } from "react-router-dom";
/*
  Link:
  - Permite navegar entre rutas sin recargar la página.
  - Fundamental en una SPA (Single Page Application).
*/

import { PROVINCES } from "../data/provincesES";
/*
  PROVINCES:
  - Array con todas las provincias disponibles en la aplicación.
  - Cada provincia suele tener:
      {
        slug: "madrid",
        name: "Madrid",
        capital: "Madrid"
      }
*/

import { clearRecentSlugs, getRecentSlugs } from "../utils/recentProvinces";
/*
  Funciones auxiliares para trabajar con localStorage:

  getRecentSlugs():
  - Lee el historial desde localStorage
  - Devuelve un array de slugs

  clearRecentSlugs():
  - Borra completamente el historial
*/

export default function RecentProvinces() {

    /*
      1) ESTADO: recentSlugs
      ---------------------
      - Guarda un array de slugs visitados recientemente.
      - Ejemplo:
          ["madrid", "sevilla", "valencia"]

      useState(() => getRecentSlugs()):
      - Se pasa una FUNCIÓN como valor inicial.
      - Esto se llama "lazy initialization".
      - La función solo se ejecuta UNA VEZ, al montar el componente.
      - Evita leer localStorage en cada render.
    */
    const [recentSlugs, setRecentSlugs] = useState(() => getRecentSlugs());

    /*
      2) CÁLCULO DERIVADO: recentProvinces
      -----------------------------------
      - Convertimos los slugs guardados en objetos provincia completos.
      - Es un dato DERIVADO del estado, no un estado nuevo.

      useMemo:
      - Solo recalcula este bloque cuando cambia recentSlugs.
    */
    const recentProvinces = useMemo(() => {

        /*
          Creamos un Map para búsquedas rápidas:
          - clave   -> slug
          - valor   -> objeto provincia

          Ventaja:
          - map.get(slug) es más eficiente que hacer
            PROVINCES.find(...) muchas veces.
        */
        const map = new Map(PROVINCES.map((p) => [p.slug, p]));

        /*
          Transformamos la lista de slugs en provincias reales:

          1) map.get(slug):
             - Devuelve la provincia asociada al slug
             - O undefined si no existe

          2) filter(Boolean):
             - Elimina valores falsy (undefined, null...)
             - Protege contra slugs inválidos o antiguos
        */
        return recentSlugs
            .map((slug) => map.get(slug))
            .filter(Boolean);

    }, [recentSlugs]); // Dependencia: solo recalcula si cambia recentSlugs

    /*
      3) MANEJADOR: borrar historial
      ------------------------------
      - Borra los datos persistentes (localStorage)
      - Actualiza el estado para forzar el re-render
    */
    function handleClear() {
        clearRecentSlugs();   // Borra localStorage
        setRecentSlugs([]);  // Limpia el estado en memoria
    }

    /*
      4) RENDER DEL COMPONENTE
      -----------------------
      - Se muestran dos estados posibles:
          A) No hay provincias recientes
          B) Hay historial
    */
    return (

        <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>

            {/* Enlace para volver a la página principal */}
            <Link to="/">Volver</Link>

            <h2>Recientes</h2>

            {/* Renderizado condicional con operador ternario */}
            {recentProvinces.length === 0 ? (

                /*
                  CASO A: historial vacío
                  ----------------------
                */
                <p>No hay provincias recientes</p>

            ) : (

                /*
                  CASO B: hay provincias recientes
                  --------------------------------
                */
                <>
                    {/* Botón para borrar el historial */}
                    <button onClick={handleClear}>
                        Borrar historial
                    </button>

                    {/* 
                      Aquí se mostraría la lista de provincias recientes.
                      (Falta el map para renderizarlas)
                    */}
                    <ul>
                        
                    </ul>
                </>
            )}
        </div>
    );
}
