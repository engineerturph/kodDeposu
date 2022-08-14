'use strict';
const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours,
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ time = `20:00`, adress, mainIndex = 0, starterIndex = 1 }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
       comin' at ${time} to ${adress}!`
    );
  },

  pasta: function (ing1, ing2, ing3) {
    console.log(`Pasta made with ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
/*
restaurant.orderDelivery({
  adress: `Via del Sole, 21`,
});

let arr = [7, 8, 9];

const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

const newMenu = [...restaurant.mainMenu, `Gnocci`];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const allMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(allMenu);

console.log(`${(`a`, `b`)}`);

// Real world example
const ingrediental = [`yar`, `ak`, `am`];

console.log(ingrediental);

restaurant.pasta(...ingrediental);

//Object
const newRestaurant = {
  foundedTime: `17 July`,
  ...restaurant,
  founder: `Guiseppe`,
};
console.log(newRestaurant);


const arrrr = [1, 2, ...[3, 4]];
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

*/
//
/*
////////////////////////////////////////////////////
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);

const [starter, main] = restaurant.order(2, 0);
console.log(starter, `and`, main);

const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);
*/
/*
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

const {
  sat: { open: o, close: c },
} = openingHours;
console.log(o, c);
*/
/*
// REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

//otherFood sonda olmali
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

//Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//Functions
const add = function (...numbers) {
  console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3, 4, 5);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza(`mushrooms`, `onion`, `olives`, `spinach`);
*/
/*
console.log(3 || `Jonas`);
console.log(`` || `Jonas`);
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || `` || `Hello` || 23 || null);
console.log(undefined || 0);

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 0;

console.log(guests1);

const guests2 = restaurant.numGuests || 0;
console.log(guests2);
//Bu daha iyi

console.log(`-----AND-----`);
console.log(0 && `Jonas`);
console.log(7 && `Jonas`);

console.log(`Hello` && 23 && null && `Jonas`);

if (restaurant.orderPizza) {
  restaurant.orderPizza(`mushrooms`, `spinach`);
}

restaurant.orderPizza && restaurant.orderPizza(`mushrooms`, `spinach`);

;
const [players1, players2] = game.players; //Bayern Munich

let [gk, ...fieldPlayers] = players1;

let allPlayers = [...players1, ...players2];

let newPlayers1 = [...players1, `Thiago`, `Coutinho`, `Perisic`];

let {
  odds: { team1, x: draw, team2 },
} = game;

const printGoals = function (...players) {
  for (let i = 0; i < players.length; i++) {
    let playernumber = 0;
    for (let c = 0; c < game.scored.length; c++) {
      if (players[i] === game.scored[c]) {
        playernumber++;
      }
    }
    console.log(players[i], playernumber);
  }
};

printGoals(`Lewandowski`, `Davies`, `Muller`, `Kimmich`);

console.log(
  (team1 < team2 && team1 < draw && team1) ||
    (team2 < team1 && team2 < draw && team2) ||
    (draw < team2 && draw < team2 && draw)
);


const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu) {
  console.log(item);
}

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

console.log(restaurant.order?.(0, 1) ?? `Method does not exist`);
console.log(restaurant.orderetto?.(0, 1) ?? `Method does not exist`);

//Arrays
const users = [{ name: `Jonas`, email: `hello@jonas.io` }];

console.log(users[0]?.name ?? `User array empty`);

for (const day of Object.keys(openingHours)) console.log(day);

const properties = Object.keys(openingHours);
let openStr = `We are open on ${properties.length} days`;

for (const day of properties) {
  openStr += `${day}`;
}

//property values
const values = Object.values(openingHours);
console.log(values);

//Entire object
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
*/

const Goalpropertie = function (players) {
  let goalsobject = {};
  for (let i = 0; i < players.length; i++) {
    let playernumber = 0;
    for (let c = 0; c < game.scored.length; c++) {
      if (players[i] === game.scored[c]) {
        playernumber++;
      }
    }
    Object.assign(goalsobject, { [players[i]]: playernumber });
  }
  return goalsobject;
};

/*const Goalpropertie = function () {
  const scorers = {};
  for (let i = 0; i < game.scored.length; i++) {
    scorers[game.scored[i]]
      ? scorers[game.scored[i]]++
      : (scorers[game.scored[i]] = 1);
  }
  return scorers;
}; //Baska cozum

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
//Challenge 1
for (const [number, player] of game.scored.entries()) {
  console.log(`Goal ${number + 1}: ${player}`);
}
//Challenge 2
let toplam = 0;
const odds = Object.values(game.odds); //odds 2 yerde kullanildigi icin variable a atamak daha iyi
for (const odd of odds) {
  toplam += odd;
}
console.log(toplam / odds.length);
//Challenge 3
for (const [name, odd] of Object.entries(game.odds)) {
  if (name === `team1` || name === `team2`) {
    console.log(`Odd of victory of ${game[name]}: ${odd}`);
  } else if (name === `x`) {
    console.log(`Odd of draw: ${odd}`);
  }
}

//Challenge 4
game.scorers = Goalpropertie(game.scored);

console.log(game);

const ordersSet = new Set([`Pasta`, `Pizza`, `Pizza`, `Pizza`]);
console.log(ordersSet);

console.log(new Set(`dafas`));

console.log(ordersSet.size);
console.log(ordersSet.has(`Pizza`));
ordersSet.add(`Garlic Bread`);
ordersSet.add(`Garlic Bread`);
ordersSet.delete(`Risotto`);
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) {
  console.log(order);
}

//Example
const staff = [`Waiter`, `Chef`, `Waiter`, `Manager`, `Chef`];

const staffSet = [...new Set(staff)];
console.log(staffSet);

console.log(new Set([`Waiter`, `Chef`, `Waiter`, `Manager`, `Chef`]).size);

const rest = new Map();
rest.set(`name`, `Classica Italiano`);
rest.set(1, `Italy`);
rest.set(2, `Lisbon Portugal`);
rest
  .set(`categories`, [`Italian`, `Vegetarian`])
  .set(true, `We are open :D`)
  .set(false, `We are closed`)
  .set(`open`, 11)
  .set(`closed`, 23);
console.log(rest);

const time = 21;
console.log(rest.get(time > rest.get(`open`) && time < rest.get(`closed`)));

console.log(rest.has(true));
rest.delete(2);
console.log(rest.size);


const question = new Map([
  [`guestion`, `What is the best language?`],
  [1, `C`],
  [2, `Java`],
  [3, `Javascript`],
  [`correct`, 3],
  [true, `Correct 🎉`],
  [false, `Try Again`],
]);
console.log(question);

console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

for (const [key, value] of question) {
  if (typeof key === `number`) console.log(`Answer ${key}: ${value}`);
}
const answer = Number(3);

console.log(question.get(answer === question.get(`correct`)));

//Convert map to array
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);


const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);
//1
const events = [...new Set(gameEvents.values())];
console.log(events);
console.log(gameEvents.values());
//2
gameEvents.delete(64);
//3
const time = [...gameEvents.keys()].pop();
console.log(`An event happened, on average, 
every ${time / gameEvents.size} minutes`);
//4
for (const [num, event] of [...gameEvents.entries()]) {
  console.log(
    `${num <= 45 ? `[FIRST HALF]` : `[SECOND HALF]`} ${num}: ${event}`
  );
}


const airline = `Turk Hava Yollari`;
const plane = `A320`;

console.log(plane[0]); // array gibi ilk harfi alabilirsin
console.log(plane[1]);
console.log(plane[2]);
console.log(`B737`[0]); //bu sekilde de alabilirsin

console.log(airline.length); //bu sekilde uzunlugu alabilirsin

console.log(airline.indexOf(`v`)); //harfin kacinci sirada oldugunu bulabilirsin (0 dan baslar)
console.log(airline.lastIndexOf(`l`)); //en son harfin kacinci sirada oldugunu bulabilirsin
console.log(airline.indexOf(`Portugal`)); //kelime de arayabalirsin

console.log(airline.slice(5)); //5 ve 5 den sonraki kisimlari okur
console.log(airline.slice(5, 7)); //5 ve 7 arasi kisim( 5 6)

console.log(airline.slice(0, airline.indexOf(` `))); // sayilari boyle de alabiliriz
console.log(airline.slice(airline.lastIndexOf(` `) + 1));
//- yazarsan sondan sayar

const checkMiddleSeat = function (seat) {
  const s = seat.slice(-1);
  if (s === `B` || s === `E`) {
    console.log(`You got the middle seat 😎`);
  } else {
    console.log(`U got lucky`);
  }
};

checkMiddleSeat(`33A`);
checkMiddleSeat(`32B`);
//stringde method cagirdigimizda stringi objecte cevirir (boxing)

console.log(new String(`Jonas`));
console.log(typeof new String(`Jonas`));

const airline = `Turk Hava Yollari`;

console.log(airline.toLowerCase());
console.log(airline.toUpperCase()); //Ne yaptiklari belli

//Fix capitalization in name

const passenger = `JoNaS`; // Jonas yapcaz
const passengerLow = passenger.toLowerCase();
const passengerCorrect = passenger[0].toUpperCase() + passengerLow.slice(1);
console.log(passengerCorrect);

//Comparing emails
const email = `hello@jonas.io`;
const login = `  Hello@Jonas.Io \n`;

const lowerLog = login.toLowerCase();
const trimmedLog = lowerLog.trim(); //bosluklari siler (enter dahil)
console.log(trimmedLog);

const normalizedEmail = login.toLowerCase().trim();
console.log(normalizedEmail);

console.log(email === normalizedEmail);

const newEmail = `benimadimturabi@gmail.com`;
const emailChecker = function (em) {
  console.log(em.toLowerCase().trim() === newEmail);
};

//replacing
const priceUS = `288,27$`;
const priceTR = priceUS.replace(`$`, `TL`).replace(`,`, `.`); //harfleri degistirir (ilk bastakini)
console.log(priceTR);

const announcement = `All passengers come to barding door 23. Boarding door 23!`;

console.log(announcement.replaceAll(`door`, `gate`)); //tum harfleri degistirir

console.log(announcement.replace(/door/g, `gate`)); //regular expression ile tum doorlari hedeflersin

//Booleans
const plane = `Airbus a320neo`;
console.log(plane.includes(`a320`)); //Var mi (buyuk kucuk dikkat eder)
console.log(plane.startsWith(`Ai`)); //Bunla mi basliyor
console.log(plane.endsWith(`neo`)); //Bunla mi bitiyor

if (plane.startsWith(`Airbus`) && plane.endsWith(`neo`)) {
  console.log(`Part of the new airbus family`);
}

//Practice exercise
const checkBaggage = function (items) {
  if (
    items.toLowerCase().includes(`knife`) ||
    items.toLowerCase().includes(`gun`)
  ) {
    console.log(`U are not allowed`);
  } else {
    console.log(`Welcome`);
  }
};
checkBaggage(`I have a laptop some foot and a pocket Knife`);
checkBaggage(`Socks and camera`);
checkBaggage(`Snacks and gun`);


console.log(`a+very+nice+string`.split(`+`)); //ayiraca gore parcalara ayirir ve array olarak returnler
console.log(`Jonas Schmedtmann`.split(` `));

const [fName, lName] = `Jonas Schmedtmann`.split(` `);

const newName = [`Mr.`, fName, lName.toUpperCase()].join(` `);
// ayiraca gore arrayi birlestirir
console.log(newName);

const passenger = `jessica ann smith davis`;

const capitalizeName = function (name) {
  const names = name.split(` `);
  const namesUpper = [];

  for (const word of names) {
    namesUpper.push(word.replace(word[0], word[0].toUpperCase()));
  }
  console.log(namesUpper.join(` `));
};
//Ornek function

capitalizeName(passenger);

// Padding (uzunluk belirli bir sayiya ulasana kadar string ekler)
const message = `Go to gate 23`;
console.log(message.padStart(25, `+`));
console.log(`Jonas1`.padStart(25, `-`).padEnd(300, `-`));

const maskCreditCard = function (num) {
  const str = num + ``;
  const last = str.slice(-4);
  console.log(last.padStart(str.length, `*`));
};

maskCreditCard(1412312341231412412);
maskCreditCard(`12412512512412412412`);

// Repeat (tekrar eder)
const message2 = `Bad weather... All Departues Delayed...`;
console.log(message2.repeat(3));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${`✈`.repeat(n)}`);
};

planesInLine(5);
//Concat str1.concat(str2,str3) stringleri birlestirir

let destroyUnderScoreOfText = function (name) {
  const namesArray = name.trim().toLowerCase().split(`\n`);
  for (const [i, name] of namesArray.entries()) {
    const namesArray2 = name.split(`_`);
    if (namesArray2.length === 2) {
      let fullName = namesArray2[0].concat(
        namesArray2[1].replace(
          namesArray2[1][0],
          namesArray2[1][0].toUpperCase()
        )
      );
      console.log(fullName.trim().padEnd(25, ` `) + `✅`.repeat(i + 1));
    } else {
      console.log(`error can only destroy with 2 names`);
    }
  }
};

document.body.append(document.createElement(`textarea`));
document.body.append(document.createElement(`button`));

const button = document.querySelector(`button`);

button.addEventListener(`click`, function () {
  const text = document.querySelector(`textarea`).value;
  destroyUnderScoreOfText(text);
});

console.log(window);

console.log([`sadasdf`]);
*/
