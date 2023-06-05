const containerMarkets = document.body.querySelector("#markets");
const containerSuppliers = document.body.querySelector("#suppliers");
const containerProducts = document.body.querySelector("#products");
const buttonAddProduct = document.body.querySelector("#buttonAddProduct");

console.log(containerMarkets);

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

const printProducts = (product) => {
    const divItems$$ = document.createElement("div");
    divItems$$.innerHTML = `<div class="container">
                                <img src=${product.image} alt="" class="card__image">
                                <h2 class="">${product.name}</h2>
                                <h3 class="">${product.price}</h3>
                            </div>`;
    //console.log(divItems);
    //console.log(containerItems);
    containerProducts.appendChild(divItems$$);

}

const printMarkets = (marketsJson) => {
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
        containerMarkets.appendChild(divMarket$$); 
        
        divMarket$$.addEventListener("click", async() => {
            try {
                const resMarket = await fetch('http://localhost:5000/markets/id/' + divMarket$$.getAttribute('marketID'));
                const resMarketJson = await resMarket.json();
                //window.open("http://127.0.0.1:5500/public/market.html");
                console.log(products);
                containerMarkets.style.display = "none";
                containerSuppliers.style.display = "none";
                for (const product of resMarketJson.products) {
                    try {
                        const resProduct = await fetch('http://localhost:5000/products/id/' + product);
                        const resProductJson = await resProduct.json();
                        console.log(resProductJson);
                        //window.open("http://127.0.0.1:5500/public/market.html");
                        printProducts(resProductJson);  
                    }
                    catch(error2) {
                        console.error(error2); 
                    }   
                }

            }
            catch(error) {
                console.error(error); 
            }
        })
    }            
}

const printSuppliers = (suppliersJson) => {
    for (const supplier of suppliersJson) {
        const divItems = document.createElement("div");
        divItems.innerHTML = `<div class="container">
                                <img src=${'../assets/Lidl_sede.jpg'} alt="" class="card__image">
                                <h2 class="">${supplier.name}</h2>
                                <h3 class="">${supplier.benefit}</h3>
                            </div>`;
        //console.log(divItems);
        //console.log(containerItems);
        containerSuppliers.appendChild(divItems);           
    }            
}

init();


