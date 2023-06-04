
const init = async () => {
    console.log("init home");


    const res = await fetch("http://localhost:5000/markets",
        {
        // Realizar una solicitud POST a la ruta de inicio de sesión. 
        // Esta debe cuadrar con el tipo de solicitud preprogramada en las rutas.
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Establecer el encabezado de tipo de contenido como JSON. 
            // Revisado en: https://developer.mozilla.org/es/docs/Web/HTTP/Headers.
        },
        });

    let marketsJson = {};
    if (res.ok) {
        marketsJson = await res.json();
        console.log(marketsJson);

        const containerProducts = document.querySelector(".container-cards");

        for (const market of marketsJson) {
            const divMarket = document.createElement("div");
            divMarket.innerHTML = `<div class="container">
                                    <img src=${'../assets/Lidl_sede.jpg'} alt="" class="card__image">
                                    <h2 class="">${market.name}</h2>
                                    <h3 class="">${market.location}</h3>
                                </div>`;
            console.log(divMarket);
            console.log(containerProducts);
            containerProducts.appendChild(divMarket);           
        }

    } else {
        console.log("error markets GET");
    }

    console.log(document.querySelector("#b-container"));

};


init();