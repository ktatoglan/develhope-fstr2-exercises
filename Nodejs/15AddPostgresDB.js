const express = require('express');
const pgp = require('pg-promise')();

const app = express();
const PORT = process.env.PORT || 3000;

const db = pgp({
  connectionString: 'postgres://root:123@localhost:5432/exercise'
});
app.use(express.json());

app.get('/planets', async (req, res, next) => {
  try {
    const planets = await db.any('SELECT * FROM planets');
    res.json(planets);
  } catch (error) {
    next(error);
  }
});

app.get('/planets/:id', async (req, res, next) => {
  try {
    const planet = await db.one('SELECT * FROM planets WHERE id=$1', req.params.id);
    res.json(planet);
  } catch (error) {
    next(error);
  }
});

app.post('/planets', async (req, res, next) => {
  try {
    const { name } = req.body;
    await db.none('INSERT INTO planets (name) VALUES ($1)', name);
    res.status(201).send('Planet created successfully');
  } catch (error) {
    next(error);
  }
});

app.put('/planets/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await db.none('UPDATE planets SET name=$2 WHERE id=$1', [id, name]);
    res.status(200).send('Planet updated successfully');
  } catch (error) {
    next(error);
  }
});

app.delete('/planets/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.none('DELETE FROM planets WHERE id=$1', id);
    res.status(200).send('Planet deleted successfully');
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
