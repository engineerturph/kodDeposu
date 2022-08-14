'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: `Turabi Yildirim`,
  movements: [100000, 100000, 100000, -50000, -50, -5000, -28643],
  interestRate: 20,
  pin: 1453,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// To return withdrawal or deposit in need
const chDeposit = function (move) {
  return move < 0 ? `withdrawal` : `deposit`;
};

// Displaying movements

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ``;

  const movements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movements.forEach(function (move, i) {
    const htmlText = `<div class="movements__row">
    <div class="movements__type movements__type--${chDeposit(move)}">${
      i + 1
    } ${chDeposit(move)}</div>
    <div class="movements__value">${move}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML(`Afterbegin`, htmlText);
  });
};

// Calculating total money
const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce(function (acc, cur, i, arr) {
    return acc + cur;
  }, 0);
  acc.balance = balance;
  labelBalance.textContent = `${balance}€`;
};

// Creating usernames
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(` `)
      .map(name => name[0])
      .join(``);
  });
};
createUsernames(accounts);

// Calculating +s, -s and interests
const calcDisplaySummary = function (guy) {
  const incomes = guy.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}€`;
  const outcomes = guy.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${outcomes}€`;
  const interest = guy.movements
    .filter(mov => mov > 0)
    .map(dep => (dep * guy.interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, int) => acc + int);

  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  // display movements
  displayMovements(acc);

  // display balance
  calcDisplayBalance(acc);

  // display summary
  calcDisplaySummary(acc);
};
// Login
let currentAccount, password;
btnLogin.addEventListener(`click`, function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  ); //Find account
  if (
    currentAccount?.pin === Number(inputLoginPin.value) ??
    acc.username === inputLoginUsername.value
  ) {
    // display ui and welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(` `)[0]
    }`;
    containerApp.style.opacity = `1`;

    // Clear log
    inputLoginUsername.value = inputLoginPin.value = ``;
    inputLoginPin.blur();

    // Update ui
    updateUI(currentAccount);

    console.log(`Login`);
  }
});

// Transfer money attributes
btnTransfer.addEventListener(`click`, function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Doing transfer
  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAcc &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Updating UI
    updateUI(currentAccount);
  }

  // Resetting place
  inputTransferAmount.value = inputTransferTo.value = ``;
  inputTransferAmount.blur();
  inputTransferTo.blur();
});

// Deleteing account
btnClose.addEventListener(`click`, function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      a => a.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = ``;
  inputCloseUsername.blur();
  inputClosePin.blur();
});

// Loan button

btnLoan.addEventListener(`click`, function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

let sorted = false;
// Sort button
btnSort.addEventListener(`click`, function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
// const checkDogs = function (arr1, arr2) {
//   let newArr = [...arr1];
//   newArr.splice(0, 1);
//   newArr.splice(-2, 2);
//   const fullArr = [...newArr, ...arr2];
//   fullArr.forEach(function (dog, i) {
//     console.log(
//       dog < 3
//         ? `Dog number ${i} is still a puppy`
//         : `Dog number ${i} is a adult and is ${dog} years old`
//     );
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// const withdrawals = movements.filter(function (mov) {
//   return mov < 0;
// });

//accumulator -> SNOWBALL

// Maximum value
// const max = movements.reduce(function (acc, cur) {
//   if (acc > cur) {
//     return acc;
//   } else return cur;
// });
// console.log(max);

// const calcAverageHumanAge = function (ages) {
//   const adults = ages
//     .filter(age => age > 2)
//     .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter(age => age >= 18); //filters ages lower than 18

//   const average =
//     adults.reduce(function (acc, age) {
//       return acc + age; //sums up all ages
//     }) / adults.length; //divides all ages with length and gets average

//   console.log(average);
// };
// calcAverageHumanAge([3, 5, 2, 12, 7]);
// // const totalDepositsUSD = movements
// //   .filter(move => move > 0)
// //   .map(mov => mov * 1.1)
// //   .reduce((acc, mov) => acc + mov); //her adimda arrayi kontrol etmek iyidir
// // //if yerine filter da kullanilabilir
// // //cok chaining iyi degil

// movements.find(mov => mov < 0); //ilk elemani bulur

// const account = accounts.find(acc => acc.owner === `Jessica Davis`);
// console.log(account);

//Get true or false with condition(varmi diye bakar)
// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// //EVERY (hepsi conditionu dogrulamali

// //Ayri yerde functionu yazip oradan da callbackleyebilirsin

// const arr = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];

// // Flat method(ic ice olan kumeleri siler)(1 levele kadar)
// console.log(arr.flat());

// //Icteki levellere inmek icin flat icine levelini yazarsin
// const arrDeep = [1, 2, [3, 4, [5, 6]], [7, 8]];
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overalBalance = allMovements.reduce((acc, mov) => acc + mov);
// console.log(overalBalance);

// //flatMap = .map().flat

// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov);
// console.log(overalBalance2);

// const x = new Array(7);
// console.log(x);
// //map calismaz
// //fill calisir (koyulacak sayi, nereden baslicak(dahil), nerde bitecek(dahil degil))
// x.fill(1, 3);
// console.log(x);

// const arr = [1, 1, 1, 1, 1, , , 1, , 11, , 1, 1, 1, ,];
// arr.fill(23, 4, 6);
// console.log(arr);

// //7 tane 1 olan bir array olusturur (object oriented programming)(constructor tarzi)
// //argumentsde 2. kisim map gibi
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// const d = Array.from({ length: 100 }, () => Math.trunc(Math.random() * 6 + 1));
// console.log(d);

// //Baska seylerden(map felan) array alip kullanmana da yarar
// const movementsUI = Array.from(document.querySelectorAll(`.movements__value`));
// //Node listten array olusturursun
// console.log(movementsUI);

// //Bunda map calisir
// const movementsUI = [...document.querySelectorAll(`movements__value`)];
// //Boyle de yapilabilir

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(a => a > 0)
  .reduce((a, b) => a + b);

console.log(bankDepositSum);

// 2.
// const numDeposit1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(a => a >= 1000).length;

// console.log(numDeposit1000);

// const numDeposit1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

// console.log(numDeposit1000);

// //3.
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       sums[cur > 0 ? `deposits` : `withdrawals`] += cur;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(deposits, withdrawals);

// const mapReduce = accounts.reduce((sums, cur) => {
//   sums.push(cur.movements);
//   return sums;
// }, []);

// console.log(mapReduce);

// const flatReduce = mapReduce.reduce((sums, cur) => {
//   return sums.concat(cur);
// }, []);

// console.log(flatReduce);

// 4.
// this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (title) {
//   const exceptions = [`a`, `an`, `and`, `the`, `but`, `or`, `on`, `in`, `with`];

//   const capitalize = word => word[0].toUpperCase() + word.slice(1);
//   const titleCase = title
//     .toLowerCase()
//     .split(` `)
//     .map(word => (!exceptions.includes(word) ? capitalize(word) : word))
//     .join(` `);
//   return capitalize(titleCase);
// };

// console.log(convertTitleCase(`This IS A nice TITLe`));
// console.log(convertTitleCase(`and here is another title with an EXAMPLE`));

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. 
Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. 
HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.

// Adding recommendedFood propertie
dogs.forEach(function (el) {
  el.recommendedFood = Math.trunc(el.weight ** 0.75 * 28);
});

// 2.

// Adding recommended food function
const recommendedfood = function (Dog) {
  return (
    Dog.curFood > Dog.recommendedFood * 0.9 &&
    Dog.curFood < Dog.recommendedFood * 1.1
  );
};

// Finding sarah's dog
const sarahDog = dogs.find(a => a.owners.includes(`Sarah`));

console.log(sarahDog);
console.log(recommendedfood(sarahDog));

// 3.

// Eatstoomuch array and eatstoolittle array
const eatsTooMuch = dogs.filter(a => a.curFood > a.recommendedFood * 1.1 && a);
console.log(eatsTooMuch);
const eatsTooLittle = dogs.filter(
  a => a.curFood < a.recommendedFood * 0.9 && a
);
console.log(eatsTooLittle);

// 4.

// Creating function that takes owners and makes a string that there are `and` between owners
const ownerAndStringMaker = function (dogs) {
  return dogs.reduce((arr, dog) => [...arr, ...dog.owners], []).join(` and `);
};

//
console.log(ownerAndStringMaker(eatsTooMuch) + `'s dogs eats too much!`);
console.log(ownerAndStringMaker(eatsTooLittle) + `'s dogs eat too little!`);

// 5.

// Logging if one of dogs eat recommended food
console.log(dogs.some(a => a.curFood === a.recommendedfood));

// 6.

// Logging if one of dogs eat near recommended food
console.log(dogs.some(a => recommendedfood(a)));

// 7.

// Filtering dogs eat near recommended food
console.log(dogs.filter(a => recommendedfood(a)));

// 8.

// Sorting new dogs array in an ascending order
const dogs2 = [...dogs];
dogs2.sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogs2);
