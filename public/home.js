
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
        const divItems = document.createElement("div");
        divItems.innerHTML = `<div class="container">
                                <img src=${'../assets/Lidl_sede.jpg'} alt="" class="card__image">
                                <h2 class="">${market.name}</h2>
                                <h3 class="">${market.location}</h3>
                            </div>`;
        console.log(divItems);
        console.log(containerItems);
        containerItems.appendChild(divItems);           
    }            
}

const printSuppliers = (suppliersJson) => {
    const containerItems = document.querySelector("#suppliers");
    for (const supplier of suppliersJson) {
        const divItems = document.createElement("div");
        divItems.innerHTML = `<div class="container">
                                <img src=${'../assets/Lidl_sede.jpg'} alt="" class="card__image">
                                <h2 class="">${supplier.name}</h2>
                                <h3 class="">${supplier.location}</h3>
                            </div>`;
        console.log(divItems);
        console.log(containerItems);
        containerItems.appendChild(divItems);           
    }            
}

init();