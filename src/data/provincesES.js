/*
  =========================================================
  ESTRUCTURA DE DATOS: PROVINCES
  =========================================================

  ¿POR QUÉ ESTA ESTRUCTURA?

  Usamos un ARRAY de OBJETOS porque:
  - Tenemos una colección de elementos homogéneos (provincias)
  - Cada provincia tiene varias propiedades relacionadas
  - Necesitamos recorrerlas fácilmente (map, find, etc.)

  ¿POR QUÉ CADA OBJETO TIENE ESTAS PROPIEDADES?

  1) slug
     - Identificador único y legible
     - Se usa en la URL (routing)
     - No lleva espacios ni tildes
     - Evita problemas en enlaces
     Ejemplo:
       /provincia/madrid
       /provincia/santa-cruz-de-tenerife

  2) name
     - Nombre real de la provincia
     - Se muestra al usuario en la interfaz
     - Puede llevar espacios y tildes

  3) capital
     - Capital administrativa de la provincia
     - Se usa para consultar la API de OpenWeather
     - Permite obtener latitud y longitud reales

  SEPARACIÓN DE RESPONSABILIDADES:
  - slug → navegación y URLs
  - name → presentación
  - capital → lógica de negocio (API del tiempo)

  ¿POR QUÉ NO USAMOS SOLO STRINGS?
  Porque un string no es suficiente para:
  - Navegar
  - Mostrar
  - Consultar APIs externas

  ESTA ESTRUCTURA:
  - Es clara
  - Es escalable
  - Es fácil de mantener
  - Es muy habitual en aplicaciones reales
  =========================================================
*/

export const PROVINCES = [
  { slug: "a-coruna", name: "A Coruña", capital: "A Coruña" },
  { slug: "alava", name: "Álava", capital: "Vitoria-Gasteiz" },
  { slug: "albacete", name: "Albacete", capital: "Albacete" },
  { slug: "alicante", name: "Alicante", capital: "Alicante" },
  { slug: "almeria", name: "Almería", capital: "Almería" },
  { slug: "asturias", name: "Asturias", capital: "Oviedo" },
  { slug: "avila", name: "Ávila", capital: "Ávila" },
  { slug: "badajoz", name: "Badajoz", capital: "Badajoz" },
  { slug: "barcelona", name: "Barcelona", capital: "Barcelona" },
  { slug: "burgos", name: "Burgos", capital: "Burgos" },
  { slug: "caceres", name: "Cáceres", capital: "Cáceres" },
  { slug: "cadiz", name: "Cádiz", capital: "Cádiz" },
  { slug: "cantabria", name: "Cantabria", capital: "Santander" },
  { slug: "castellon", name: "Castellón", capital: "Castellón de la Plana" },
  { slug: "ciudad-real", name: "Ciudad Real", capital: "Ciudad Real" },
  { slug: "cordoba", name: "Córdoba", capital: "Córdoba" },
  { slug: "cuenca", name: "Cuenca", capital: "Cuenca" },
  { slug: "girona", name: "Girona", capital: "Girona" },
  { slug: "granada", name: "Granada", capital: "Granada" },
  { slug: "guadalajara", name: "Guadalajara", capital: "Guadalajara" },
  { slug: "gipuzkoa", name: "Gipuzkoa", capital: "San Sebastián" },
  { slug: "huelva", name: "Huelva", capital: "Huelva" },
  { slug: "huesca", name: "Huesca", capital: "Huesca" },
  { slug: "illes-balears", name: "Illes Balears", capital: "Palma" },
  { slug: "jaen", name: "Jaén", capital: "Jaén" },
  { slug: "la-rioja", name: "La Rioja", capital: "Logroño" },
  { slug: "las-palmas", name: "Las Palmas", capital: "Las Palmas de Gran Canaria" },
  { slug: "leon", name: "León", capital: "León" },
  { slug: "lleida", name: "Lleida", capital: "Lleida" },
  { slug: "lugo", name: "Lugo", capital: "Lugo" },
  { slug: "madrid", name: "Madrid", capital: "Madrid" },
  { slug: "malaga", name: "Málaga", capital: "Málaga" },
  { slug: "murcia", name: "Murcia", capital: "Murcia" },
  { slug: "navarra", name: "Navarra", capital: "Pamplona" },
  { slug: "ourense", name: "Ourense", capital: "Ourense" },
  { slug: "palencia", name: "Palencia", capital: "Palencia" },
  { slug: "pontevedra", name: "Pontevedra", capital: "Pontevedra" },
  { slug: "salamanca", name: "Salamanca", capital: "Salamanca" },
  { slug: "santa-cruz-de-tenerife", name: "Santa Cruz de Tenerife", capital: "Santa Cruz de Tenerife" },
  { slug: "segovia", name: "Segovia", capital: "Segovia" },
  { slug: "sevilla", name: "Sevilla", capital: "Sevilla" },
  { slug: "soria", name: "Soria", capital: "Soria" },
  { slug: "tarragona", name: "Tarragona", capital: "Tarragona" },
  { slug: "teruel", name: "Teruel", capital: "Teruel" },
  { slug: "toledo", name: "Toledo", capital: "Toledo" },
  { slug: "valencia", name: "Valencia", capital: "Valencia" },
  { slug: "valladolid", name: "Valladolid", capital: "Valladolid" },
  { slug: "bizkaia", name: "Bizkaia", capital: "Bilbao" },
  { slug: "zamora", name: "Zamora", capital: "Zamora" },
  { slug: "zaragoza", name: "Zaragoza", capital: "Zaragoza" },
];
