const containerMarkets = document.body.querySelector("#markets");
const containerMarketsSuppliers$$ = document.body.querySelector(".containerMarketAllSuppliers");
const containerAllSuppliers = document.body.querySelector("#AllSuppliers");
const containerProducts = document.body.querySelector("#products");
const buttonAddProduct$$ = document.body.querySelector("#buttonAddProduct");
const modal$$ = document.querySelector(".b-modal-hidden");

console.log(containerMarkets);

const init = async () => {
    console.log("init home");

    // get all products
    const resProducts = await fetch("http://localhost:5000/products",
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
    const resProductsJson = await resProducts.json();
    console.log("resProductsJson -----------", resProductsJson);

    
    const res = await fetch("http://localhost:5000/markets",
        {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });

    let marketsJson = {};
    if (res.ok) {
        marketsJson = await res.json();
        console.log(marketsJson);
        printMarkets(marketsJson, resProductsJson)
    } else {
        console.log("error GET markets");
    }

    const resSuppliers = await fetch("http://localhost:5000/suppliers",
        {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
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
                                <img src=${product.image} alt="" class="card__image-products">
                                <h2 class="">${product.name}</h2>
                                <h3 class="">${product.price}€</h3>
                            </div>`;
    //console.log(divItems);
    //console.log(containerItems);
    containerProducts.appendChild(divItems$$);
}

const printMarkets = (marketsJson, resProductsJson) => {
    for (const market of marketsJson) {
        const divMarket$$ = document.createElement("div");
        divMarket$$.innerHTML = `<div class="container">
                                <img src=${market.image} alt="" class="card__image">
                                <h2 class="">${market.name}</h2>
                                <h3 class="">${market.location}</h3>
                            </div>`;
        //console.log(divMarket$$);
        //console.log(containerItems);
        divMarket$$.setAttribute('marketID',market._id);
        containerMarkets.appendChild(divMarket$$);
        
        divMarket$$.addEventListener("click", async() => {
            handlerShowMarketProductAndSuppliers(divMarket$$, resProductsJson, market._id);
        })
    }            
}

const printSuppliers = (suppliersJson) => {
    for (const supplier of suppliersJson) {
        const divItems = document.createElement("div");
        divItems.innerHTML = `<div class="container">
                                <img src=${supplier.image} alt="" class="card__image">
                                <h2 class="">${supplier.name}</h2>
                                <h3 class="">${supplier.benefit}% Profit Margin
                                </h3>
                            </div>`;
        //console.log(divItems);
        //console.log(containerItems);
        containerAllSuppliers.appendChild(divItems);           
    }            
}

const handlerShowMarketProductAndSuppliers = async (divMarket$$, resProductsJson, marketId) => {
    try {
        const resMarket = await fetch('http://localhost:5000/markets/id/' + marketId);
        const resMarketJson = await resMarket.json();
        //window.open("http://127.0.0.1:5500/public/market.html");
        console.log(products);
        containerMarketsSuppliers$$.style.display = "none";
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
        console.log(buttonAddProduct$$);
        buttonAddProduct$$.addEventListener("click", () => {
            handlerButtonProduct(resProductsJson, marketId)
        })

    }
    catch(error) {
        console.error(error); 
    }                
};

const handlerButtonProduct = (resProductsJson, marketId) => {
    modal$$.style.display = "flex";
    console.log("button pressed");
    console.log(resProductsJson);
    //modal$$.innerHTML = `<h3 class="b-gallery__label">Weight</h3>`
    for (const prodct of resProductsJson) {
        itemListProduct$$ = document.createElement("h5");
        console.log(prodct.name);
        itemListProduct$$.className = "itemList";
        itemListProduct$$.setAttribute('productID',prodct._id);

        itemListProduct$$.textContent = prodct.name;
        modal$$.appendChild(itemListProduct$$);
        
        itemListProduct$$.addEventListener("click", () => {
            handlerAddProduct(prodct._id, marketId);
            
        })

    }

}

const handlerAddProduct = async (prodctId, marketId, resProductJson) => {
    console.log(marketId);
    const resProduct = await fetch('http://localhost:5000/markets/id/' + prodctId,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: marketId })
        }
        );
        console.log(resProduct);
    const resProductJson2 = await resProduct.json();
    
    if(resProduct.ok) {
        // Print new product in div
        const resProductAdded = await fetch('http://localhost:5000/products/id/' + prodctId,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        );
        const resProductAddedJson = await resProductAdded.json();

        printProducts(resProductAddedJson);
    }

}



init();


