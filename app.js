import express from 'express';
import cors from "cors";
import session from "express-session";
import userController from "./controllers/users/user-controller.js";
import mongoose from "mongoose";

const app = express()
const CONNECTION_STRING = 'mongodb+srv://maurya:maurya2609@cluster0.tfc9wmb.mongodb.net/SpotifyPartyMixer?retryWrites=true&w=majority';

app.use(
    session({
      secret: "any string",
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: "none",
        secure: true
      }
    })
   );
  
  app.use(express.json());
  
  mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

userController(app);

app.listen(process.env.PORT || 4000);