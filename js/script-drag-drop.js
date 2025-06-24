const rondas = [
    [
        { img: "./recursos_multimedia/obrasSubgeneros6.jpg", genero: "Narrativo" },
        { img: "./recursos_multimedia/obrasDramatico2.jpg", genero: "Dramático" },
        { img: "./recursos_multimedia/obrasLirico5.jpg", genero: "Lírico" }
    ],
    [
        { img: "./recursos_multimedia/obrasN3.jpg", genero: "Narrativo" },
        { img: "./recursos_multimedia/obrasDramatico5.jpg", genero: "Dramático" },
        { img: "./recursos_multimedia/obrasLirico3.jpg", genero: "Lírico" }
    ],
    [
        { img: "./recursos_multimedia/obrasN2.jpg", genero: "Narrativo" },
        { img: "./recursos_multimedia/obrasDramatico1.jpg", genero: "Dramático" },
        { img: "./recursos_multimedia/obrasLirico1.jpg", genero: "Lírico" }
    ],
     [
        { img: "./recursos_multimedia/obrasSubgeneros5.jpg", genero: "Narrativo" },
        { img: "./recursos_multimedia/obrasDramatico4.jpg", genero: "Dramático" },
        { img: "./recursos_multimedia/obrasLirico4.jpg", genero: "Lírico" }
    ]

];

let rondaActual = 0;

function cargarRonda() {
    const contenedor = document.getElementById('zona-obras');
    contenedor.innerHTML = "";

    // Limpiar las zonas de género
    document.querySelectorAll('.zona-genero').forEach(zona => {
        zona.innerHTML = zona.dataset.genero; // dejar solo el título
    });

    rondas[rondaActual].forEach((obra, index) => {
        const img = document.createElement('img');
        img.src = obra.img;
        img.classList.add('obra');
        img.draggable = true;
        img.dataset.genero = obra.genero;
        img.id = `obra-${index}`;

        img.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id);
        });

        contenedor.appendChild(img);
    });
}


document.querySelectorAll('.zona-genero').forEach(zona => {
    zona.addEventListener('dragover', e => e.preventDefault());

    zona.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const img = document.getElementById(id);

        if (img.dataset.genero === zona.dataset.genero) {
            zona.appendChild(img);
            img.draggable = false;
        } else {
            // vuelve al inicio si es incorrecto
            document.getElementById('zona-obras').appendChild(img);
        }
    });
});

document.getElementById('btn-siguiente').addEventListener('click', () => {
    rondaActual++;
    if (rondaActual < rondas.length) {
        cargarRonda();
    } else {
        alert("¡Actividad finalizada!");
        rondaActual = 0;
        cargarRonda();
    }
});

window.onload = cargarRonda;
