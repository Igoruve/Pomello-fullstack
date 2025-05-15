import express from 'express';
import router from 'express-promise-router';
import chronoController from '../controllers/chrono.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';


//const express = require('express');
//const router = express.Router();
//const chronoController = require('../controllers/chrono.controller');
//const authMiddleware = require('../middleware/auth.middleware');


router.post('/start', authMiddleware, chronoController.startChrono);

router.post('/stop', authMiddleware, chronoController.stopChrono);

router.get('/stats', authMiddleware, chronoController.getChronoStats);

module.exports = router;
