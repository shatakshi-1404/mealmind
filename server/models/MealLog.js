const mongoose = require('mongoose');

const mealLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipeName: { type: String, required: true },
  calories: { type: Number },
  mealType: { 
    type: String, 
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    default: 'lunch'
  },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('MealLog', mealLogSchema);