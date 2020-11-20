import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './calculateExercises';
import { exerciseBody } from './interfaces/interfaces';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        return res.json({ weight, height, bmi: calculateBmi(Number(height), Number(weight)) });
    } else {
        return res.json({ error: "malformatted parameters"} );
    }
});

app.post("/exercises", (req, res) => {
    const data: exerciseBody = req.body as exerciseBody;
    if (!data.daily_exercises || !data.target) return res.status(400).json({error: 'parameters missing'});
    data.daily_exercises.map( value => {
        if (isNaN(Number(value)) || typeof(value) !== 'number') return res.status(400).json({error: 'malformatted parameters'});
        return Number(value);
    });
    if (isNaN(Number(data.target))) return res.status(400).json({error: 'malformatted parameters'});
    const result = calculateExercises(data.daily_exercises, Number(data.target));
    return res.json(result);
});

app.listen('3001', () => console.log("Server running on port 3001."));
