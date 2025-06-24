const frases = [
    "“Uno no es lo que es por lo que escribe, sino por lo que ha leído.” - Jorge Luis Borges",
    "“El teatro es poesía que se sale del libro para hacerse humana.” - Federico García Lorca",
     "“El viaje más maravilloso no es al centro de la tierra o a los confines del universo sino al fondo de uno mismo” - Julio Verne",
     "“La imaginación es la única arma en la guerra contra la realidad” - Lewis Carroll",
    "“La fantasía es, como muchas otras cosas, un derecho legítimo de todo ser humano, pues a través de ella se halla una completa libertad y satisfacción.” - J. R. R. Tolkien",
    "“Las palabras nunca alcanzan cuando lo que hay que decir desborda el alma.” - Julio Cortázar",
];

const aleatoria = frases[Math.floor(Math.random() * frases.length)];
document.getElementById("frase-celebre").textContent = aleatoria;



