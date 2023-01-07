const calculateBmi = (height: number, weight: number) => {
  return weight / (height / 100) ** 2;
};

console.log(calculateBmi(180, 74));
