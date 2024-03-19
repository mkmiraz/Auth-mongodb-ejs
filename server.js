import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import ejsLayouts from "express-ejs-layouts";
import mongoDBConnection from "./config/db.js";
import { localsMiddlewares } from "./middlewares/localsMiddlewares.js";
import userRouter from "./routes/userRoute.js";

// environment variable
dotenv.config();
const POST = process.env.PORT || 9000;

// Express init
const app = express();

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
  })
);

// local middlewares
app.use(localsMiddlewares);

// static folder
app.use(express.static("public"));

// ejs templade setup
app.set("view engine", "ejs");
app.set("layout", "layouts/app");
app.use(ejsLayouts);

// Route
app.use("/", userRouter);

// listen
app.listen(POST, () => {
  mongoDBConnection();
  console.log(`Server is running on port ${POST}`.bgBlue.black);
});
