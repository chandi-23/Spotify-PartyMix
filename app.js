import express from 'express';
import cors from "cors";
import session from "express-session";
import userController from "./controllers/users/user-controller.js";
import partyController from './controllers/users/party-controller.js';
import mongoose from "mongoose";

const app = express()
const CONNECTION_STRING = 'mongodb+srv://maurya:maurya2609@cluster0.tfc9wmb.mongodb.net/SpotifyPartyMixer?retryWrites=true&w=majority';

app.use(express.json());
app.set("trust proxy", 1);

app.use(
  session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
  })
 );
 
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PUT","DELETE"]
  })
 );
 app.use(function (req, res, next) {
  res.header(
      "Access-Control-Allow-Origin",
      "http://localhost:3000"
  );
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, POST, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});  
  mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

userController(app);
partyController(app);

app.listen(process.env.PORT || 4000);