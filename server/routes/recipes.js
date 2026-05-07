const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getSuggestions } = require('../controllers/recipeController');

router.get('/suggest', auth, getSuggestions);

module.exports = router;