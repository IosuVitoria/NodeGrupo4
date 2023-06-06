// home page
const containerMarketsSuppliers$$ = document.body.querySelector("#containerMarketAllSuppliers");
const containerAllMarkets = document.body.querySelector("#AllMarkets");
const containerAllSuppliers = document.body.querySelector("#AllSuppliers");
const nameMarketH2$$ = document.querySelector("#nameMarket");
let suppliersJson = {};

// market dependent page
const containerProductsSuppliers$$ = document.body.querySelector("#containerProductsSuppliers");
const containerProducts = document.body.querySelector("#products");
const containerSuppliers = document.body.querySelector("#suppliers");
containerProductsSuppliers$$.style.display = "none";

const buttonAddProduct$$ = document.body.querySelector("#buttonAddProduct");
const buttonAddSupplier$$ = document.body.querySelector("#buttonAddSupplier");

const modal$$ = document.querySelector(".b-modal-hidden");
const overlay$$ = document.querySelector(".b-overlay-hidden");
const token = localStorage.getItem('token');


const init = async () => {
    console.log("init home");
    console.log(token);

    // get all products
    const resProducts = await fetch("http://localhost:5000/products",
        {
        // Realizar una solicitud GET a la ruta de inicio de sesión. 
        // Esta debe cuadrar con el tipo de solicitud preprogramada en las rutas.
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token 
            }
            // Establecer el encabezado de tipo de contenido como JSON. 
            // Revisado en: https://developer.mozilla.org/es/docs/Web/HTTP/Headers.
        }
        );
    const resProductsJson = await resProducts.json();
    //console.log("resProductsJson -----------", resProductsJson);

    
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
        // console.log(marketsJson);
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
    
    if (resSuppliers.ok) {
        suppliersJson = await resSuppliers.json();
        //console.log(suppliersJson);
        for(supplier of suppliersJson) {
            printSuppliers(supplier, true);
        }
    } else {
        console.log("error GET suppliers");
    }

};

const printProducts = (product) => {
    const divItems$$ = document.createElement("div");
    divItems$$.innerHTML = `<div class="container container--smaller">
                                <img src=${product.image} alt="" class="card__image-products">
                                <h2 class="">${product.name}</h2>
                                <h4 class="">${product.price}€</h4>
                            </div>`;
    //console.log(divItems);
    //console.log(containerItems);
    containerProducts.appendChild(divItems$$);
}

const printMarkets = (marketsJson, resProductsJson) => {
    for (const market of marketsJson) {
        const divMarket$$ = document.createElement("div");
        divMarket$$.innerHTML = `<div class="container container--smaller">
                                <img src=${market.image} alt="" class="card__image">
                                <h2 class="">${market.name}</h2>
                                <h4 class="">${market.location}</h4>
                            </div>`;
        //console.log(divMarket$$);
        //console.log(containerItems);
        divMarket$$.setAttribute('marketID',market._id);
        containerAllMarkets.appendChild(divMarket$$);
        
        divMarket$$.addEventListener("click", async () => {
            handlerShowMarketProductAndSuppliers( resProductsJson, market);
        })
    }            
}

const printSuppliers = (supplierJson, all) => {
    console.log(supplierJson);
    const divItems = document.createElement("div");
    divItems.innerHTML = `<div class="container container--smaller">
                                <img src=${supplierJson.image} alt="" class="card__image">
                                <h2 class="">${supplierJson.name}</h2>
                                <h4 class="">${supplierJson.benefit}% Profit Margin
                                </h4>
                            </div>`;
    //console.log(divItems);
    //console.log(containerItems);
    if(all) {
        containerAllSuppliers.appendChild(divItems);
    } else {
        containerSuppliers.appendChild(divItems); 
    }         
}

const handlerShowMarketProductAndSuppliers = async (resProductsJson, market) => {
    containerProductsSuppliers$$.style.display = "block";
    nameMarketH2$$.textContent = market.name;
    
    try {
        const resMarket = await fetch('http://localhost:5000/markets/id/' + market._id,
            {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            });

        const resMarketJson = await resMarket.json();
        //window.open("http://127.0.0.1:5500/public/market.html");
        //console.log(products);
        containerMarketsSuppliers$$.style.display = "none";
        for (const product of resMarketJson.products) {
            try {
                const resProduct = await fetch('http://localhost:5000/products/id/' + product,
                    {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + token 
                    },
                    });
                const resProductJson = await resProduct.json();
                console.log(resProductJson);
                //console.log(resProductJson);
                //window.open("http://127.0.0.1:5500/public/market.html");
                printProducts(resProductJson);  
            }
            catch(error2) {
                console.error(error2); 
            }   
        }
        for (const supplier of resMarketJson.suppliers) {
            
            try {
                const resSupplier = await fetch('http://localhost:5000/suppliers/id/' + supplier);
                const resSupplierJson = await resSupplier.json();
                //console.log(resSupplierJson);
                //window.open("http://127.0.0.1:5500/public/market.html");
                printSuppliers(resSupplierJson, false);  
            }
            catch(error2) {
                console.error(error2); 
            }   
        }
        //console.log(buttonAddProduct$$);
        buttonAddProduct$$.addEventListener("click", () => {
            handlerButtonProduct(resProductsJson, market._id)
        })
        buttonAddSupplier$$.addEventListener("click", () => {
            handlerButtonSupplier(suppliersJson, market._id)
        })
    } catch(error) {
        console.error(error); 
    } 
  // Verificar si el botón de retroceso ya existe
  if (!document.querySelector("#backButton")) {
    // Crear un botón de retroceso
    const backButton$$ = document.createElement("button");
    backButton$$.textContent = "Back to Markets";
    backButton$$.classList.add("buttonBack");
    backButton$$.id = "backButton";
  
    // Agregar un event listener al botón de retroceso
    backButton$$.addEventListener("click", () => {
      // Ocultar el contenedor de productos y proveedores
      containerProductsSuppliers$$.style.display = "none";
      containerProducts.innerHTML = '';
      containerSuppliers.innerHTML = '';
      // Mostrar el contenedor de mercados y proveedores
      containerMarketsSuppliers$$.style.display = "block";

    });

    // Adjuntar el botón de retroceso al contenedor
    containerProductsSuppliers$$.appendChild(backButton$$);
  }             
}

const handlerButtonProduct = (resProductsJson, marketId) => {
    modal$$.innerHTML = "";
    modal$$.style.display = "flex";
    overlay$$.style.display = "flex";


    titleModal$$ = document.createElement("h2");
    titleModal$$.textContent = "Add Products to Market"
    modal$$.appendChild(titleModal$$);

    //modal$$.innerHTML = `<h3 class="b-gallery__label">Weight</h3>`
    for (const prodct of resProductsJson) {
        itemListProduct$$ = document.createElement("h5");
        //console.log(prodct.name);
        itemListProduct$$.className = "itemList";
        itemListProduct$$.setAttribute('productID',prodct._id);

        itemListProduct$$.textContent = prodct.name;
        modal$$.appendChild(itemListProduct$$);
        
        itemListProduct$$.addEventListener("click", () => {
            handlerAddProduct(prodct._id, marketId);
            
        })

    }

}

const handlerButtonSupplier = (resSupplierJson, marketId) => {
    modal$$.innerHTML = "";
    modal$$.style.display = "flex";
    overlay$$.style.display = "flex";


    titleModal$$ = document.createElement("h2");
    titleModal$$.textContent = "Add Suppliers to Market"
    modal$$.appendChild(titleModal$$);

    for (const suppl of resSupplierJson) {
        itemListProduct$$ = document.createElement("h5");
        console.log(suppl.name);
        itemListProduct$$.className = "itemList";
        itemListProduct$$.setAttribute('supplierID',suppl._id);

        itemListProduct$$.textContent = suppl.name;
        modal$$.appendChild(itemListProduct$$);
        
        itemListProduct$$.addEventListener("click", () => {
            handlerAddSupplier(suppl._id, marketId);  
        })
    }
}

const handlerAddSupplier = async (suppplId, marketId) => {
    event.target.style.color = "#53d847";
    console.log(marketId);
    const resSupplier = await fetch('http://localhost:5000/markets/idSupplier/' + suppplId,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: marketId })
        }
        );
        console.log(resSupplier);
    const resSupplierJson2 = await resSupplier.json();
    
    if(resSupplier.ok) {
        // Print new product in div
        const resSupplierAdded = await fetch('http://localhost:5000/suppliers/id/' + suppplId,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
        );
        const resSupplierAddedJson = await resSupplierAdded.json();

        // Print new product selected in div
        printSuppliers(resSupplierAddedJson, false);
    }

}


const handlerAddProduct = async (prodctId, marketId) => {
    event.target.style.color = "#53d847";
    
    const resProduct = await fetch('http://localhost:5000/markets/id/' + prodctId,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: marketId })
        }
        );
    
    if(resProduct.ok) {

        try {
            // GET new product from db
            const resProductAdded = await fetch('http://localhost:5000/products/id/' + prodctId,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
            }
            );
            const resProductAddedJson = await resProductAdded.json();
            console.log("resProductAddedJson-----", resProductAddedJson);

            // Print new product selected in div
            printProducts(resProductAddedJson);            
        } catch (error) {
            console.log(error);
        }

    }

}

// hide modal and overlay
window.onclick = function(event) {
    if (event.target == overlay$$) {
        overlay$$.style.display = "none";
        modal$$.style.display = "none";
    }
  }


init();


