import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send('Hello Full Stack!');
})

app.get("/bmi", (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
        res.json({ error: "malformatted parameters" });
        return
    }

    const bmi = calculateBmi(height, weight);
    res.json({ height, weight, bmi });
})

app.post("/exercises", (req, res) => {
    if (!req.body || !req.body.daily_exercises || !req.body.target) {
        res.json({ error: "parameters missing" });
        return
    }

    if (!Array.isArray(req.body.daily_exercises) || isNaN(Number(req.body.target))) {
        res.json({ error: "malformatted parameters" });
        return
    }

    const { daily_exercises, target } = req.body
    const result = calculateExercises(daily_exercises, target)
    res.json(result)
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})