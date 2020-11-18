import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;
    console.log(height, weight);
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        res.json({ weight, height, bmi: calculateBmi(Number(height), Number(weight)) });
    } else {
        res.json({ error: "malformatted parameters"} );
    }
});

app.post("/exercises", (req, res) => {
    const data = req.body;
    if ("daily_exercises" in data && "target" in data) {
        const daily_exercises: Array<number> = data.daily_exercises.map((value) => Number(value));

    } else {
        res.json({ error: "parameters missing" })
    }
});

app.listen('3001', () => console.log("Server running on port 3001."));
