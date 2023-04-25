import { Router } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import logger from '../config/index.js';

import User from '../models/user.js';

const router = Router();

// Configure the 'local' strategy for use by Passport.
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email', // Use email instead of username
      passwordField: 'password', // Set the password field name
    },
    (async (email, password, done) => {
      // Verify the username/email and password
      try {
        const user = await User.findOne({ email });
        return bcrypt.compare(
          password,
          user.password,
          (err, isMatch) => {
            if (err) {
              return done(err);
            }

            if (!isMatch) {
              return done(null, false, {
                message: 'Invalid email or password',
              });
            }

            return done(null, user);
          },
        );
      } catch (error) {
        return done(null, false, {
          message: 'Invalid email or password',
        });
      }
    }),
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

router.post('/register', async (req, res) => {
  const {
    firstname, lastname, email, password,
  } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hash,
    });
    try {
      await newUser.save();
      return res.send(newUser);
    } catch (e) {
      logger.error(e);
      return res.status(400).send('Unable to save user.');
    }
  });
});

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.status(401).send('Unauthorized');
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send('Logged out');
});

export default router;
