const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const users = [
  { id: 1, username: 'admin', password: 'adminpassword', role: 'admin' },
  { id: 2, username: 'user', password: 'password', role: 'user' },

];

app.use(cors({
  origin: 'http://localhost:4801',
  credentials: true
}));


app.use((req, res, next) => {
  if (req.path === '/api/upload' && req.method === 'POST') {
    return next(); 
  }
  express.json()(req, res, next);
});

app.use(session({
  secret: 'supersecretkey', 
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username);
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  if (user.password !== password) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
}));

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully', user: req.user });
});

app.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin role required' });
  }
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

app.get('/api/uploads', (req, res) => {
  const filename = req.query.filename;
  if (!filename) {
    return res.status(400).json({ message: 'Filename parameter is required' });
  }
  const filePath = path.join(__dirname, 'uploads', filename);
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: 'File not found' });
    }
  });
});

app.get('/api/uploads', (req, res) => {
  const filename = req.query.filename;
  if (!filename) {
    return res.status(400).json({ message: 'Filename parameter is required' });
  }
  const filePath = path.join(__dirname, 'uploads', filename);
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: 'File not found' });
    }
  });
});

app.listen(3000, () => {
  console.log(`Server has started at http://localhost:3000`);
});
