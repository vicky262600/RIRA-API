const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
// const multer = require("multer");
// const { memoryStorage } = require("multer");
const cors = require("cors");


dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
    ).then(()=>console.log("db connection successful"))
    .catch((err)=>{console.log(err);
});

app.use(cors({
    origin: ["https://rira-front-end.vercel.app"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// const storage = memoryStorage();

// const upload = multer({storage});
// app.post("api/upload", upload.single("file"), (req, res)=>{
//     try{
//         return res.status(200).json("file uploaded successfully.");
//         console.log(file);
//     }catch(err){
//         console.log(err);
//     }
// })

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(5000, () =>{
    console.log("backend server is ready")
})