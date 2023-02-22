const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes")
const fileRouter = require("./routes/fileRoutes")
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

app.use("/file", fileRouter);


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(5000, ()=>{
        console.log("server is up and connected to database");
    });
})
.catch((error)=>{
    console.log(error); 
})
