const express = require('express');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const { Strategy, ExtractJwt } = passportJWT;
const pgp = require('pg-promise')();
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

const db = pgp({
    connectionString: 'postgres://root:123@localhost:5432/exercise'
});

const createUsersTable = `
  DROP TABLE IF EXISTS users;
  CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    token TEXT
  );
`;

db.none(createUsersTable)
  .then(() => console.log('Users table created'))
  .catch(error => console.error('Error creating users table:', error));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
};

passport.use(new Strategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', jwtPayload.id);
    
    if (!user) {
      return done(null, false);
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

app.use(express.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  

  if (username === 'example' && password === 'password') {
    const user = { id: 1, username }; // Replace this with a query to fetch user details from the database
    
    const token = jwt.sign(user, SECRET_KEY);
    
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});


app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('You are authenticated');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
