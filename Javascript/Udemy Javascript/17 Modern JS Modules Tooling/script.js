// npm javascriptle ilgili tum dosyalari tutar sadece node js deil
// developmentta farkli module ler olustur sonra onlari kullanir ve urunu cikarirsin
// buildlerken once tum dosyalari bundlelarsin sonra transpilling ile kodunu es5 e cevirirsin(Babel)
// webpack ya da parcel kullanarak buildleriz.

// Modules
// uygulama detaylarini alan dosyalar(function ya da classlar gibi ama dosya olarak)
// importlar ve exportlariz
// importlanan kodlara dependencie denir cunku obur dosyadaki kodsuz calisamaz

//Why modules
//Kucuk parcalar halinde kodlanabilir
//Tum kucuk parcalar oburlerinden bagimsiz sekilde kodlanabilir
//abstract code (ozetleme)
//Organised code
//Reuse code

//Script ve module farki
//eskiden ayri bir sekilde eklerdik es6 dan sonra kendi icinde var
// Moduleda top level variables ona ozel(exportlamazsan) scriptte global
// Module otomatik strict modeda
// Module primary definelarla (var) ile definalar
// Moduleda top level this undefined scriptte window
// Sadece module importlayip exportlayabilir.(scriptte import da yok)
// Import ve exportlar sadece top levelda olur.(nereye yazarsan yaz hoisted en ustte calisir)
// HTML linklerken scriptte <script type="module"> yapariz normal scriptte <script> ile linkleriz
// Modulelar yuklenirken asyncronous(normal site yuklenirken) olarak yuklenir.Scriptte ama istersen (site yuklendikten sonra)syncronous sekilde yuklenir.

//How es6 modules are imported
//kod ilk basta parselanir(okunur) bu sirada import hoistlenir ve en basa tasinir
//kod calismadan once moduleler importlanir(importladigin filelar)
//boyle olmasi bundling(importladigimiz filedaki gereksiz kodlari silme) ve dead code eliminationu sagliyor.
//javascript moduleleri pointer gibi o variable i gosterir obur file da o variable degisirse heryerde degisir.

//importlanan filelar asyncronous yuklenir(birisi yuklenirken oburu de yuklenebilir) ama syncronous importlanir(tamamen importlanmadan index.js calismaz)
//
//
//
//

//importing module(variable kullanmak icin variable i importlaman lazim)

// console.log('importin module');

// import { addToCart, totalPrice as price, tq } from './shoppingCart.js'; //ilk import calisir

// addToCart('bread', 3);
// console.log(price, tq);
/*
import * as ShoppingCart from './shoppingCart.js'; //exportlanan herseyi importlar
console.log(`Importing module`);


ShoppingCart.addToCart(5, 'bread');
console.log(ShoppingCart.totalPrice);
*/
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
//ama normalde default importla normal importlari birlikta yapma
// add('pizza', 2);
// console.log(price);

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);
console.log(cart); //exportlanan valueyu kopyalamaz onunla baglanti kurar

//
//
//
//

// modulede top level await kullanilabilir
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

//Array.prototype.at()
//The at() method takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.
// console.log('Something');
/*
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost); //promise returnler

const lastPost2 = await getLastPost(); //kendisini returnler
console.log(lastPost2);*/
//
//
//
//
/*
//Module pattern(bunun gibi exportluyor kendini dosya)
const ShoppingCart2 = (function () {
  const cart = [];
  const shoppingCart = 10;
  const totalPrice = 237;
  const totalQuantity = 23;
  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
*/
//bunda istedigimiz seyleri disari verebiliriz istemediklerimiz icerde kalabilir
//module da function gibi baska bir dosyadaki scope gibi
//Module gibi functionda closure gecerlidir function ilk olustugu scopeun kurallarina gore calisir ve orayi degistirebilir.
//
//
//
//

//CommonJS Modules
//Node.js de kullaniliyordu onceden
//npm de o yuzden bu kullaniliyor

//export.isim ile exportluyosun (jsde callismaz node.js de calisir)
//const { isim } = require('./shoppingCart.js') bu importluyor
//
//
//
//

//Command line basics
//dir ile icindeki seyleri ogrenirsin
//cd .. ile geriye gidersin
//cd klasor adi ile icteki klasore girersin(tab ile klasor ismini auto completeleyebilirsin)
//ctrl k ile silebilirsin.
//mkdir ISIM ile klasor olusturabilirsin
//echo icine yazcagin > dosya ismi ile dosya olusturabilirsin
//echo ' ' > dosya ismi ile bos dosya olusturabilirsin(1 satir bosluk birakior neden bilmem)
//del ile dosyayi silersin
//movelama seyinin syntaxi cok kotu
//cmd islemi durdurma ctrl c
//silme seyinin syntaxi del
//-yazilacakSey ile yapilan islemin settingini belirliyorsun
//clear daha guzel siliyor

//cmd cok kotu ubuntu calismadi cmd sadece tasima yapmiyor yapcak bise yok
//
//
//
//

//NPM
//HTML de sscriptten once baska file i okutarak ta module yukleyebilirsin ama herkes gorur
//kendin guncellemen gerekir boyle kullanirsan
//eskiden jquery guncellemeleri vardi ve cok zordu

//npm ilk indirirken npm init yazion ve package .json olusturuon
//indirdikten sonra dependencies olusur (anlami bagliliklar)

//npm common js kullaniyor module bundler kullanmazsan baglayamazsin
//module bundler hepsini bir dosyaya cevirir
//lodash cok hos objects functions dates ekler(lodash es es modules var)
//lodashde her function icin bir file var
//cloneDeep objecti direk kopyalar
//gite yuklerken node moduleslari da yuklemene gerek yok(modulelar package.json da varsa -npm i ile hepsini geri yuklersin ez)

import cloneDeep from 'lodash'; //parcel commonjs modulelerini de kullanabilmeni saglayabilir

const state = {
  cart: [{ product: 'bread' }, { product: 'pizza' }],
  user: { loggedIn: true },
};

const stateDeepClone = cloneDeep(state);
const stateClone = Object.assign({}, state);
state.cart[1].product = 'cake';
console.log(stateDeepClone);
console.log(stateClone);

//
//
//
//

//Module bundler
//parcel ile module bundleliyoruz ve devDependencie olarak indirioz
//npm install parcel --save-dev
//kodun direk kendisinde kullanmadigin icin boyle indirion
//parceli commandden kullanirsin
//global parcel de indirebilirsin
//npx ile parceli local olarak kullanabilirsin(Executes <command> either from a local node_modules/.bin, or from a central cache, installing any packages needed in order for <command> to run.)
//hepsini birlestirir sonra da server acar
//localhost la ip adresini yazmak ayni
//npm basina sudo yazarak ekstra permission alabilirsin
//npm i asdasdf@(istedigin versiyon) ile istedigin versiyonu kullanabilirsin
//npm uninstall ile silebilirsin
//bundler asil distteki js i gonderior

// if (module.hot) {
//   module.hot.accept();
// }
//module degisirse direk page degisir
//sayfayi yenilemeden kaydeder.Bir arraye birsey ekliyorsa birdaha ekler ve bence bu cok sacma resetleyip sonucu gormek iyidir
//sayfa devam eder kodla ekstra variablelarla oynayabilirsin
//package.json da script ekleyebillirsin npm run (scriptismi) (local calistirir)
//parcel degismis https://parceljs.org/getting-started/migration/#package.json%23main
//parcel (html) ile distte server acarsin parcel build (html) ile js kodunu asiri kisaltirsin
//parcel ile site acinca js kodllarini gizlemior nasil gizlenior bilmiom
//npm i parcel -g ile global indirebilirsin(-g global ayari)
//cogu toolu local indirmeni istiolar ki otomatik guncellensin
//
//
//
//

//Babel (ES5 oncesine cevirme)
//Parcel otomatik babel kullanir.
//F11 ile tam ekran acabilirsin
//ctrl ` ile terminal acip kapatabilirsin
//makinelerin %0.25 kismi sadece calistirmaz
//babel presetleri ise yarar(bizim kullandigimiz preset-env)
//babel functionlari bazilari experimental oluor sikinti cikarabilir
//promise ve findi babel ceviremior(direk ES6 haliyle yaziyor pust ) bu yuzden polyfillemek lazim
class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting},${this.name}`);
  }
}
const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/actual'; //npm modulelerini otomatik indirir dedi de indirmior :D
//polyfill tum functionlari cevirir kendin tek tek yazarak olusan kodu kisaltabilirsin
//core u yukledim ama calisiomu felan anlamadim
//import 'core-js/actual/array/find' ile sadece belli functionlari polyfilleyebilsin

//Polyfilling async functions(regenerator-runtime)
import 'regenerator-runtime/runtime.js';
//
//
//
//

//Review: Modern and clean code

///Readable code
//En onemlisi kolay anlasilir kod yazmak(en kotu ileride anlamak icin)
//Cok karmasik cozumlerden uzak dur
//Cok aciklayici isimler koy

///General
//DRY principle
//Globalda cok variable kullanma
//var kullanma
//=== ve !== kullan

///Functions
//functions should do only one thing(main role)(bazen kirilabilir)
//don't use more than 3 parameters
//use default parameters when possible
//generally return same data type as received(can breakable)
//use arrow functions when they make code more readable(farkli fikirler var kafana gore)

///OOP
//Use es6 classes
//Encapsulate some data(_) and don't mutate it from outside the class
//Implement method chaining
//Do not ever use arrow functions as methods(this problem)

///Avoid nested code(ic ice){{{}}}
//use early return(guard clauses)(ic ice ifler kullanmamak icin icerde bise olmazsa direk functionu bitiriosun
//o kodu istedigin seyin icindeki if bloguna almak yerine)
//https://deviq.com/design-patterns/guard-clausew
//Use turnary or logical operators instead if
//Use multiple if instead of if/else-if
//Avoid for loops use array methods instead
//Avoid callback based asynchronous APIs

///Asynchronous code
//Consume promises with async/await
//Whenewer possible run promises in parallel(Promise.all)(biri sikinti cikarirsa error verir)
//Handle errors and promise rejections
//const [result1, result2] = await Promise.all([task1(), task2()]);(promise all ayni anda calistirir)

///Declarative ve imperative code
//Imperative
//programmer explains how to do things
//step by step recipe of cake
/*
const arr = [1,2]
const doubled = []
for(let i=0; i<arr.length; i++)
  double[i] = arr[i] * 2
*/

//Declarative
//Explaining thing we want to achieve
//description of cake
/*
const arr = [2,4,6,8]
const doubled = arr.map(n=>n*2)
*/

///Functional programming
//Declarative programming paradigm
//Combines many pure functions, avoiding side effects and mutating data
//Side effect = modification of any data outside of function(logging to console,writing to DOM)
//Pure function = function without side effects, given the same inputs always returns the same outputs
//Immutablility = Data is never modified, state is copied and copy is mutated
//Reactda data inmutable
//%100 declarative olmak zorunda degiliz(bazilarini kullanmak iyidir)

//Functional programming techniques
//Try to avoid data mutations
//Use built in methods that dont produce side effects
//Do data transformation methods such as (.map,.filter)
//Try to avoid side effects (this is not always possible,necessary)

///Declarative syntax
//Use array and object structuring
//Use spread operator
//Use ternary operator
//Use template literals `${}`

//Object.freeze ile objecti immutable yapabilirsin(database) en ustteki objecttekilerin icinteki objectleri degistirebilirsin

//functionlari yazarken disardaki variablelara dokunma dokunman gerekirse argument olarak al
//Thus a pure function is a computational analogue of a mathematical function.
//https://en.wikipedia.org/wiki/Pure_function
//the function return values are identical for identical arguments (no variation with local static variables, non-local variables, mutable reference arguments or input streams), and
//the function application has no side effects (no mutation of local static variables, non-local variables, mutable reference arguments or input/output streams).
//static variable degistirme onun yerine yenisini olustur
