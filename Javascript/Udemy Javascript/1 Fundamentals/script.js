/*let js = "amazing";
if (js === "amazing") alert("Javascript is FUN!");

// Coding Challenge #1

let infoMark = {
  weight: 134,
  height: 1.8,
};
let infoJohn = {
  weight: 85,
  height: 1.76,
};

function calculateBmi(info) {
  let result = info.weight / info.height ** 2;
  return result;
}

markHigherBMI = calculateBmi(infoMark) > calculateBmi(infoJohn);

console.log(calculateBmi(infoMark), calculateBmi(infoJohn), markHigherBMI);
if (markHigherBMI) {
  console.log(
    `Mark's BMI (${calculateBmi(
      infoMark
    )}) is higher than John's (${calculateBmi(infoJohn)})!`
  );
} else {
  ("John's BMI is higher than Mark's!");
}
*/
/*
let scoreDolphins = (97 + 112 + 101) / 3;
let scoreKoalas = (109 + 95 + 123) / 3;

if (scoreDolphins > 100 && scoreDolphins > scoreKoalas) {
  console.log(`The winner is Dolphins`);
} else if (
  scoreDolphins > 100 &&
  scoreKoalas > 100 &&
  scoreDolphins == scoreKoalas
) {
  console.log(`It's a draw!`);
} else if (scoreKoalas > 100 && scoreKoalas > scoreDolphins) {
  console.log(`The winner is Koalas`);
} else {
  console.log(`No one wins.`);
}

const day = `monday`;

if (day === `monday`) {
  console.log(`asfdasdfas`);
} else if (day === `tuesday`) {
  console.log(`asfdasd`);
} else if (day === ` wednesday` || day === `thursday`) {
  console.log(`asdfasd`);
}
*/
let bill = 40;
let tipPercentage = bill > 50 && bill < 300 ? 0.15 : 0.2;
let tip = bill * tipPercentage;
let result = tip + bill;

console.log(result);
