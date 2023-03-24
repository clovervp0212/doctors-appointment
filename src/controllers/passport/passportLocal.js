import passport from "passport";
import passportLocal from "passport-local";
import loginService from "../../services/loginService";


let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            await loginService.findUserByEmail(email)
                .then(async (user) => {
                    if (!user) return done(null, false, req.flash("errors", "User not found!"));
                    let message = await loginService.comparePassword(password, user);
                    if (message === true) {
                        return done(null, user, null);
                    }
                    else {
                        return done(null, false, req.flash("errors", message));
                    }

                }).catch(err => {
                    console.log(err);
                    return done(null, false, err);
                });

        } catch (error) {
            console.log(error);
            return done(null, false, error);
        }
    }

    ))
}
passport.serializeUser((user, done) => {
    return done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    await loginService.findUserById(id).then(user => {
        return done(null, user);
    }).catch(error => {
        console.log(error);
        return done(error, null);
    })
});
module.exports = initPassportLocal;