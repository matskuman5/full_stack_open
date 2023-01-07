import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
    return;
  }
  const bmi = calculateBmi(Number(req.query.height), Number(req.query.weight));
  res.json({
    weight: req.query.weight,
    height: req.query.height,
    bmi: bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyHours, target } = req.body;
  if (!dailyHours || !target) {
    res.status(400).json({
      error: 'parameters missing',
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  dailyHours.forEach((hour: string) => {
    if (isNaN(Number(hour))) {
      res.status(400).json({
        error: 'malformatted parameters',
      });
    }
  });
  if (isNaN(Number(target))) {
    res.status(400).json({
      error: 'malformatted parameters',
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const hoursNumbers: number[] = dailyHours.map(Number);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.json(calculateExercises(hoursNumbers, target));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
