import express from 'express';
import diagnosesService  from '../services/diagnosesService'; 

const diangosesRouter = express.Router();

diangosesRouter.get('/', (_res, res) => {
    const data = diagnosesService.getDiagnoses();
    res.json(data);
});

export default diangosesRouter;