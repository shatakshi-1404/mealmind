const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getAll, add, remove } = require('../controllers/ingredientController');

router.get('/', auth, getAll);
router.post('/', auth, add);
router.delete('/:id', auth, remove);

module.exports = router;