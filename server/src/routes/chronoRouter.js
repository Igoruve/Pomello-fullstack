import { Router } from 'express';
import chronoController from '../controllers/chronoController.js';
import isLoggedInAPI from '../middlewares/authMiddleware.js';

const router = Router();



router.post('/start', isLoggedInAPI, chronoController.startChrono);

router.post('/stop', isLoggedInAPI, chronoController.stopChrono);

router.get('/stats', isLoggedInAPI, chronoController.getChronoStats);

router.post("/startPomellodoro", isLoggedInAPI, chronoController.startPomellodoroCycle);

router.post("/stopPomellodoro", isLoggedInAPI, chronoController.stopPomellodoroCycle);


export default router;