'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2021-10-19T23:36:17.929Z',
    '2021-10-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions
const startLogOutTimer = function () {
  // Set time to 5 minutes
  let time = 300;
  const tick = function () {
    // In each call print the remaining time to UI
    let min = String(Math.floor(time / 60)).padStart(2, `0`);
    let sec = String(time % 60).padStart(2, `0`);
    labelTimer.textContent = min + `:` + sec;

    // When 0 seconds, stop timer and  log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    time--;
  };
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: `currency`,
    currency: currency,
  }).format(value);
};

const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) {
    return `Today`;
  }
  if (daysPassed === 1) {
    return `Yesterday`;
  }
  if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  }

  const day = `${date.getDate()}`.padStart(2, 0);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

let currentAccount, timer;

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);

  // Create current date and time
  const now = new Date();
  labelDate.textContent = new Intl.DateTimeFormat(`en-GB`).format(now);
};

///////////////////////////////////////
// Event handlers

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);

    // Log out Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
  }
});

const movValueArray = [...document.querySelectorAll(`.movements__value`)];

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    setTimeout(function () {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAcc.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
    }, 5000);
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 5000);
  }
  inputLoanAmount.value = '';
  // Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// // Binary baseden dolayi sikinti cikarir js
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3);

// // Conversion
// console.log(Number(`23`));
// console.log(+`23`);

// // Parsing Bastaki sayilari alir 2. argument regexdir ve
// // numara sisteminin baseini belirler
// console.log(Number.parseInt(`30px`, 10));
// console.log(Number.parseInt(`e23`, 10));

// console.log(Number.parseFloat(` 2.5rem`)); // Floatlarda boyle kullanilir
// console.log(Number.parseInt(`  2.5rem`));

// console.log(parseFloat(`2.5rem`));

// console.log(Number.isNaN(20)); // NaN mi diye kontrol eder
// console.log(Number.isNaN(`20`));
// console.log(Number.isNaN(+`20x`)); // String olmayan bir seyi cevirmeye calisirsan NaN verir
// console.log(23 / 0); // Infinity returnler(number degil)

// console.log(Number.isFinite(20)); // Bir number mi degilmi diye kontrol eder
// console.log(Number.isFinite(`20`));

// console.log(Number.isInteger(23.0)); // Integer mi diye kontrol eder (23.0 integer)

// ////////////////////////////////////////////////////////////////////////////////
// console.log(Math.sqrt(25)); // Kokunu alir
// console.log(25 ** 1 / 2);
// console.log(8 ** 1 / 3);

// console.log(Math.max(5, 16, `23`, 11, 2)); // Stringi ceviri ama parsing yapmaz
// console.log(Math.min(5, 16, `23`, 11, 2));

// console.log(Math.PI); // Pi alirsin

// const randomInt = (min, max) => {
//   console.log(Math.floor(Math.random() * (max - min + 1) + min));
// };
// console.log(Math.random()); // 0-1 arasinda rastgele bir sayi verir

// // Decimallari siler
// console.log(Math.trunc(23.3));

// console.log(Math.round(23.9)); // Yuvarlar

// console.log(Math.ceil(23.9)); // Uste yuvarlar
// console.log(Math.floor(`23.9`)); // Asagiya yuvarlar (trunc ile negatif sayilarda farkli sonuc verir)

// randomInt(1, 6);

// console.log((2.7).toFixed(0)); // 0 ondaligi olana kadar yuvarlar(uste)(string olarak)

//Intl Numbers
/*
const num = 321421.123;
const options = {
  style: `currency`, //style unit yazarsan ona gore ayarlar curreny yazarsan ona gore ayarlar
  unit: `celsius`,
  currency: `EUR`, //numarayi basta yazdigin ayara gore yazar ama yanindaki currency yi buna gore yazar
  useGrouping: false, // bunla gruplari kaldirirsn
};
// bu sekilde numberi ulkeye gore formatlion
console.log(`US:`, new Intl.NumberFormat(`en-US`, options).format(num));
console.log(`Germany`, new Intl.NumberFormat(`de-DE`, options).format(num));
console.log(`Syria`, new Intl.NumberFormat(`ar-SY`, options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

// Set timeout and setInterval

const ingredients = [`olives`, `spinach`];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza 🍕 ${ing1} ${ing2}`),
  1000,
  // `olives`, //argument 1
  // `spinach` //argument 2
  ...ingredients
);
console.log(`Waiting...`);

if (ingredients.includes(`spinach`)) {
  clearTimeout(pizzaTimer);
} // prevents setTimeout

// setInterval verdigin sure her gectiginde bidaha functionu calistirir

setInterval(function () {
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  console.log(hour + `:` + min + `:` + sec);
}, 10000000);

// clearInterval intervali bitirir
*/
