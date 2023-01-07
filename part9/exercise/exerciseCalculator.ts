interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const hours: string[] = args.slice(3);
  hours.forEach((hour) => {
    if (isNaN(Number(hour))) {
      throw new Error('Arguments must be numbers');
    }
  });
  const hoursNumbers: number[] = hours.map(Number);
  return {
    dailyHours: hoursNumbers,
    target: Number(args[2]),
  };
};

const calculateExercises = (
  dailyHours: Array<number>,
  target: number
): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const totalHours = dailyHours.reduce((acc, curr) => acc + curr, 0);
  const average = totalHours / periodLength;
  const success = average >= target;
  let rating;
  let ratingDescription;
  if (average / target >= 2) {
    rating = 3;
    ratingDescription = 'Wow, you exceeded your target!';
  } else if (average / target >= 1) {
    rating = 2;
    ratingDescription = 'You met your target, good job!';
  } else {
    rating = 1;
    ratingDescription = 'You did not meet your target, try harder next time!';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const params = parseArguments(process.argv);
  console.log(calculateExercises(params.dailyHours, params.target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
