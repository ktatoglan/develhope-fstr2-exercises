const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

const pgp = require('pg-promise')();
const db = pgp({
    connectionString: 'postgres://root:123@localhost:5432/exercise'
});

app.use(express.json());

app.post('/planets/:id/image', upload.single('image'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const imagePath = req.file.path;

    await db.none('UPDATE planets SET image=$2 WHERE id=$1', [id, imagePath]);
    res.status(200).send('Planet image uploaded successfully');
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
