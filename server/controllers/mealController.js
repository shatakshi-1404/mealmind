const MealLog = require('../models/MealLog');

exports.logMeal = async (req, res) => {
  try {
    const meal = await MealLog.create({ ...req.body, userId: req.user.id });
    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await MealLog.find({ userId: req.user.id })
      .sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    await MealLog.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Meal log deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};