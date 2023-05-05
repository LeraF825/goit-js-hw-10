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
e.preventDefault();
let searchCountry = searchInput.value;
console.log(searchCountry)
}