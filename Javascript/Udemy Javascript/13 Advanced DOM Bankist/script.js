'use strict';

///////////////////////////////////////
window.scroll({
  top: 0,
  left: 0,
  behavior: 'smooth',
});
// Modal window
const header = document.querySelector(`.header__title`);
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);
const nav = document.querySelector(`.nav`);
const allSections = document.querySelectorAll(`.section`);

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(b => b.addEventListener(`click`, openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button scrolling
btnScrollTo.addEventListener(`click`, function (e) {
  /*const s1coords = section1.getBoundingClientRect();
  
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect()); // kaydirdigin yere gore nerede oldugu

  console.log(`Current scroll (X/Y)`, window.pageXOffset, window.pageYOffset); // ne kadar kaydirdigin

  console.log(`height/width viewport`, document.documentElement.clientHeight); // gorunen yer*/

  /*Scrolling
    window.scrollTo(
      s1coords.left + window.pageXOffset,  // kaydirdigin yere gore az asagiya cektigi icin cektigin kismi da eklion
      s1coords.top + window.pageYOffset
    );
  });
  Boyle de olur
  window.scrollTo({
    left: s1coords.left + window.pageXOffset, // bu sekilde object olusturarak da yapabilirsin
    top: s1coords.top + window.pageYOffset,
    behavior: `smooth`,
  });*/

  section1.scrollIntoView({ behavior: `smooth` }); // bu sekilde easy sekilde de yapabilirsin
});

// Page navigation
document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  console.log(e);
  // Matching child elements
  if (e.target.classList.contains(`nav__link`)) {
    e.preventDefault();
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

// Tabbed component

tabsContainer.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.operations__tab`);
  // Guard clause
  if (!clicked) return;
  // Activate tab animation
  tabs.forEach(function (el) {
    el.classList.remove(`operations__tab--active`);
  });
  clicked.classList.add(`operations__tab--active`);
  // Getting content area
  tabsContent.forEach(function (el) {
    el.classList.remove(`operations__content--active`);
  });
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains(`nav__link`)) {
    const topic = e.target;
    const siblings = topic.closest(`.nav`).querySelectorAll(`.nav__link`);
    siblings.forEach(el => {
      if (el !== topic) {
        el.style.opacity = this;
      }
    });
  }
};

// Passing arg(function olusturup onun icine yazarak da function ekleyebilirsin)
nav.addEventListener(`mouseover`, handleHover.bind(0.5));
nav.addEventListener(`mouseout`, handleHover.bind(1));
// e yi sadece function(e) olan bi functionla alabilirsin sadece 1 argumenti olur(this) birden fazla argumenti olsun istiyorsan argumente array eklersin

// Sticky navigation
/*
const initialCoords = header.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener(`scroll`, function () {
  if (window.scrollY > initialCoords.bottom) nav.classList.add(`sticky`);
  else nav.classList.remove(`sticky`);
});// scroll sikinti kasma yapiyor*/
// Sticky navigation: Intersection Observer API
/*
const obsFunc = function (entries, observer) {
  entries.forEach(entry => {
    nav.classList.toggle(`sticky`);
    console.log(`a`);
  });
};
const obsOptions = {
  root: null, //gorunen kisma gore calistirir
  threshold: [0, 0.2], // section 1 0.1 kadar gozukurse function calisir.array eklersen 2 thresholdda da calisir
};
const observer = new IntersectionObserver(obsFunc, obsOptions);
observer.observe(section1); 
*/
// Harbi Sticky nav

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  // entries icinde tek eleman olan bir array
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add(`sticky`);
  } else {
    nav.classList.remove(`sticky`);
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // rootun baslayacagi yere eklenen pixel
});
headerObserver.observe(header);

// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove(`section--hidden`);
  observer.unobserve(entry.target); //observe i kaldirir
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  section.classList.add(`section--hidden`);
  sectionObserver.observe(section);
});
// Lazy loading images (helps performance)
const imgs = document.querySelectorAll(`img[data-src]`); // icinde data-src propertiesi olan imgleri alir
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  //Yeni loadi yaptiginda yapacagi seyler
  entry.target.addEventListener(`load`, function (e) {
    entry.target.classList.remove(`lazy-img`);

    observer.unobserve(entry.target);
  }); // Js icinde yeni bise loadlarken burda eventi dinleyebiliyorsun
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  treshold: 0,
  rootMargin: `200px`,
});

imgs.forEach(img => imgObserver.observe(img));

/// Slider
const sliderFunc = function () {
  // Slidelar aslinda yanda ama gostermion
  const slides = document.querySelectorAll(`.slide`);
  const btnLeft = document.querySelector(`.slider__btn--left`);
  const btnRight = document.querySelector(`.slider__btn--right`);
  const slider = document.querySelector(`.slider`);
  const dotContainer = document.querySelector(`.dots`);

  // Functions
  // CreateDots func
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Dots' animation
  const activateDot = function (slide) {
    document
      .querySelectorAll(`.dots__dot`)
      .forEach(dot => dot.classList.remove(`dots__dot--active`));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add(`dots__dot--active`);
  };

  // Defining curSlide and max slide
  let curSlide = 0;
  const maxSlide = slides.forEach;

  // Mod function
  Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
  };

  // Slide function
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  //Resetting slide position

  // Next slide
  const nextSlide = function () {
    curSlide++;

    goToSlide(curSlide.mod(slides.length));
    activateDot(curSlide);
  };

  // Previous slide
  const prevSlide = function () {
    curSlide--;
    goToSlide(curSlide.mod(slides.length));
    activateDot(curSlide);
  };

  //Init
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();
  // Button listeners
  btnLeft.addEventListener(`click`, prevSlide);
  btnRight.addEventListener(`click`, nextSlide);

  // Key listeners
  document.addEventListener(`keydown`, function (e) {
    if (e.key === `ArrowLeft`) prevSlide();
    e.key === `ArrowRight` && nextSlide();
  });

  // Dot listeners

  dotContainer.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`dots__dot`)) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
sliderFunc();

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// Consoleda agdan hizlara gore deneme yapabilirsin

// //Node yapisi htmlde oldugu hali degil DOM API a geldigi hali geldigi hali

// // Inheritance :  Bir child api parent node un tum ozelliklerine erisebilir.

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector(`.header`);
// const allSections = document.querySelectorAll(`.section`); // icinde bise silersen
// // silinmemis halini returnler
// console.log(allSections);

// console.log(document.getElementById(`section--1`));
// console.log(document.getElementsByTagName(`button`)); //  tage gore returnler
// // (HTMLCollection olarak ve silinen buttona felan gore returnler)

// document.getElementsByClassName(`btn`); // HTMLCollection

// // Creating and inserting elements
// // .insertAdjacentHTML (inserting de guzel)

// // Creating
// const message = document.createElement(`div`);
// message.classList.add(`cookie-message`);
// // message.textContent = `We use cookies for improved functionality and analytics`
// message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn
// btn--close-cookie">Got it!</button>`;

// header.append(message);

// // Styles
// message.style.backgroundColor = `#37383d`;
// message.style.width = `120%`;

// console.log(message.style.height); // css de sakli stylelari alamassin ama js de ayarladikarini alabilirsin
// console.log(getComputedStyle(message).height); // bu sekilde alabilrisin

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) * 1.3 + `px`;

// document.documentElement.style.setProperty(`--color-primary`, `orangered`); // cssde default renkleri documente atarsin ve sonra bunla degistirebilirsin

// // Attributes

// const logo = document.querySelector(`.nav__logo`);
// console.log(logo.alt);
// console.log(logo.src); // linki alir
// console.log(logo.className);
// logo.alt = `adfas`;

// // Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute(`designer`));
// logo.setAttribute(`company`, `batarya`);

// console.log(logo.getAttribute(`src`)); // direk yazani alir

// const link = document.querySelector(`.twitter-link`);
// console.log(link.href);

// // Data attributes
// console.log(logo.dataset.versionNumber); // data-version-number seklinde yazarsin htmle

// // Classes
// logo.classList.add(`c`);
// logo.classList.remove(`c`);
// logo.classList.toggle(`c`);
// logo.classList.contains(`c`);

// // Don't use
// logo.className = `jonas`; // tum classlari siler ve 1 class acar

/*
const h1 = document.querySelector(`h1`);

const alertH1 = function (e) {
  alert(`asfdasdfasaf`);
  h1.removeEventListener(`mouseenter`, alertH1); // event listeneri kaldirir ve event
  //listener sadece 1 kere calisir
};
h1.addEventListener(`mouseenter`, alertH1);
// fare girince calisir

https://developer.mozilla.org/en-US/docs/Web/Events

h1.onmouseenter = function () {
  alert(`asdfas`);}

setTimeout(() => h1.removeEventListener(`mouseenter`, alertH1), 3000)

<h1 onclick="alert('HTML alert')"> ile html uzerinden de event listener ekleyebilirsin

// eventleri document alir ve targetine iletir(hepsinde deil)(capturing phase) sonra target geri documente iletir(bubbling phase)ve olayi gerceklestirir
// href = #afsafda ile istedigin elemente yonlendirebilirsin
// childa tiklarsan parente de tiklarsin

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());

document.querySelector(`.nav__link`).addEventListener(`click`, function () {
  this.style.backgroundColor = randomColor();
  console.log(`b`);
});

document.querySelector(`.nav__links`).addEventListener(
  `click`,
  function () {
    this.style.backgroundColor = randomColor();
    console.log(`a`);
  },
  true
); 
// event listener normalde capturing phase i yok sayar ama sonuna true eklersen sadece capturingi alir. (bu yuzden true yazdiklarini ilk gerceklestirir)

//  e.currentTarget =  eventi taktigin yer

//  e. target =  tikladigin yer

const a = document.querySelector(`header >:not(.nav)`); // .nav disinda header icindeki tum elementleri alma kodu

a.addEventListener(`click`, function () {
  this.style.backgroundColor = randomColor();
});

a.style.width = `100%`;

const b = getComputedStyle(a).width
*/

// elementte de querySelector var

// element.childNodes ile cocuk nodelarini element.children ile htmllerini alabilirsin

// element.lastElementChild ile de son elementi secersin firstle basdakini secersin

// parentNode ile parentElement ile de ustunu alirsin

// el.closest en yakindakini returnler

// el.previous(next)ElementSibling ile kardesini alabilirsin Elementi silersen node returnler

// tabler var ve hepsinin kendi contentleri var
/*
const h1 = document.querySelector(`h1`);

console.log(h1.children);
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest(`.header`);
*/

// event listenerde dom contentinin(html kismi) yukenmesini de dinleyebilirsin (agdan da bakabilirsin ne zaman yuklenior)
// load event de dinleyebilirsin (hepsinin yuklenmesini) (agdan da bakabilirsin)

// beforeunload ile cikmayi da dinleyebilirsin (e.preventdefault ile bazi explorerda sikinti cikarmasini saglarsin)(e.returnValue = `` yazarsin ve genel bi message cikar)
