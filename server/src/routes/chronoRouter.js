import { Router } from 'express';
import chronoController from '../controllers/chronoController.js';
import isLoggedInAPI from '../middlewares/authMiddleware.js';



const router = Router();

router.post('/start', isLoggedInAPI, chronoController.startChrono);

router.post('/stop', isLoggedInAPI, chronoController.stopChrono);

router.get('/stats', isLoggedInAPI, chronoController.getChronoStats);

router.post('/pomellodoro/start', isLoggedInAPI, chronoController.startPomellodoroCycle);

router.post('/pomellodoro/stop', isLoggedInAPI, chronoController.stopPomellodoroCycle);

router.get('/pomellodoro/status', isLoggedInAPI, chronoController.getPomellodoroStatus);

router.get('/pomellodoro/visual/status', isLoggedInAPI, chronoController.visualPomellodoroStatus);

export default router;
