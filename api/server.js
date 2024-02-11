const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoute');
const caetegoryRoutes = require('./routes/categoryRoute');
const productRoutes = require('./routes/productRoute');
const cors = require('cors');

//configure env
dotenv.config();   //in this case it is root so no problem

// dotenv.config({ path: '*' });  //u need to specify path if .env is not present in root folder


//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", caetegoryRoutes);
app.use("/api/v1/product", productRoutes);


//rest api
app.get('/', (req, res) => {
    res.send(
        // {
        //     message: 'Welcome to ecommerce app'
        // }
        "<h1 style='color: blue'>Welcome to Ecommerce Web App</h1>"
    )
})

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`);
})