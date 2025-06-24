document.addEventListener("DOMContentLoaded", function() {
            const contenedor = document.getElementById("zona-obras");
            let favoritos = JSON.parse(localStorage.getItem("obrasMilitera")) || [];

            if (favoritos.length === 0) {
                contenedor.innerHTML = "<p>Aún no has agregado obras a tu colección.</p>";
                return;
            }

            favoritos.forEach(obra => {
                const tarjeta = document.createElement("div");
                tarjeta.className = "tarjeta";
                tarjeta.innerHTML = `
                    <img src="${obra.imagen}" alt="${obra.titulo}">
                    <div class="titulo-tarjeta">
                        <h3>${obra.titulo}</h3>
                    </div>
                    <p>${obra.autor}</p>
                    <button class="favorito" title="Quitar de MiLitEra">
                        <span class="material-icons" style="color: #546BB9">bookmark</span>
                    </button>
                `;
                contenedor.appendChild(tarjeta);
            });

            // Permite quitar obras
            contenedor.addEventListener("click", function(e) {
                if (e.target.closest(".favorito")) {
                    const card = e.target.closest(".tarjeta");
                    const titulo = card.querySelector(".titulo-tarjeta h3").innerText;
                    favoritos = favoritos.filter(obra => obra.titulo !== titulo);
                    localStorage.setItem("obrasMilitera", JSON.stringify(favoritos));
                    location.reload();
                }
            });
        });