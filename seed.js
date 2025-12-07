const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const dbPath = path.join(__dirname,'database.db')
let db = null
async function seed() {
    db = await open({
        filename: dbPath ,
        driver: sqlite3.Database
    })

    console.log("Connected to Sqlite DB")

const products = [
    {
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      short_desc: "Noise-cancelling headphones",
      long_desc: "Comfortable over-ear Bluetooth headphones with powerful bass.",
      price: 1999.00,
      image_url: "https://justhavit.com.ng/storage/82/01JC9H6TSB24VEKVX9Q4V9QJJQ.webp",
    },
    {
      name: "Cotton T-Shirt",
      category: "Fashion",
      short_desc: "Soft cotton t-shirt",
      long_desc: "Unisex casual cotton t-shirt available in multiple colors.",
      price: 499.00,
      image_url: "https://i5.walmartimages.com/asr/a36cfdac-cfe9-4702-8f23-c6c13d8983f6.f7bd9964f005a8b9639ced2025420d51.jpeg",
    },
    {
      name: "Graphic Design Book",
      category: "Books",
      short_desc: "Design principles",
      long_desc: "A complete beginner guide to visual design principles.",
      price: 799.00,
      image_url: "https://amberbluemedia.com/wp-content/uploads/2023/09/10-1536x1099.png",
    },
    {
      name: "Steel Water Bottle",
      category: "Home & Kitchen",
      short_desc: "Insulated bottle",
      long_desc: "Food-grade stainless steel bottle keeps water cool for 12 hours.",
      price: 299.00,
      image_url: "https://m.media-amazon.com/images/I/517NxAIGK9L.jpg",
    },
    {
      name: "Running Shoes",
      category: "Fashion",
      short_desc: "Lightweight shoes",
      long_desc: "Breathable lightweight running shoes for daily workouts.",
      price: 1499.00,
      image_url: "https://cdn.sweatband.com/asics_gel-pulse_7_mens_running_shoes_ss16_asics_gel-pulse_7_mens_running_shoesa_2000x2000.jpg",
    },
    {
      name: "LED Table Lamp",
      category: "Electronics",
      short_desc: "Touch lamp",
      long_desc: "Adjustable LED study lamp with touch controls and night mode.",
      price: 899.00,
      image_url: "https://m.media-amazon.com/images/I/61QPRxJk3dL._AC_SL1500_.jpg",
    },
    {
      name: "Yoga Mat",
      category: "Sports",
      short_desc: "Anti-slip yoga mat",
      long_desc: "Eco-friendly yoga mat with non-slip surface for stability.",
      price: 699.00,
      image_url: "https://www.health.com/thmb/yLgAbSF6Cy_c-bDxnD52OGFbAek=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/amazon-balancefrom-all-purpose-exercise-yoga-mat-7c5dfaa6472a4d549f506aab3293335e.jpg",
    },
    {
      name: "Notebook Set",
      category: "Stationery",
      short_desc: "Pack of 3 notebooks",
      long_desc: "Durable and smooth-writing notebooks perfect for students.",
      price: 249.00,
      image_url: "https://st.depositphotos.com/1875497/3781/i/450/depositphotos_37810929-stock-photo-books-on-white.jpg",
    },
  ];

  const insertQuery = `INSERT INTO products  (name, category, short_desc, long_desc, price, image_url)
    VALUES (?, ?, ?, ?, ?, ?)`;

    for (const p of products) {
    await db.run(insertQuery, [
      p.name, p.category, p.short_desc, p.long_desc, p.price, p.image_url
    ]);
  }

  console.log("🌱 Products seeded successfully!");
  await db.close();
}

seed().catch((err) => console.error(err));
