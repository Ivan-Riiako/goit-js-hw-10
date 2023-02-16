import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
  inputCountry: document.querySelector('input#search-box'),
  outputListCountri: document.querySelector('ul.country-list'),
  outputOneCountri: document.querySelector('div.country-info'),
};

refs.inputCountry.addEventListener(
  'input',
    debounce(onFeachInput, DEBOUNCE_DELAY)
);
function onFeachInput() {
    const inputValue = refs.inputCountry.value.trim();
    fetchCountries(inputValue)
      .then(users => renderCountriesList(users))
      .catch(error =>
        Notify.failure("Oops, there is no country with that name")
      );
}






function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderCountriesList(countries) {
    if (countries.length === 1) {
const languages=Object.values(countries[0].languages).join(', ');
// console.log(languages);
        const markup =
`<h3><img src="${countries[0].flags.svg}" alt="${countries[0].name.official}" height="30"  width="35">
${countries[0].name.official}</h3>
      <p>Capital: ${countries[0].capital}</p>
      <p>Population: ${countries[0].population}</p>
      <p>Languages: ${languages}</p>`;

      refs.outputListCountri.innerHTML = markup;
    } else {
        const markupList =
            countries
        .map(countri => {
          return `<li class='li-countri'>
          <img src="${countri.flags.svg}" alt="${countri.name.official}" height="30"  width="35">
<p>${countri.name.official}</p>
        </li>`;
        })
        .join('');
      refs.outputListCountri.innerHTML = markupList;
    }
}



// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков