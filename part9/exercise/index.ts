import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
