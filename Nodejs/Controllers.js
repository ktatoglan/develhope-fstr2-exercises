const Joi = require("joi");

let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

const planetSchema = Joi.object({
  name: Joi.string().required(),
});

const getAll = (req, res) => {
  res.json(planets);
};

const getOneById = (req, res) => {
  const planetId = parseInt(req.params.id);
  const planet = planets.find((p) => p.id === planetId);

  if (!planet) {
    res.status(404).json({ error: "Planet not found" });
  } else {
    res.json(planet);
  }
};

const create = (req, res) => {
  try {
    const { name } = req.body;
    const { error } = planetSchema.validate({ name });
    if (error) {
      throw new Error(error.details[0].message);
    }

    const newPlanet = {
      id: planets.length + 1,
      name,
    };

    planets = [...planets, newPlanet];
    res.status(201).json({ msg: "Planet created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateById = (req, res) => {
  try {
    const planetId = parseInt(req.params.id);
    const { name } = req.body;

    const updatedPlanets = planets.map((planet) => {
      if (planet.id === planetId) {
        return { ...planet, name };
      }
      return planet;
    });

    planets = updatedPlanets;
    res.json({ msg: "Planet updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteById = (req, res) => {
  try {
    const planetId = parseInt(req.params.id);
    planets = planets.filter((planet) => planet.id !== planetId);
    res.json({ msg: "Planet deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
};
