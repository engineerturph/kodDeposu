'use strict';

// API : objectlerin birbiriyle etkilestigi yer

// class tipi olusturursun sonra ondan new Classismi(name) ile farkli objectler yaparsin

// fundemantal oop principles

// Abstraction : onemli olmayan detaylari sil(icerdeki detaylari sakla)
// Encapsulation : propertieleri ve methodlari icerde tut (bazilari disariyla paylasilabilir)
// Inheritance : icinde baska classlarin ozelligi olan classlari da yapabilirsin (child parente bilgilerini verir)
// Polymorphism : child class aldigi classalri degistirebilir.

// Objectler(instance) classlardan olusur(instantiated)
// Object classdan kopyalanir
// Newle olusturdugunda class gibi davranir ama sonradan bise eklediginde prototype gibi davranir sonradan eklenilene

// Js de objectler prototype a erisebilir. (prototypal inheritance)
// Objectler prototype a baglidir prototype degisirse object degisir

// Object.create farkli bise
// Person person.prototype a bagli ve person.prototype ise Object.prototype a bagli object.prototype prototype i yok
/*
// Prototype(buyuk harfle baslar)
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //   // Never to this
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person(`Jonas`, 1991);
console.log(jonas);

// 1 New {} is created
// 2. function is called(this = {})
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person(`Matilda`, 2017);
console.log(matilda);

console.log(jonas instanceof Person);

// Prototypes

// Person.prototype i degistirirsen constructoru degistirir
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

// jonas.__proto__ === Person.prototype (person.prototype personun prototype i degil hepsinin ortak prototypei) Person tek basina sadece bir function

// prototype.isPrototypeOf(jonas) ile de kontrol edebilirsin

// jonas.hasOwnProperty ile kendi propertysi varmi diye checkleyebiliriz

console.log(Object.prototype);

console.log([].__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log([1, 2, 3, 4, 4].unique());

// Arraye felan bunlari eklemek ii degil cunku ilerde sikinti cikabilir ve baskalari de eklerse anasini skertir

const h1 = document.querySelector(`h1`);

console.dir(a => a);

// html - html heading element - html element - Element - Node - Event Target seklinde hepsi birbirini prototypelar

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
  return this.speed;
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
  return this.speed;
};

const car1 = new Car(`BMW`, 120);

const car2 = new Car(`Mercedes`, 95);

// JS classes

// // class expression
// const PersonCl = class {

// }
// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  } // buradakileri prototype a alir

  // propertie validation
  set fullName(name) {
    if (name.includes(` `)) this._fullName = name;
    else console.error(`alert`);
  } // ayni isimle set de yapabilirsin ama ayni isimle yine propertie olusturamazsin buga girii
  get fullName() {
    return this._fullName;
  }
}

const jessica = new PersonCl(`Jessica Davis`, 1996);
console.log(jessica);
jessica.calcAge();

PersonCl.prototype.greet = function () {
  console.log(this.firstName);
};
jessica.greet();

// 1- Classes are NOT hoisted
// 2- Class are first-class citizens
// 3- Classses are executed in strict mode

const account = {
  owner: `jonas`,
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  }, // get yazarsan sana direk argumenti parantezsiz returnler

  set latest(mov) {
    this.movements.push(mov);
  }, // set yazarsan argumenti esittir ile yazabilirsin
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);

// sadece prototypeda kullanilabilen static functionlarda yapabilirsin.
// classin kendisine helper function eklemek iyi olabilir.

Person.hey = function () {
  console.log(`hey there`);
};
*/
// Object.create prototype objecti olusturup eklersin.
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = `Steven`;
steven.birthYear = 2002;
steven.calcAge();

const sarah = Object.create(PersonProto);
sarah.init(`Sarah`, 2020);
sarah.calcAge();

const car = class {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
    return this.speed;
  }
  brake() {
    this.speed -= 5;
    console.log(this.speed);
    return this.speed;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
};

const car1 = new car(`Ford`, 120);
*/
// Inheritance between classes (parent class: person, child class:student) her turlu yontemle yapilabilir.
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype); // prototype i olusturduktan sonra ayarla
// Prototype i person.prototype olan bir Student.prototype olusturdu
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and i study ${this.course}`);
};
// O objecte bunu ekledi
const mike = new Student(`Mike`, 2020, `CS`);
console.log(mike);
// mike olusturup onu o objecte bagladi (prototype varsa otomatik ona bagliyor yoksa kendi olusturuyor)

// kendi olusturmadigi icin icinde constructoru yok
Student.prototype.constructor = Student;

console.log(Student.prototype.constructor);
console.dir(Student);

// Coding Challenge #3
/////////////////////////////////
// Prototypedan attribute da inheritleyebilirsin

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
  return this.speed;
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
  return this.speed;
};

const ElectroCar = function (make, speed, battery) {
  Car.call(this, make, speed);
  this.battery = battery;
};

ElectroCar.prototype = Object.create(Car.prototype);

const tesla = new ElectroCar(`Tesla`, 120, 23);
console.log(tesla);

ElectroCar.prototype.chargeTo = function (chargeTo) {
  this.battery = chargeTo;
  console.log(this.battery);
};

ElectroCar.prototype.accelerate = function () {
  this.speed += 30;
  this.battery -= 1;
  console.log(this.speed, this.battery);
};

tesla.accelerate();
tesla.chargeTo(90);
tesla.brake();
*/ /*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  } // buradakileri prototype a alir

  // propertie validation
  set fullName(name) {
    if (name.includes(` `)) this._fullName = name;
    else console.error(`alert`);
  } // ayni isimle set de yapabilirsin ama ayni isimle yine propertie olusturamazsin buga girii
  get fullName() {
    return this._fullName;
  }
  // Static method
  static hey() {
    console.log(`hey`);
  }
}
class Student extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Needs to happen first ilk yazmazsan thise erisemezsin
    super(fullName, birthYear);
    this.course = course;
  } // constructor yazmassan propertie eklemeden cikartir.
  calcAge() {
    console.log(`im groot`);
  }
}

const martha = new Student(`Martha Jones`, 2012, `Computer Science`);
martha.calcAge();
*/ /*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`sadfasd`);
};
const jay = Object.create(StudentProto);
jay.init(`Jay`, 2010, `Computer Science`);
jay.introduce();
jay.calcAge();
console.log(jay);

class Account {
  // 1) Public fields (instances) (objectin icinde)
  locale = navigator.language;

  // 2) Private fields
  #movements = [];
  #pin; // burada declareleyip baska yerde ismini koyabilirsin
  // 3) Constructor
  constructor(owner, currency, pin) {
    // super varsa parent class da vardir
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for openin an account ${owner}`); // Account actiginda bu mesaj cikar
  }
  // 4) Public methods

  // Public interface of objects
  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this; // bunun sayesinde methodlari chainleyebilirsin
  }

  withdraw(val) {
    this.deposit(-val); // class icindeki methodu method icinde kullanabiliriz
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }
  // 5 Private methods (bunu instance olarak goruyo daha gelmemis)(yok aslinda)
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account(`Jonas`, `EUR`, 1111);
console.log(acc1);

acc1.deposit(100);
console.log(acc1);

console.log(acc1.requestLoan(1000));
console.log(acc1);
// object icindeki bilgileri ya da methodlari korumak icin fake encaptulation basina _ koyarsin ve ekiptekilere disardan buna erisilmemesi gerektigini soylersin

// true encaptulation icin de
// Public ve private(#) fieldlar, publuc ve private methodlar var

acc1.deposit(10).deposit(20).withdraw(300);
console.log(acc1);
*/

// Bunda constructorun altinda prototype var
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargebattery(ch) {
    if (ch > this.#charge) {
      this.#charge = ch;
    } else console.log(`Car is already charged to ${this.#charge}% level`);
  }
  accelerate() {
    this.speed += 30;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h with a charge of ${
        this.#charge
      }`
    );
  }
}

const rivian = new EVCl(`Rivian`, 120, 23);
console.dir(rivian);

//////////////////////////////////////////////////////////////////
// Bunda constructor ile functionlar ayni yerde
const Person = function (name) {
  this.name = name;
};

Person.prototype.uc = function () {
  console.log(`uctum`);
};

const turabi = new Person(`turabi`);

console.log(turabi);

// Bunda constructor yok
const Persona = {
  init(q) {
    this.q = q;
  },
};

const turabiP = Object.create(Persona);

turabiP.init(`31`);
console.log(turabiP);
