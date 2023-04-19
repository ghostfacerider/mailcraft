var express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

var router = express.Router();
var User = require("../../models/user");

// Configure the 'local' strategy for use by Passport.
passport.use(
    "local",
    new LocalStrategy(
        {
            usernameField: "email", // Use email instead of username
            passwordField: "password", // Set the password field name
        },
        async function (email, password, done) {
            // Verify the username/email and password
            try {
                const user = await User.findOne({ email: email });
                bcrypt.compare(
                    password,
                    user.password,
                    function (err, isMatch) {
                        if (err) {
                            return done(err);
                        }

                        if (!isMatch) {
                            return done(null, false, {
                                message: "Invalid email or password",
                            });
                        }

                        return done(null, user);
                    }
                );
            } catch (error) {
                return done(null, false, {
                    message: "Invalid email or password",
                });
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

router.post("/login", passport.authenticate("local"), function (req, res) {
    res.send(req.user);
});

router.post("/register", async function (req, res) {
    const { firstname, lastname, email, password } = req.body;
    bcrypt.hash(password, 10, async function (err, hash) {
        const newUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash,
        });

        try {
            await newUser.save();
            return res.send(newUser);
        } catch (e) {
            console.log(e);

            return res.status(400).send("Unable to save user.");
        }
    });
});

router.get("/user", function (req, res) {
    if (req.isAuthenticated()) {
        res.send(req.user);
    } else {
        res.status(401).send("Unauthorized");
    }
});

router.get("/logout", function (req, res) {
    req.logout();
    res.send("Logged out");
});

module.exports = router;
