interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
