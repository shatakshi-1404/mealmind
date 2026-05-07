const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { logMeal, getLogs, deleteLog } = require('../controllers/mealController');

router.post('/', auth, logMeal);
router.get('/', auth, getLogs);
router.delete('/:id', auth, deleteLog);

module.exports = router;