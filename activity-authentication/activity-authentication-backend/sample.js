const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const app = express();

app.use(cors({
  origin: 'http://localhost:4800',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

app.session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false,
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let user = null;
  let i = 0;
  for (i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      user = users[i];
      break;
    }
  }
  if(user !== null  ) {
    done(null, user);
  } else {
    done(('User not found'));
  } 
});

passport.use(new LocalStrategy((username, password, done) => {
  let user = null;
  let i = 0;

  for (i = 0; i < users.length; i++) {
    if(users[i].username == username){
      user = users[i];
      break;
    }
  }
  if (user !== null) {
    if (user.password == password) {
      return done(null, user);
    } else {
        done(null, user);
    }
  } else {
    return done(null, user);
  }
}));

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send("User authenticated.");
});
  
app.listen(3000, () => {
  console.log(`Server has started at http://localhost:3000`);
});