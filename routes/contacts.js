const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getAll);

router.get('/:id', contactController.getById);

router.post('/', contactController.createUser);

router.put('/:id', contactController.updateUser);

router.delete('/:id', contactController.deleteUser);

module.exports = router;