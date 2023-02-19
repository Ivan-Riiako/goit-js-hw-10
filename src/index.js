import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

import { fetchCountries } from './fetchCountries'

const DEBOUNCE_DELAY = 300;
const refs = {
  inputCountry: document.querySelector('input#search-box'),
  outputListCountri: document.querySelector('ul.country-list'),
  outputOneCountri: document.querySelector('div.country-info'),
};

refs.inputCountry.addEventListener(
  'input',
    debounce(onChangeInput, DEBOUNCE_DELAY)
);

function onChangeInput() {
  const inputValue = refs.inputCountry.value.trim();
  if (inputValue === '') {
    cleanMarkup();
    return;
  }
  fetchCountries(inputValue)
    .then(quantityСheck)
    .then(renderCountriesList)
    .catch(Notify.info);
}


function quantityСheck(arrContries) {
  if (arrContries.length === 0) {
  return}
    if (arrContries.length > 10) {
      throw 'Too many matches found. Please enter a more specific name.';
    }
  return arrContries;
};

function cleanMarkup() {
  if (refs.outputListCountri.innerHTML === '' 
  ) {
    refs.outputOneCountri.innerHTML = '';
  } else if (
    refs.outputOneCountri.innerHTML === '' 
  ) {
    refs.outputListCountri.innerHTML = '';
  }
}



function renderCountriesList(countries) {
 
  if (countries.length === 1) {
      cleanMarkup()
      const languages = Object.values(countries[0].languages).join(', ');
      const markupCountri = `<h3><img src="${countries[0].flags.svg}" alt="${countries[0].flags.alt}" height="30"  width="35">
${countries[0].name.official}</h3>
      <p>Capital: ${countries[0].capital}</p>
      <p>Population: ${countries[0].population}</p>
      <p>Languages: ${languages}</p>`;

      refs.outputOneCountri.innerHTML = markupCountri;
  } else {
    cleanMarkup();
      const markupListcCountries = countries
        .map(countri =>
          `<li class='li-countri'>
          <img src="${countri.flags.svg}" alt="${countri.flags.alt}" height="30"  width="35">
<p>${countri.name.official}</p>
        </li>`
        ).join('');
      refs.outputListCountri.innerHTML = markupListcCountries;
    }
}

// 'Oops, there is no country with that name'
// 'Too many matches found. Please enter a more specific name.'
// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков