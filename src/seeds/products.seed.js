const mongoose = require("mongoose");

const Product = require('../api/models/products.model');

const arrayProduct = [
    {
      "name": 'Milk',
      "price": 0.95,
      "type": "Dairy",
      "nutrients": ['Vitamin A', 'Lactose'],
      "SKU": '000123',
    },
    {
      "name": 'Beef',
      "price": 6,
      "type": "Meat",
      "nutrients": ['Vitamin B12', 'Protein'],
      "SKU": '000124',
    },
    {
      "name": 'Chocolate',
      "price": 1.5,
      "type": "Dairy",
      "nutrients": ['Vitamin B12', 'Manganese'],
      "SKU": '000126',
    },
    {
      "name": 'Tomates',
      "price": 2,
      "type": "Vegetables",
      "nutrients": ['Vitamin C', 'Zinc'],
      "SKU": '000128',
    },
    {
      "name": 'Coffee',
      "price": 2.5,
      "type": "Drink",
      "nutrients": ['Vitamin D', 'Niacin'],
      "SKU": '000129',
    },
      {
        "name": "Apple",
        "price": 0.99,
        "SKU": "APL001",
        "nutrients": ["Vitamin C", "Dietary Fiber"],
        "type": "Fruit",
        "image": "apple_image.jpg"
      },
      {
        "name": "Banana",
        "price": 0.79,
        "SKU": "BNN001",
        "nutrients": ["Potassium", "Vitamin B6"],
        "type": "Fruit",
        "image": "banana_image.jpg"
      },
      {
        "name": "Carrot",
        "price": 0.49,
        "SKU": "CRT001",
        "nutrients": ["Vitamin A", "Fiber"],
        "type": "Vegetable",
        "image": "carrot_image.jpg"
      },
      {
        "name": "Chicken Breast",
        "price": 3.99,
        "SKU": "CHB001",
        "nutrients": ["Protein", "Vitamin B12"],
        "type": "Meat",
        "image": "chicken_breast_image.jpg"
      },
      {
        "name": "Salmon",
        "price": 7.99,
        "SKU": "SLM001",
        "nutrients": ["Omega-3 Fatty Acids", "Protein"],
        "type": "Fish",
        "image": "salmon_image.jpg"
      },
      {
        "name": "Broccoli",
        "price": 1.49,
        "SKU": "BRC001",
        "nutrients": ["Vitamin C", "Vitamin K"],
        "type": "Vegetable",
        "image": "broccoli_image.jpg"
      },
      {
        "name": "Yogurt",
        "price": 2.49,
        "SKU": "YGT001",
        "nutrients": ["Calcium", "Protein"],
        "type": "Dairy",
        "image": "yogurt_image.jpg"
      },
      {
        "name": "Spinach",
        "price": 1.29,
        "SKU": "SPN001",
        "nutrients": ["Iron", "Vitamin K"],
        "type": "Vegetable",
        "image": "spinach_image.jpg"
      },
      {
        "name": "Lettuce",
        "price": 0.79,
        "SKU": "LTT001",
        "nutrients": ["Vitamin K", "Fiber"],
        "type": "Vegetable",
        "image": "lettuce_image.jpg"
      },
      {
        "name": "Orange",
        "price": 0.89,
        "SKU": "ORG001",
        "nutrients": ["Vitamin C", "Fiber"],
        "type": "Fruit",
        "image": "orange_image.jpg"
      },
      {
        "name": "Almonds",
        "price": 4.99,
        "SKU": "ALM001",
        "nutrients": ["Healthy Fats", "Fiber"],
        "type": "Nuts",
        "image": "almonds_image.jpg"
      },
      {
        "name": "Tomato",
        "price": 0.69,
        "SKU": "TMT001",
        "nutrients": ["Vitamin C", "Lycopene"],
        "type": "Vegetable",
        "image": "tomato_image.jpg"
      },
      {
        "name": "Peanut Butter",
        "price": 3.49,
        "SKU": "PNB001",
        "nutrients": ["Protein", "Healthy Fats"],
        "type": "Spreads",
        "image": "peanut_butter_image.jpg"
      },
      {
        "name": "Cucumber",
        "price": 0.99,
        "SKU": "CDC001",
        "nutrients": ["Hydration", "Vitamin K"],
        "type": "Vegetable",
        "image": "cucumber_image.jpg"
      },
      {
        "name": "Strawberries",
        "price": 2.99,
        "SKU": "STB001",
        "nutrients": ["Vitamin C", "Fiber"],
        "type": "Fruit",
        "image": "strawberries_image.jpg"
      },
      {
        "name": "Cheese",
        "price": 3.99,
        "SKU": "CHS001",
        "nutrients": ["Calcium", "Protein"],
        "type": "Dairy",
        "image": "cheese_image.jpg"
      },
      {
        "name": "Pork Chop",
        "price": 6.99,
        "SKU": "PRK001",
        "nutrients": ["Protein", "Vitamin B12"],
        "type": "Meat",
        "image": "pork_chop_image.jpg"
      },
      {
        "name": "Watermelon",
        "price": 4.49,
        "SKU": "WML001",
        "nutrients": ["Hydration", "Vitamin C"],
        "type": "Fruit",
        "image": "watermelon_image.jpg"
      },
      {
        "name": "Potato",
        "price": 0.49,
        "SKU": "PTT001",
        "nutrients": ["Potassium", "Vitamin C"],
        "type": "Vegetable",
        "image": "potato_image.jpg"
      },
      {
        "name": "Rice",
        "price": 2.49,
        "SKU": "RCE001",
        "nutrients": ["Carbohydrates", "Fiber"],
        "type": "Grains",
        "image": "rice_image.jpg"
      },
      {
        "name": "Honey",
        "price": 5.99,
        "SKU": "HNY001",
        "nutrients": ["Antioxidants", "Vitamin C"],
        "type": "Sweeteners",
        "image": "honey_image.jpg"
      },
      {
        "name": "Blueberries",
        "price": 3.99,
        "SKU": "BBY001",
        "nutrients": ["Antioxidants", "Fiber"],
        "type": "Fruit",
        "image": "blueberries_image.jpg"
      },
      {
        "name": "Avocado",
        "price": 1.99,
        "SKU": "AVC001",
        "nutrients": ["Healthy Fats", "Fiber"],
        "type": "Fruit",
        "image": "avocado_image.jpg"
      },
      {
        "name": "Oatmeal",
        "price": 2.99,
        "SKU": "OTM001",
        "nutrients": ["Fiber", "Protein"],
        "type": "Grains",
        "image": "oatmeal_image.jpg"
      },
      {
        "name": "Tofu",
        "price": 2.99,
        "SKU": "TFU001",
        "nutrients": ["Protein", "Calcium"],
        "type": "Plant-based",
        "image": "tofu_image.jpg"
      },
      {
        "name": "Quinoa",
        "price": 3.99,
        "SKU": "QNA001",
        "nutrients": ["Protein", "Fiber"],
        "type": "Grains",
        "image": "quinoa_image.jpg"
      },
      {
        "name": "Pineapple",
        "price": 1.99,
        "SKU": "PNP001",
        "nutrients": ["Vitamin C", "Manganese"],
        "type": "Fruit",
        "image": "pineapple_image.jpg"
      },
      {
        "name": "Grapes",
        "price": 2.99,
        "SKU": "GRP001",
        "nutrients": ["Antioxidants", "Vitamin C"],
        "type": "Fruit",
        "image": "grapes_image.jpg"
      },
      {
        "name": "Cabbage",
        "price": 0.79,
        "SKU": "CBG001",
        "nutrients": ["Vitamin C", "Fiber"],
        "type": "Vegetable",
        "image": "cabbage_image.jpg"
      }

  ];


mongoose.connect(process.env.DB_URL)
.then(async () => {
    const allProducts = await Product.find();
    if(allProducts.length > 0){
        await Product.collection.drop();
        //collection.drop() => Te vacía la colección entera.
        console.log("products deleted");
    }
})
.catch((error) => console.log("error deleting products", error))
.then(async () => {
    const ProductMap = arrayProduct.map((product) => new Product(product));
    await Product.insertMany(ProductMap);
    console.log("products inserted");
})
.catch((error) => console.log("error inserting products", error))
.finally(() => mongoose.disconnect());