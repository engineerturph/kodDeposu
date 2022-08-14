'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const body = document.querySelector(`body`);
const img = document.querySelector(`img`);
const renderCountry = function (data, className = ``) {
  const html = `<article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${Object.values(
          data.languages
        )}</p>
        <p class="country__row"><span>💰</span>${
          Object.values(Object.values(data.currencies)[0])[1]
        }</p>
      </div>
    </article>`;
  countriesContainer.insertAdjacentHTML(`beforeend`, html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML(`beforeend`, msg);
  //   countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
// Most code is syncronous(executed line by line)
// Long running operations block code execution

// setTimeout asyncronous
// img.src ile resim indirmekte asyncronous ve bu yuzden loadi bekleriz

// addEventListener asyncronous degil.

// AJAX allows us to communicate with remote web servers in an asyncronous way.

// API piece of software that can be used to transform information with another softwares.

// Online API Serverdan bilgiler almamiza yarar

// Node js ile kendi Online API ini olusturabilirsin

// Hersey icin bir API vardir.

// AJAX XML ile yazilir anlamina geliyor ama JSON ile yaziliyor.

// https://restcountries.com/v2/ (countries API da kullanilacak yeni link)

// birsuru API https://github.com/public-apis/public-apis

// facebook aslinda facebook degil DNS den asil ip adresine ceviriyor.

// TCP(Transmission Control Protocol)/IP(Internet Protocol) ile baglanirlar

// TCP responseleri parcalara ayirir ve serverda birlestirir.IP de onlari yonlendirir.

// HTTP(Communication Protocol) request gonderilir (GET POST PUT PATCH /target (target bossa website route a erisirsin)(ayrica alcagin bilgiyle ilgili tonla bilgi gonderirsin(alma tarihin de var)))(BODY(bilgi) de gonderebilirsin)

// HTTP Respose verir status code + message vardir (404 page not found)(200 ok)(BODY gelir)

// Webe girerken HTML iner sonra icindeki webpageler icin de requestler akar.(ayni anda birsuru gider ama ayni anda gidenlerin sayisi limitli)

// ic ice callbackler callback hell

// hard to understand code = bad code
/////////////////////////////////////////////////
/*
const renderCountry = function (data, className = ``) {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML(`beforeend`, html);
  countriesContainer.style.opacity = 1;
};
const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open(`GET`, `https://restcountries.com/v2/name/${country}`);
  request.send(); // async sekilde yukleniyor direk datayi alabiliriz

  request.addEventListener(`load`, function () {
    const [data] = JSON.parse(this.responseText); // bu bi array oldugu icin datayi paranteze alion
    // renderCountry 1
    renderCountry(data);

    // Get neighbour country(2)
    const neighbour = data.borders[0];

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open(`GET`, `https://restcountries.com/v2/name/${neighbour}`); 
    request2.send(); // async sekilde yukleniyor direk datayi alabiliriz

    request2.addEventListener(`load`, function () {
      const [data2] = JSON.parse(this.responseText); // bu bi array oldugu icin data yi paranteze alion
      // renderCountry 1
      renderCountry(data2, `neighbour`);
    });
  });
};

getCountryAndNeighbour(`turkey`);
// fetch(`link`) ile de bilgiyi direk alabilirsin

// Promise = sonradan yuklenecek bir value icin bir temsil
const request = fetch(`https://restcountries.com/v2/name/turkey`); // Promise returnler.
console.log(request);
*/
// Callback hell yerine asyncde bunu kullaniriz ve daha iyi sonnuclar aliriz

// Promise ilk basta pending olur sonra settled olur sonra aldiysa fulfilled yoksa rejected olur.

// Promise fullfillediginde ya da rejectlendiginde farkli sonuclar cikarabiliriz(direk sonuc cikarmaz)
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response); // Gelen bilgi
      return response.json(); // Onu normal js arrayine cevirir ve promise returnler.
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};*/
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`); // verecegi error mesajini degistiriyor
      console.log(response);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      return fetch(`https://restcountries.com/v2/name/${neighbour}`); // Birsey returnledigimizda o value returnledigimiz seyin fulfilled valuesu olabilir
    })
    .then(res => res.json())
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong`); // Hata yakalarsa direk bunu yapar
    }) // promise returnler
    .finally(() => {
      countriesContainer.style.opacity = 1;
    }); // Bunu her turlu yapar
};

btn.addEventListener(`click`, function () {
  getCountryData(`turkey`);
});

getCountryData(`asdfaasdfasd123fsd`); // Boyle bi error verdiginde catch bunu farkli yakalamasi lazim buna farkli error vermesi lazim
// ama sitede 404 u yazmislar bu yuzden fetch bi return aldigi icin siteyi var zannediyor (fetch bi return aldigi her zaman siteyi var zannediyor.)
// bunu engellemek icin settingse {method: `GET`, headers:{Accept: `application/json`}} ya da const fetch = require(`node-fetch`) yazip da fetchi her turlu alir hale getirebilirsin. (node js de)
// Javascriptte de cozumu var ama uzun bosver
*/ /*
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders[0];
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`) // response returnler
    .then(response => {
      if (!response.ok)
        throw new Error(`Site dont return(Pricing policy may cause this)`); // site donmezse bunu verir

      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.country},${data.city.toLowerCase()}`);
      getCountryData(`${data.country}`);
    })
    .catch(err => console.log(`${err}`)); // internet giderse bunu verir
};

whereAmI(19.037, 72.873);

// Asyncronous calisma sekli (Ilk basta web API da img yuklenir ve yapilacak seyler de web api a girer sonra gereken kosullar saglandimi kod callback queue ye girer)(event loop global execution context bitince callback quedeki(fetchse microtasks queue(oncelikli)) seyleri ilk siradan baslayarak alir.)(js nin kendi zaman algisi yok)
*/ /*
console.log(`Test start`);
setTimeout(() => console.log(`0 sec timeout`), 0);
Promise.resolve(`Resolved promise 1`).then(res => console.log(res));
console.log(`Test end`);
*/
/*
// new Promise(function(resolve,reject){resolve(resolvevalue)reject(rejectvalue)})
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log(`Lottery is happening ⭕`);
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve(`You WIN 💵`);
    } else {
      reject(`You lost your money 📉`);
    }
  }, 5000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
}; // bekleme functionu

Promise.resolve(`abc`).then(x => console.log(x)); // resolveladiginda abc donduren bir promise
Promise.reject(`abc`).catch(x => console.log(`error`, x)); // rejecti abc
*/

// navigator.geolocation da asyncronous api
/*
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders[0];
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject); // resolve u position yapar rejecti de error
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Site dont return(Pricing policy may cause this)`); // site donmezse bunu verir

      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.country},${data.city.toLowerCase()}`);
      getCountryData(`${data.country}`);
    })
    .catch(err => console.log(`${err}`)); // internet giderse bunu verir
};
whereAmI();
*/ /*
const wait = function () {
  return new Promise(function (resolve) {
    setTimeout(resolve, 2000);
  });
};
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const imgElement = document.createElement(`img`);
    imgElement.src = `${imgPath}`;
    resolve(imgElement);
    reject(`Error`);
  }) // bilgiyi bekle gelirse bunu dondur gelmezse bunu dondur
    .then(res => body.insertAdjacentElement(`afterbegin`, res))
    .catch(err => console.log(err));
};

wait()
  .then(res => {
    createImage(`../img/img-1.jpg`);
    return wait();
  })
  .then(res => {
    const img = document.querySelector(`img`);
    img.remove();
    createImage(`../img/img-2.jpg`);
    return wait();
  })
  .then(res => {
    const img = document.querySelector(`img`);
    img.remove();
    createImage(`../img/img-3.jpg`);
    return wait();
  });
*/ /*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject); // resolve u position yapar rejecti de error
  });
};

// Arkaplanda promise in aynisi
// Promise i de variablemis gibi bekleyebilirsin
// asyncde bozulan kodlarin devamini getirir ama default birsuru error verir.
const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    // koddan sonra arkaplanda gerceklestirir

    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error(`Problem getting location data`); // 404 geldiginde de bilgi aliyor o yuzden bu sekilde error veririz
    const dataGeo = await resGeo.json();
    console.log(dataGeo);
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${dataGeo.state}`
    ); // gelen seyi bekleyip sonrakine gecer.
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    // bilgiyi alamadiginda bu erroru verir
    console.error(err.message);

    // Reject promise returned from async function
    throw err;
  }
};

(async function () {
  try {
    const c = await whereAmI();
    console.log(c);
  } catch (err) {
    console.log(err.message);
  }
  console.log(`yess`);
})();
*/ /*
try {
  let y = 1;
  const x = 2;
  x = 3;
} catch (err) {
  alert(err.message);
} // kodu dener ve error verirse soyler
// js normalde bozulan kodlarin devamini getirmez.
// kod syntax olarak sikintiliysa hic calistirmiyor
*/
// throw new Error try ve then kod blogunu calistirmayi birakir
// async function kendisi de promise returnler fullfulled value returnlenen value olur function bozulursa(promise rejected) undefined returnler.Finally her zeman en sonda returnlenir
// await sadece async function ile yapilir ama kendiliginden calisan functionlar ile functiona gerek uymuyor gibi yazabilirsin
// try catch block disindakiler kendiliginden calisir
/*
const get3Countries = async function (c1, c2, c3) {
  try {
    const [[data1], [data2], [data3]] = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}?fullText=true`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}?fullText=true`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}?fullText=true`),
    ]); // bir promise rejectlerse hepsini rejectler
    console.log(data1.capital, data2.capital, data3.capital);
  } catch (err) {
    console.log(err);
  }
};

get3Countries(`turkey`, `portugal`, `tanzania`);

//sirayla gerceklesir
//hepsini beraber calistirip ayni promise e alabilirsin
//promise o resolve sonucunu verdiginde resolvedaki seyi yapar.
//await de sadece function icinde kullanilir ve sonucunu verdiginde variable a kendini atar
//cunku kodun kalani calismaya devam eder sadece async funciton devam eder top levelde kullanirsan da tum kod durabilir
// error verirse de errorda ne gerekiyorsa o sonucu verir.

const func = async function () {
  const yarrak = await new Promise((resolve, reject) => resolve(`a`));
  console.log(yarrak);
};
func();

// Promise.race ilk gelen promise yarisi kazanir ve fulfillled value olur
// rejectlenen promise direk donecegi icin o kazanir ve error verir
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy?fullText=true`),
    getJSON(`https://restcountries.com/v3.1/name/egypt?fullText=true`),
    getJSON(`https://restcountries.com/v3.1/name/mexico?fullText=true`),
  ]);
  console.log(res[0]);
})();

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took to long!`));
    }, s * 1000);
  });
};

// 1 s gectikten sonra yuklenmezse timout kazanir ve error verir
Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/italy?fullText=true`),
  timeout(5),
]).then(r => console.log(r[0]));

// Promise.allSettled bir promise rejecterlerse oburlerini de returnler
// Promise.all gibi ama promise.all bir promise rejectlerse sikinti cikarir
// Promise sonunda returnlemezsen sadece value aldiginda dedigini yapar.
// a.addEventListener(`load`) ve (`error`) cok onemli
// .map methodu arrayi degistmirmez degismis olan arrayi returnler
Promise.allSettled([
  Promise.resolve(`asdf`),
  Promise.reject(`sa`),
  Promise.resolve(`asd`),
]).then(res => console.log(res));
*/
// Promise.any [ES2021] race gibi ama rejected promiseleri bosverir
/*
Promise.any([
  Promise.resolve(`asdf`),
  Promise.reject(`sa`),
  Promise.resolve(`asd`),
]).then(res => console.log(res));
*/
//Coding challenge 3
/////////////////////////////////////////////

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
*/

const wait = function () {
  return new Promise(function (resolve, _) {
    setTimeout(() => resolve(``), 2000);
  });
};
document.createElement(`img`);
/*
const loadNWait = async function (imgPath1, imgPath2, imgPath3) {
  try {
    await wait(); // biseye atamadan yaparsan resolve u atamadan functionu gerceklestirir
    const img1 = await new Promise(function (resolve, reject) {
      const a = document.createElement(`img`);
      a.src = `${imgPath1}`;

      a.addEventListener('load', function () {
        body.appendChild(a);
        resolve(a);
      });
      a.addEventListener('error', function () {
        reject(new Error('Image not found'));
      });
    });
    await wait();
    const img2 = await new Promise(function (resolve, reject) {
      const a = document.createElement(`img`);
      a.src = `${imgPath2}`;

      a.addEventListener('load', function () {
        let img = document.querySelector(`img`);
        body.removeChild(img);
        body.appendChild(a);
        resolve(a);
      });
      a.addEventListener('error', function () {
        reject(new Error('Image not found'));
      });
    });
    await wait();
    const img3 = await new Promise(function (resolve, reject) {
      const a = document.createElement(`img`);
      a.src = `${imgPath3}`;

      a.addEventListener('load', function () {
        let img = document.querySelector(`img`);
        body.removeChild(img);
        body.appendChild(a);
        resolve(a);
      });
      a.addEventListener('error', function () {
        reject(new Error('Image not found'));
      });
    });
  } catch (err) {
    console.log(err);
  }
};
*/
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      body.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

//loadNWait(`img/img-1.jpg`, `img/img-2.jpg`, `img/img-3.jpg`);
/*
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};
createImage(`asd`);
*/

const loadAll = async function (imgArr) {
  try {
    let imgs = await imgArr.map(async a => await createImage(a));
    imgs = await Promise.all(imgs);
    imgs.forEach(a => a.classList.add(`parallel`));
    imgs.forEach(a => a.classList.add(`images`));
    console.log(imgs);
  } catch (err) {
    console.log(err);
  }
};
loadAll([`img/img-1.jpg`, `img/img-2.jpg`, `img/img-3.jpg`]);

// promise returnleyen functionla mapleyince ilk basta sikinti cikiyor fakat
