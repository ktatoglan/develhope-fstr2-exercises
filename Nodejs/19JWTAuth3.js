const express = require("express");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Strategy, ExtractJwt } = passportJWT;
const { v4: uuidv4 } = require("uuid");
const pgp = require("pg-promise")();

const app = express();
const PORT = process.env.PORT || 3000;

const db = pgp({
  connectionString: "postgres://root:123@localhost:5432/exercise",
});

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    token TEXT
  );
`;

db.none(createUsersTable)
  .then(() => console.log("Users table created"))
  .catch((error) => console.error("Error creating users table:", error));

app.use(express.json());

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "dsfasdjsghj3232",
};

passport.use(
  new Strategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await db.oneOrNone(
        "SELECT * FROM users WHERE id = $1",
        jwtPayload.id
      );

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

app.post("/users/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await db.oneOrNone(
      "SELECT * FROM users WHERE username = $1",
      username
    );
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();

    await db.none(
      "INSERT INTO users(id, username, password) VALUES($1, $2, $3)",
      [userId, username, hashedPassword]
    );

    res.json({ msg: "Signup successful. Now you can log in." });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/users/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE username = $1",
      username
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET_KEY
    );

    res.json({ token, id: user.id, username: user.username });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get(
  "/users/logout",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await db.none("UPDATE users SET token=NULL WHERE id=$1", req.user.id);
      res.json({ message: "User logged out successfully" });
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

const authorize = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

app.get("/protected", authorize, (req, res) => {
  res.send("You are authenticated");
});

app.post("/planets/:id/image", authorize, (req, res) => {
  res.send("File uploaded successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
