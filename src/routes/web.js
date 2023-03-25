import express from "express";
import homepageController from "../controllers/homepageController";
import auth from "../validation/authValidation";
import initPassportLocal from "../controllers/passport/passportLocal";
import passport from "passport";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
/*
init all web routes
 */
initPassportLocal();
let router = express.Router();

let initAllWebRoutes = (app) => {
    router.get("/", homepageController.getHomepage);
    router.get("/register", homepageController.getRegisterPage);
    router.get("/login", authController.checkLoggedOut, homepageController.getLoginPage);
    // router.get("/new-user", homepageController.getNewUserPage);
    router.get("/users", authController.checkLoggedIn, homepageController.getAdminPage);
    router.get("/all-users", authController.checkLoggedIn, homepageController.getAllUsersPage);
    router.get("/create-user", userController.getCreateUserPage);


    router.post("/register", auth.validateRegister, homepageController.handleRegister);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/users",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));


    //router.post("/create-new-user", homepageController.createNewUser);
    router.get("/log-out", authController.postLogOut);
    return app.use("/", router);
};

module.exports = initAllWebRoutes;
