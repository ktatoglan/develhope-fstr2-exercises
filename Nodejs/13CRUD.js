const express = require('express');
const Joi = require('joi');

const router = express.Router();

let planets = [
  {
    id: 1,
    name: 'Earth',
  },
  {
    id: 2,
    name: 'Mars',
  },
];

const planetSchema = Joi.object({
  name: Joi.string().required(),
});

router.get('/api/planets', (req, res) => {
  res.status(200).json(planets);
});

router.get('/api/planets/:id', (req, res) => {
  const planetId = parseInt(req.params.id);
  const planet = planets.find((p) => p.id === planetId);

  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  res.status(200).json(planet);
});

// POST create a new planet
router.post('/api/planets', (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const newPlanet = {
    id: planets.length + 1,
    name: req.body.name,
  };

  planets.push(newPlanet);
  res.status(201).json({ msg: 'Planet created successfully' });
});

router.put('/api/planets/:id', (req, res) => {
  const planetId = parseInt(req.params.id);
  const planet = planets.find((p) => p.id === planetId);

  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  planet.name = req.body.name;
  res.status(200).json({ msg: 'Planet updated successfully' });
});

router.delete('/api/planets/:id', (req, res) => {
  const planetId = parseInt(req.params.id);
  const index = planets.findIndex((p) => p.id === planetId);

  if (index === -1) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  planets.splice(index, 1);
  res.status(200).json({ msg: 'Planet deleted successfully' });
});

module.exports = router;
