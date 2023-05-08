import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

searchInput.addEventListener('input',debounce(onInput,DEBOUNCE_DELAY));

function onInput(e){
const searchCountry = e.target.value.trim();
if(searchCountry === ''){
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    return;
}

fetchCountries(searchCountry)
.then(country => {
    console.log(country);
    if (country.length > 10){
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    } 
    
    if (country.length >= 2 && country.length <= 10){
        countryList.innerHTML = renderCountryList(country);
        countryInfo.innerHTML = "";
    } 
    if (country.length === 1){
        countryList.innerHTML = "";
        countryInfo.innerHTML = renderCountryInfo(country);
    }
})
.catch(error => {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    return error;
});
}

function renderCountryList(country){
return country
.map(({name, flags}) => {
    return`
    <li class="country-item list">
    <img class="country-list-flags" src="${flags.svg}" alt="${name.official}" width="200">
    <h2 class="country-list-name">${name.official}</h2>
    </li>
    `
})
.join('');

}

function renderCountryInfo(country){
    console.log(country);
    return country
    .map(({name,capital,population,flags,languages}) => {
        return `
        <div class="container">
        <img class="country-flag" src="${flags.svg}" alt="${name.official}" width="200">
        <h2 class="country-title">${name.official}</h2>
        </div>
        <div class="container-info">
        <ul class="list">
        <li>${capital}</li>
        <li>${population}</li>
        <li>${Object.values(languages)}</li>
        </ul>
        </div>
        `
    })
    .join('');
}