
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
        printMarkets(marketsJson)
    } else {
        console.log("error GET markets");
    }

    const resSuppliers = await fetch("http://localhost:5000/suppliers",
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
    
    let suppliersJson = {};
    if (resSuppliers.ok) {
        suppliersJson = await resSuppliers.json();
        console.log(suppliersJson);
        printSuppliers(suppliersJson)
    } else {
        console.log("error GET suppliers");
    }

};

const printMarkets = (marketsJson) => {
    const containerItems = document.querySelector("#markets");
    for (const market of marketsJson) {
        const divMarket$$ = document.createElement("div");
        divMarket$$.innerHTML = `<div class="container">
                                <img src=${'../assets/Lidl_sede.jpg'} alt="" class="card__image">
                                <h2 class="">${market.name}</h2>
                                <h3 class="">${market.location}</h3>
                            </div>`;
        //console.log(divMarket$$);
        //console.log(containerItems);
        divMarket$$.setAttribute('marketID',market._id);
        containerItems.appendChild(divMarket$$); 
        
        divMarket$$.addEventListener("click", async() => {
            try {
                const res = await fetch('http://localhost:5000/markets/id/' + divMarket$$.getAttribute('marketID'));
                const res2 = await res.json();
                //window.open("http://127.0.0.1:5500/public/market.html");
                console.log(res2);
            }
            catch(error2) {
                console.error(error2); 
            }
        })
    }            
}

const printSuppliers = (suppliersJson) => {
    const containerItems = document.querySelector("#suppliers");
    for (const supplier of suppliersJson) {
        const divItems = document.createElement("div");
        divItems.innerHTML = `<div class="container">
                                <img src=${'../assets/Lidl_sede.jpg'} alt="" class="card__image">
                                <h2 class="">${supplier.name}</h2>
                                <h3 class="">${supplier.benefit}</h3>
                            </div>`;
        //console.log(divItems);
        //console.log(containerItems);
        containerItems.appendChild(divItems);           
    }            
}

init();


