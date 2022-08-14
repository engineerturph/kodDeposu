'use strict';
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// const limit = spendLimits[user] ? spendLimits[user] : 0;
// const limit = getLimit(user); //bracketler boyle de kullanilabilir, 0 cikinca sikinti cikmasin diye nullish coalescing operator kuulanior
const getLimit = function (limits, user) {
  return limits?.[user] ?? 0;
};
const addExpense = function (state, limit, value, description, user = 'jonas') {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limit, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
  // if (value <= getLimit(cleanUser)) {
  //   return [...state, { value: -value, description, user: cleanUser }];
  //   budget.push({ value: -value, description, user: cleanUser }); //description: description yerine boyle kullanabilirsin
  // }
  // return state;
};
const b1 = addExpense(budget, spendLimits, 100, 'Pizza 🍕');
const b2 = addExpense(b1, spendLimits, 100, 'Going to movies 🍿', 'Matilda');
console.log(b2);
//addExpense(budget, 100, 'Pizza 🍕');
// addExpense(budget,100, 'Going to movies 🍿', 'Matilda';
// addExpense(budget,200, 'Stuff', 'Jay');

//Checks values if they are above limits
const checkExpenses = function (state, limits) {
  return state.map(entry => {
    // const limit = getLimit(entry.user); buna da gerek kalmadi

    return entry.value < -getLimit(entry.user, limits)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
};
const finalBudget = checkExpenses(b2, spendLimits);
console.log(finalBudget);

//Impure because they do something
var biggerExpenses = function (state, limit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -limit)
    // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  return bigExpenses;

  // let output = '';
  // for (let entry of budget) {
  //   output += entry.value <= -limit ? `${entry.description.slice(-2)} / ` : '';
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};
console.log(biggerExpenses(budget, 1000));
