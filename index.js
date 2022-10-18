import express from "express";
import {mongoose} from "mongoose";
import cors from "cors";
const app = express();
import dotenv from "dotenv";

import { UsersRouter } from "./routes/User.js";

dotenv.config();

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

const MONGO_URL = process.env.MONGO_URL;


mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
  console.log("DB connected");
}).catch(error=>console.log(error));



app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use(UsersRouter);

app.listen(PORT, () => console.log(`App listening on  ${PORT}`));
