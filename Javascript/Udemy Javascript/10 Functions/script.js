'use strict';
/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 5 * numPassengers //numPassangers asagida olsa bu default value ccalismaz
) {
  //ES6 yontemi
  //numPassengers = numPassengers || 1;
  //price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking(`LH123`); //atanmamis argumentler undefined a atanir ama default value atarsan ona atanir
createBooking(`LH!@#`, 2);
createBooking(`LH123`, undefined, undefined); //undefined yazmak ve bos birakmak ayni

const flight = `LH234`;
const jonas = {
  name: `Jonas Schmedtmann`,
  passport: 234234342141,
};

const checkIn = function (flightNum, passenger) {
  // basta let flightNum = flight ve let passenger = jonas islemlerini uygular
  flightNum = `Lh999`;
  passenger.name = `Mr.` + passenger.name;

  if (passenger.passport === 234234342141) {
    alert(`Check in`);
  } else {
    alert(`Fck of`);
  }
};
checkIn(flight, jonas);
console.log(flight, jonas);
//Primitive tiplerde function icinde variable degismez ama reference valuelarda degisir(heap olayindan)
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random()) * 10000000000000000;
};
newPassport(jonas);
checkIn(flight, jonas);
//javascriptte passbyreference(farkli bir value kullanmak) yok passbyvalue(orjin value kullanmak) var


//First-class functions : functions as simply values

//Javascript icindeki bir ozellik
//Bunun sayesinde functiona argument olarak function atabiliriz
//BU sayede functiondan function returnleyebiliriz
//Bu sayede functionda methoda kullanailiriz(function.method())

//Higher order functions : a function gets another function as argument
//ve baska function returnleyen functionlar

//Javascript icindeki bir function tipi

const oneWord = function (str) {
  return str.replace(/ /g, ``).toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...other] = str.split(` `);
  return [first.toUpperCase(), ...other].join(` `);
};

//Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`); //girilen function argumentinin ismi
};

transformer(`Javascript is the best`, upperFirstWord);
transformer(`Javascript is the best`, oneWord);
// JS uses callbacks all the time
const high5 = function () {
  console.log(`✋`);
};

document.body.addEventListener(`click`, high5);

[`Jonas`, `Martha`, `Adam`].forEach(high5); //callback bunda da varmis


const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
}; //guzel ornek
const greeterHey = greet(`Hey`);
greeterHey(`Jonas`);
greeterHey(`Turabi`);

greet(`Hello`)(`Jonas`); //bu sekilde de calisabilir.

const greetArr = greeting => name => console.log(greeting, name);
//Boyle de yazilabilir wow
greetArr(`Naber`)(`Turabi`);


const lufthansa = {
  name: `Lufthansa`,
  iataCode: `LH`,
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.name} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, `Turabi Yildirim`);
lufthansa.book(299, `Jonas Schmedtmann`);
console.log(lufthansa.bookings);
const book = lufthansa.book;
const eurowings = {
  name: `Eurowings`,
  iataCode: `EW`,
  bookings: [],
};

//3 farkli javascriptte this belirleme methodu: call, apply and bind
//book() calismaz
//Call
book.call(eurowings, 23, `Sarah`);
book.call(lufthansa, 239, `Mary Cooper`);

const swiss = {
  name: `Swiss Airlines`,
  iataCode: `SW`,
  bookings: [],
};

book.call(swiss, 583, `Mary Cooper`);

//Apply method (cok kullanilmaz)

const flightData = [123, `Baris`];
book.apply(swiss, flightData);
//notlari buraya kadar aladim
// Bind method
// thisi kullanan yeni bir function returnler
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, `Steven Williams`);
book;

const answerButton = document.querySelector(`.poll`);
const poll = {
  question: `What is your favourite programming language?`,
  options: [`0: Javascript`, `1: Python`, `2: Rust`, `3: C++`],
  answers: new Array(4).fill(0),
  displayResults(type = `array`) {
    if (type === `string`) {
      console.log(`Poll results are: ${this.answers.join(`, `)}`);
    } else {
      console.log(this.answers);
    }
  },
  registerNewAnswer() {
    const Answer = Number(
      prompt(`${this.question} \n${this.options.join(`\n`)}`)
    );

    typeof Answer === `number` &&
      Answer < this.answers.length &&
      this.answers[Answer]++;
    this.displayResults(prompt(`Display type:`));
  },
};

answerButton.addEventListener(`click`, poll.registerNewAnswer.bind(poll));
*/

(function () {
  const header = document.querySelector(`h1`);
  header.style.color = `red`;
  document.querySelector(`body`).addEventListener(`click`, function () {
    header.style.color = `blue`;
  });
})();

