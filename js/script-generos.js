document.addEventListener("DOMContentLoaded", function() { 

  // Buscar los carruseles en el DOM (puede que no existan en cada página)
  const carruselNarradores = document.getElementById("carrusel-narradores");
  const carruselSubgeneros = document.getElementById("carrusel-subgeneros-narrativo");
  const carruselTipoCuentos = document.getElementById("carrusel-tipo-cuento");
  const carruselDramatico = document.getElementById("carrusel-obras-dramaticas");
  const carruselLirico = document.getElementById("carrusel-obras-liricas");

  // Obtener favoritos existentes
  let favoritos = JSON.parse(localStorage.getItem('obrasMilitera')) || [];

  // Carrusel de cada género
  const obrasNarradores = [
    { imagen: "tom.jpg", titulo: "Tom Sawyer", autor: "Mark Twain" },
    { imagen: "obrasN1.jpg", titulo: "Lady Susan", autor: "Jane Austen" },
    { imagen: "obrasN2.jpg", titulo: "La invención de Morel", autor: "Adolfo Bioy Casares" },
    { imagen: "obrasN3.jpg", titulo: "Las aventuras de Gulliver", autor: "Jonathan Swift" },
    { imagen: "obrasN4.jpg", titulo: "El extraño caso del Dr. Jekyll y el Sr. Hyde", autor: "Robert Louis Stevenson" }
  ];

  const obrasSubgenerosNarrativos = [
    { imagen: "obrasSubgeneros1.jpg", titulo: "Viaje al centro de la Tierra", autor: "Julio Verne" },
    { imagen: "obrasSubgeneros2.jpg", titulo: "Alicia en el País de las Maravillas", autor: "Lewis Carroll" },
    { imagen: "obrasSubgeneros6.jpg", titulo: "Orgullo y Prejuicio", autor: "Jane Austen" },
    { imagen: "obrasSubgeneros3.jpg", titulo: "El crimen de Lord Arthur Savile", autor: "Oscar Wilde" },
    { imagen: "obrasSubgeneros4.jpg", titulo: "Colmillo Blanco", autor: "Jack London" },
    { imagen: "obrasSubgeneros5.jpg", titulo: "Relato de un náufrago", autor: "Gabriel García Márquez" }
  ];

  const obrasTipoCuento = [
    { imagen: "obrasCuento1.jpg", titulo: "Ficciones", autor: "Jorge Luis Borges" },
    { imagen: "obrasCuento2.jpg", titulo: "Crónicas Marcianas", autor: "Ray Bradbury" },
    { imagen: "obrasCuento3.jpg", titulo: "Drácula", autor: "Bram Stoker" },
    { imagen: "obrasCuento6.jpg", titulo: "Bestiario", autor: "Julio Cortazar" },
    { imagen: "obrasCuento5.jpg", titulo: "¿Sueñan los androides con ovejas eléctricas?", autor: "Philip K. Dick" }
  ];

  const obrasDramaticas = [
    { imagen: "obrasDramatico1.jpg", titulo: "Romeo y Julieta", autor: "William Shakespeare" },
    { imagen: "obrasDramatico2.jpg", titulo: "Otelo", autor: "William Shakespeare" },
    { imagen: "obrasDramatico3.jpg", titulo: "La dama de las camelias", autor: "Alexandre Dumas hijo" },
    { imagen: "obrasDramatico4.jpg", titulo: "Antígona", autor: "Sófocles" },
    { imagen: "obrasDramatico5.jpg", titulo: "La casa de Bernarda Alba", autor: "Federico García Lorca" }
  ];

  const obrasLiricas = [
    { imagen: "obrasLirico1.jpg", titulo: "La Odisea", autor: "Homero" },
    { imagen: "obrasLirico2.jpg", titulo: "La Eneida", autor: "Virgilio" },
    { imagen: "obrasLirico3.jpg", titulo: "El cantar de los cantares", autor: "Anónimo (bíblico)" },
    { imagen: "obrasLirico4.jpg", titulo: "Rig Veda", autor: "Tradición hindú" },
    { imagen: "obrasLirico5.jpg", titulo: "Rimas y Leyendas", autor: "Gustavo Adolfo Bécquer" }
  ];

  // Función para renderizar cada obra
  function renderizarCarrusel(carrusel, obras) {
    if (!carrusel) return;

    obras.forEach(obra => {
      const slide = document.createElement('div');
      slide.className = 'slide';

      const esFavorito = favoritos.some(fav => fav.titulo === obra.titulo);

      slide.innerHTML = `
        <img src="./recursos_multimedia/${obra.imagen}" alt="${obra.titulo}">
        <div class="info-obra">
          <p class="titulo-obra">${obra.titulo}</p>
          <p class="autor-obra">${obra.autor}</p>
          <button class="favorito" title="Agregar a MiLitEra">
            <span class="material-icons" style="color: ${esFavorito ? '#546BB9' : '#000000'}">
              ${esFavorito ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
        </div>
      `;

      carrusel.appendChild(slide);
    });
  }

  renderizarCarrusel(carruselNarradores, obrasNarradores);
  renderizarCarrusel(carruselSubgeneros, obrasSubgenerosNarrativos);
  renderizarCarrusel(carruselTipoCuentos, obrasTipoCuento);
  renderizarCarrusel(carruselDramatico, obrasDramaticas);
  renderizarCarrusel(carruselLirico, obrasLiricas);


  // Evento click en los botones de favoritos 
  document.addEventListener("click", function(e) {
    if (e.target.closest(".favorito")) {
      const card = e.target.closest(".slide");
      const titulo = card.querySelector('.titulo-obra').innerText;
      const autor = card.querySelector('.autor-obra').innerText;
      const imagenSrc = card.querySelector('img').getAttribute('src');

      const yaExiste = favoritos.find(obra => obra.titulo === titulo);

      if (yaExiste) {
        favoritos = favoritos.filter(obra => obra.titulo !== titulo);
      } else {
        favoritos.push({ titulo, autor, imagen: imagenSrc });
      }

      localStorage.setItem('obrasMilitera', JSON.stringify(favoritos));
      location.reload(); // actualiza el icono visualmente
    }
  });

});
