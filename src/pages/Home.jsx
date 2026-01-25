// Importamos el hook useNavigate desde react-router-dom.
// - Un "hook" es una función especial de React que da acceso a funcionalidades.
// - useNavigate() nos permite cambiar de ruta (navegar) desde código JavaScript,
//   sin necesidad de que el usuario pinche un enlace <Link> o <a>.
import { useNavigate } from "react-router-dom";

// Importamos el array PROVINCES desde un fichero local.
// - PROVINCES es una lista de objetos con datos de provincias.
// - Cada objeto suele tener: { slug, name, capital }
// - Aquí lo usaremos para generar dinámicamente las opciones del <select>.
import { PROVINCES } from "../data/provincesES";

// Exportamos por defecto el componente Home.
// - "Home" es un componente React (una función que devuelve JSX).
// - Es la página principal donde el usuario elige una provincia.
export default function Home() {

  // Llamamos al hook useNavigate() para obtener una función de navegación.
  // - La guardamos en la constante "navigate".
  // - Luego podremos hacer: navigate("/ruta") para movernos a otra página.
  const navigate = useNavigate();

  // Función manejadora del evento "change" del <select>.
  // - Se ejecuta cada vez que el usuario cambia la opción seleccionada.
  // - e es el evento del navegador (SyntheticEvent de React).
  function onChange(e) {

    // e.target es el elemento HTML que disparó el evento.
    // Como el evento viene del <select>, e.target es ese <select>.
    //
    // e.target.value es el valor de la opción seleccionada.
    // En este caso, será el "slug" de la provincia (por ejemplo "madrid").
    const slug = e.target.value;

    // Si por alguna razón slug está vacío (""), no hacemos nada.
    // Esto evita navegar a una URL incorrecta.
    // Puede pasar si el <select> todavía está en la opción por defecto.
    if (!slug) return;

    // Navegamos programáticamente a la ruta dinámica:
    // /provincia/:slug
    //
    // Ejemplo: si slug = "madrid" -> /provincia/madrid
    //
    // React Router interpretará esa ruta y cargará el componente asociado
    // (por ejemplo, ProvinceWeather) donde se muestra el tiempo de la provincia.
    navigate(`/provincia/${slug}`);
  }

  // El return de un componente React devuelve JSX:
  // - JSX se parece a HTML, pero en realidad es JavaScript transformado
  //   a llamadas de React.createElement() por el build (Vite/Babel).
  return (

    // Contenedor principal.
    // style recibe un objeto JS (no una cadena CSS).
    // - maxWidth: ancho máximo de 700px
    // - margin: centrado con márgenes arriba/abajo de 40px y auto a los lados
    // - fontFamily: Arial para un estilo simple
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>

      {/* Título principal de la página */}
      <h1>Meteo Power , tiempo por provincias</h1>

      {/* Texto explicativo para guiar al usuario */}
      <p>Selecciona la provincia</p>

      {/* Un label para asociar texto + select (accesibilidad) */}
      <label>

        {/* &nbsp; es un espacio no separable en HTML (para que no se rompa la línea) */}
        Provincia:&nbsp;

        {/* 
          <select> crea un desplegable.
          
          defaultValue=""
          - Indica el valor inicial seleccionado.
          - En este caso "", para que empiece en la opción placeholder.

          onChange={onChange}
          - Vincula el evento "change" del select a nuestra función onChange.
          - Cada cambio hará navigate(...) a la página de esa provincia.
        */}
        <select defaultValue="" onChange={onChange}>

          {/* 
            Opción inicial tipo "placeholder".
            - value="" hace que su valor sea vacío.
            - disabled impide que el usuario la seleccione como opción válida
              (aunque puede aparecer como la opción inicial).
          */}
          <option value="" disabled>--Elige una provincia--</option>

          {/*
            PROVINCES.map(...)
            - Recorre el array de provincias y genera un <option> por cada una.
            - Esto es "renderizado dinámico" a partir de datos.

            p => (...)
            - p es cada provincia (objeto) del array.
            - p.slug es el valor que usaremos para navegar.
            - p.name es el texto que verá el usuario.
          */}
          {PROVINCES.map(p => (

            // Cada elemento en una lista en React necesita una prop "key".
            // - key ayuda a React a identificar elementos cuando cambian.
            // - Usamos p.slug porque debería ser único.
            //
            // value={p.slug} es lo que se guardará en e.target.value
            // cuando el usuario seleccione esa opción.
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}

        </select>
      </label>
    </div>
  );
}
