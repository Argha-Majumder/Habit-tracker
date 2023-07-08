const express = require('express');
const router = express.Router();

const habitController = require('../controllers/habit_controller');

router.post('/create-habit', habitController.create);

router.post('/edit-habit', habitController.editHabit);

router.get('/delete-habit', habitController.deleteHabit);

router.get('/status-update', habitController.statusUpdate);

module.exports = router;