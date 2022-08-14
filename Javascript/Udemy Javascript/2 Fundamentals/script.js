"use strict"; /*
/*let hasDriversLicense = false;
const passTest = true;

if (passTest) {
  hasDriversLicense = true;
}
function logger() {
  console.log(`my name is jonas`);
}

logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  const juice = `juice with ${apples} apples and ${oranges} oranges`;
  return juice;
}
console.log(fruitProcessor(2, 3));

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);



function calcAge1(birthYear) {
  return 2037 - birthYear;
}

const age1 = calcAge1(1981);
console.log(age1);

const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const calcage3 = (birthYear) => 2037 - birthYear;
let age3 = calcage3(1991);
console.log(age3);
const yearUntilRetirement = (birthYear) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return retirement;
};

console.log(yearUntilRetirement(1991));

function calcage(birthYear, firstName) {
  const age = 2037 - birthYear;
  console.log(`${firstName} is ${age} years old`);
  return age;
}

// const age1 = calcage(1991, `jonas`);

let addAverage = function (attribute) {
  let average = (attribute[0] + attribute[1] + attribute[2]) / 3;
  attribute.push(average);
};

let dolphinsAttributes = [2, 3, 4, `Dolphins`];
let koalasAttributes = [85, 54, 41, `Koalas`];

addAverage(dolphinsAttributes);
addAverage(dolphinsAttributes);

let checkWinner = function (avg1, avg2) {
  if (avg1[5] * 2 <= avg2[5]) {
    console.log(`${avg2[4]} is the winner! 🏆`);
  } else if (avg2[5] * 2 <= avg1[5]) {
    console.log(`${avg1[4]} is the winner! 🏆`);
  } else {
    console.log(`no one wins`);
  }
};
checkWinner(dolphinsAttributes, koalasAttributes);

function calctip(bill) {
  if (bill >= 50 && bill <= 300) {
    let result = bill + bill * 0.15;
    return result;
  } else {
    let result = bill + bill * 0.2;
    return result;
  }
}

let bills = [125, 555, 44, 132, 123];

let newBills = Array.from(bills, function (element) {
  return calctip(element);
});

console.log(newBills);
let total = 0;
newBills.forEach(function (number) {
  total = number + total;
});
console.log(total);

let bill1 = calctip(bills[0]);
let bill2 = calctip(bills[1]);
let bill3 = calctip(bills[2]);

let total = bill1 + bill2 + bill3;
console.log(total);

let tips = [];
tips.push(bill1, bill2, bill3);
console.log(tips);
*/ /*
const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  birthYeah: 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
  hasDriversLicense: true,
  calcage: function () {
    let age = 2023 - this.birthYeah;
    return age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calcage()}-year old teacher and ${
      this.hasDriversLicense
        ? `he has a driver license`
        : `he has no driver license`
    }
    `;
  },
};
console.log(jonas.getSummary());
*/ /*
/*
let mark = {
  name: `Mark Miller`,
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    return this.mass / this.height ** 2;
  },
};

let john = {
  name: `John Smith`,
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    return this.mass / this.height ** 2;
  },
};

if (john.calcBMI > mark.calcBMI) {
  console.log(
    `John BMI (${john.calcBMI()}) is higher than Mark's ${mark.calcBMI()}`
  );
} else {
  console.log(
    `Mark BMI (${mark.calcBMI()}) is higher than John's (${john.calcBMI()})!`
  );
}

for (let rep = 1; rep <= 10; rep++) {
  console.log(`lifting weights repetition ${rep} 🏋️‍♂️`);
}
const jonas = [
  "Jonas",
  "Schmedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
  true,
];
const types = [];

for (let i = 0; i < jonas.length; i++) {
  console.log(jonas[i], typeof jonas[i]);
}
console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}
console.log(ages);

for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== `string`) continue;
  console.log(jonas[i], typeof jonas[i]);
}

for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== `string`) break;
  console.log(jonas[i], typeof jonas[i]);
}

const jonas = [
  "Jonas",
  "Schmedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
  true,
];

for (let i = jonas.length - 1; i >= 0; i--) {
  console.log(i, jonas[i]);
}
for (let i = 1; i < 4; i++) {
  console.log(`starting exercise ${i}`);
  for (let b = 1; b < 11; b++) {
    console.log(`repetition ${b}`);
  }
}

let i = 1;
while (i <= 10) {
  console.log(`${i}`);
  i++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);
let i = 1;
while (dice !== 6 && i < 10) 
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log(`End of the loop.`);
}
*/
function calctip(bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tips = [];
let totals = [];

for (let i = 0; i < bills.length; i++) {
  tips.push(calctip(bills[i]));
  totals.push(bills[i] + calctip(bills[i]));
}

const calcAverage = function (arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    // total = total + arr[i];
    total += arr[i];
  }
  return total / arr.length;
};
console.log(tips, totals, calcAverage(totals));
console.log(window);
