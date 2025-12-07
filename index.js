const express = require('express')
const cors  = require('cors')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 3001

const dbPath = path.join(__dirname,"database.db")

let db = null
const initializeDBAndServer = async() => {
   try{
     db = await open({
        filename: dbPath,
        driver: sqlite3.Database
     })
       app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}/`);
    });
   }catch(err){
    console.log(`DB Error: ${err.message}`)
    process.exit(1)
   }
}

initializeDBAndServer()

//GET API 
app.get("/api/products", async (req, res) => {
  try {
    const search = req.query.search || "";
    const category = req.query.category || "";

    const sqlQuery = `
      SELECT * FROM products
      WHERE (category = ? OR ? = '')
      AND name LIKE '%' || ? || '%'
    `;

    const rows = await db.all(sqlQuery, [category, category, search]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.json({
      total: rows.length,
      products: rows
    });

  } catch (error) {
    console.error("SQL Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
});



// GET /api/products/:id
app.get("/api/products/:id",async(req,res)=>{
  const {id} = req.params
  try{
     const query = "SELECT * FROM products WHERE id = ?";
    const row = await db.get(query, [id]);

    if (!row) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(row);


  }catch(err){
   console.log(`Server Error: ${err}`)
   res.status(500).json({message: `Error: ${err}`})
  }
})

// POST /api/enquiries
app.post("/api/enquiries",async(req,res) => {
   const {product_id,name,email,phone,message} = req.body
   try{
     if(!product_id || !name || !email || !phone || !message){
      return res.status(400).json({message: "All feilds are required"})
     }
     const productQuery = `SELECT * FROM products WHERE id = ?`
     const product = await db.get(productQuery,[product_id])
     if(!product){
      return res.status(404).json({message: "Product Not Found"})
     }
     const insertQuery = `INSERT INTO enquiries(product_id,name,email,phone,message)
     VALUES(?,?,?,?,?)`

      await db.run(insertQuery, [
      product_id,
      name,
      email,
      phone,
      message,
    ]);

    // 4. Success response
    return res.json({ 
      success: true, 
      message: "Enquiry submitted successfully" 
    });
      
   }catch(err){
   console.log(`Server Error: ${err}`)
   res.status(500).json({message: `Error: ${err}`})
  }
})


//GET /api/enquiries
app.get("/api/enquiries",async(req,res) => {
    try{
      const enquiriesQuery = `SELECT * FROM enquiries`
      const row = await db.all(enquiriesQuery)
      if(!row){
         return res.status(400).json({message: "No Enquiries Found"})
      }
      return res.json({row})
    }catch(err){
        console.log(`Server Error: ${err}`)
   res.status(500).json({message: `Error: ${err}`})
    }
})

module.exports = app