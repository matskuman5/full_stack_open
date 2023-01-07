const validateArguments = (args: string[]) => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Arguments are not numbers');
  }
};

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi <= 18.4) {
    return 'Underweight';
  } else if (bmi > 18.4 && bmi <= 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi > 24.9 && bmi <= 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

try {
  validateArguments(process.argv);
  console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
