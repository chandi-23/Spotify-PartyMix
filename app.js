import express from "express"
import cors from "cors"
import session from "express-session";

const app = express()

app.use(
    session({
      secret: "any string",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: CONNECTION_STRING }),
    })
   );

app.use(express.json())
app.listen(process.env.PORT || 4000);