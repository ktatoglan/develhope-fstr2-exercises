const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const pgp = require('pg-promise')();

const app = express();
const PORT = process.env.PORT || 3000;

const db = pgp({
  connectionString: 'postgres://root:123@localhost:5432/exercise'
});

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  );
`;

db.none(createUsersTable)
  .then(() => console.log('Users table created'))
  .catch(error => console.error('Error creating users table:', error));

app.use(express.json());


app.post('/users/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await db.oneOrNone('SELECT * FROM users WHERE username = $1', username);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();

    await db.none('INSERT INTO users(id, username, password) VALUES($1, $2, $3)', [userId, username, hashedPassword]);

    res.json({ msg: 'Signup successful. Now you can log in.' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY);

    res.json({ token, id: user.id, username: user.username });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
