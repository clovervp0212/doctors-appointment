require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import cookieParser from "cookie-parser";
import passport from "passport";
import configSession from "./config/session";



let app = express();

app.use(cookieParser('secret'));



app.use(connectFlash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configSession(app);

//config view Engine
configViewEngine(app);

app.use(passport.initialize());
app.use(passport.session());



//init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
   console.log(`App is running at the port ${port}`);
});