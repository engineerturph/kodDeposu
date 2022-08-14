'use strict';

// bunu yazinca alttaki laneyi prettier ignorelar
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// User storieslerden (userin yapacagi seylerden) featureslari(ozellikler) ordan da flowchartlari olusturursun oradan da architecture olusturursun

// User story =  As a [type of user] i want [an action] so that [a benefit]

// Features = Eklenecek seyler

// Flowchart = Olay orgusu (page load ile baslar)

// Architecture = Kodlari belirleyip ona gore architecture yaparsin (daha bitmedi devam ediyor)

// Bu scriptten once calisan kodlardaki tum global variablelar kullanilabilir

// Architecture da kodla neler yapacagini cizersin
// Tum functionlari classa ozellik olarak eklersin guzel olur.
// Element eklemeden once event listener eklemek icin parent elemente ekleyebilirsin(event delegation)
class Workout {
  date = new Date(); // constructor icinde this.date = adsfs seklinde de yazilabilir
  id = (Date.now() + ``).slice(-10);
  clicks = 0;
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat,lng]
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}
    `;
  }

  _click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = `running`;
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = `cycling`;
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

///////////////////////////////////////////
// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 5.2, 24, 178);
// console.log(run1, cycling1);
class App {
  #map;
  #mapZoom = 13;
  #mapEvent;
  #workouts = [];
  constructor() {
    // ilk object kuruldugunda belirli functionlari calistiriyor.
    // Get user's position
    this._getPosition();

    // Get data from localstorage

    // Event handlers
    form.addEventListener(`submit`, this._newWorkout.bind(this));
    inputType.addEventListener(`change`, this._toggleElevationField);
    containerWorkouts.addEventListener(`click`, this._moveToPopup.bind(this));

    this._getLocalStorage();
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      // bu kismi set timeout gibi arkaplanda gec calistiriyor bu yuzden bunla ilgili kodlari basta yazarsan sikinti cikiyor
      this._loadMap.bind(this),

      function () {
        alert(`Could not get your position`);
      }
    );
  }

  _loadMap(pos) {
    const { latitude, longitude } = pos.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#mapZoom);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coords, { riseOnHover: true })
      .addTo(this.#map)
      .bindPopup('Starting point');

    this.#map.on(`click`, this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work); // calismiyor cunku map kod calistiktan sonra yukleniyor
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove(`hidden`);
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        ``;
    form.style.display = `none`;
    form.classList.add(`hidden`);
    setTimeout(() => (form.style.display = `grid`), 200);
  }
  _toggleElevationField() {
    inputElevation.closest(`.form__row`).classList.toggle(`form__row--hidden`);
    inputCadence.closest(`.form__row`).classList.toggle(`form__row--hidden`);
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp)); // Hepsi true ise true dondurur

    const positiveInputs = (...inputs) => inputs.every(inp => inp >= 0);

    e.preventDefault();
    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    // If workout running, create running
    if (type === `running`) {
      // Check if data is valid
      const cadence = +inputCadence.value;
      workout = new Running([lat, lng], distance, duration, cadence);
      if (
        !validInputs(distance, duration, cadence) ||
        !positiveInputs(distance, duration, cadence)
      )
        return alert(`Inputs have to be positive numbers!`);
    }
    // If workout cycling, create cycling
    if (type === `cycling`) {
      const elevation = +inputElevation.value;
      workout = new Cycling([lat, lng], distance, duration, elevation);
      if (
        !validInputs(distance, duration, elevation) ||
        !positiveInputs(distance, duration)
      )
        return alert(`Inputs have to be positive numbers!`);
    }
    // Add new object to workout array
    this.#workouts.push(workout);
    // Render workout marker
    this._renderWorkoutMarker(workout);
    // Render workout on list
    this._renderWorkout(workout);
    // Clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === `running` ? `🏃‍♀️` : `🚴‍♀️`} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === `running` ? `🏃‍♀️` : `🚴‍♀️`
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>
    `;

    if (workout.type === `running`)
      html += `<div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">${workout.pace.toFixed(2)}</span>
    <span class="workout__unit">min/km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">🦶🏼</span>
    <span class="workout__value">${workout.cadence}</span>
    <span class="workout__unit">spm</span>
  </div>
</li>`;
    if (workout.type === `cycling`)
      html += `<div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">${workout.speed.toFixed(2)}</span>
    <span class="workout__unit">km/h</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⛰</span>
    <span class="workout__value">${workout.elevationGain}</span>
    <span class="workout__unit">m</span>
  </div>
</li>`;
    form.insertAdjacentHTML(`afterend`, html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest(`.workout`); //.closest parentlerine sirayla bakar ve uyan elementi returnler
    if (!workoutEl) return; // calismadigi durumu yapip error verip diger seyleri yazmak daha hos

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoom, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    // workout._click(); // baska objectten baska objectin seylerine ulasabiliriz
  }

  _setLocalStorage() {
    localStorage.setItem(`workouts`, JSON.stringify(this.#workouts)); //kucuk seyler kullanmak lazim depolarken
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem(`workouts`));
    console.log(data);

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
      // this._renderWorkoutMarker(work); // calismiyor cunku map kod calistiktan sonra yukleniyor
    });
  }

  reset() {
    localStorage.removeItem(`workouts`);
    location.reload(); // location browser icin methodlar iceren buyuk bir object
  }
}

const app = new App();

// JSON.stringify ile istedigin objecti stringe cevirebilirsin
// application tabdan local storage a ulasabilirsin
// Local storage kullaninca prototype chain gidiyor :()

// Eklenebilir fikirler : edit a workout/delete a workout/delete all workouts/sort workouts
// Re build Running ve cycling objects
// More realistic error ve confirmation messages
// Ability to position the map to show all workouts(very hard)
// Ability to draw lines and shapes instead of just points(very hard)
// Geocode location from coordinates (`Run in Faro Portugal`) (after async)
// Display weather data for workout time and place (after async)
