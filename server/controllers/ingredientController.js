const Ingredient = require('../models/Ingredient');

exports.getAll = async (req, res) => {
  const ingredients = await Ingredient.find({ userId: req.user.id });
  res.json(ingredients);
};

exports.add = async (req, res) => {
  try {
    const ingredient = await Ingredient.create({ ...req.body, userId: req.user.id });
    res.status(201).json(ingredient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Ingredient.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Ingredient removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};