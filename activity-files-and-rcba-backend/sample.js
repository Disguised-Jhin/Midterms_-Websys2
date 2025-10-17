const express = require('express');
const cors = require('cors');
const passport=require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

const Users = [
  { id: 1, username: 'admin', password: 'admin' },
  { id: 2, username: 'user1', password: "user1" }
];

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  const user = Users.find(u => u.username == username);
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  if (user.password !== password) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = Users.find(u => u.id === id);
  done(null, user);
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    // Specify the directory where files will be saved
    cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
    // Create a unique filename (e.g., timestamp + original name)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
    }
    });
    
    const uploadToDisk = multer({ storage: storage });

app.post('upload/', uploadToDisk.single('images'), (req, res) => {
    console.log(req.file);
    res.send({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    size: req.file.size
    });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.status().json({ message: 'Logged in successfully', user: req.user });
});

app.listen(3000, () => {
  console.log(`Server has started at http://localhost:3000`);
});

