let page = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
  if (page < 1000) {
    page++;
    cargarPeliculas();
  }
});

btnAnterior.addEventListener('click', () => {
  if (page > 1) {
    page--;
    cargarPeliculas();
  }
});

const cargarPeliculas = async () => {
  try {
    const respuesa = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=403d12b4495d63a27177c9bcab24ed5e&language=en-US&page=${page}`
    );

    if (respuesa.status === 200) {
      const datos = await respuesa.json();

      let peliculas = '';
      datos.results.forEach((pelicula) => {
        peliculas += `
        <div class="pelicula">
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        <h3 class="titulo">${pelicula.title}</h3>
        </div>
        `;
      });

      document.getElementById('contenedor').innerHTML = peliculas;
    } else if (respuesa.status === 401) {
      console.log('wrong api key');
    } else if (respuesa.status === 404) {
      console.log('movie not found');
    } else {
      console.log('i dont know what happen');
    }
  } catch (error) {
    console.log(error);
  }
};

cargarPeliculas();
