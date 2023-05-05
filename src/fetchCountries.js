export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';
  const END_POINT = '/name';
  const PARAMS = new URLSearchParams({
    name,
    capital,
    population,
    flags,
    languages,
  });

  const url = BASE_URL + END_POINT + PARAMS;

  return fetch(url).then(res=>{
    if(!res.ok){
        throw new Error(res.status);
    }
    return res.json();
  });
}
