const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  quantity: { type: String }, // e.g. "2 cups", "500g"
  category: { 
    type: String, 
    enum: ['vegetable', 'fruit', 'dairy', 'meat', 'grain', 'spice', 'other'],
    default: 'other'
  },
  expiryDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Ingredient', ingredientSchema);