export { fetchCountries };

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,population,languages`
  )
    .then(response => {
      if (!response.ok) {
        // Notify.failure('Oops, there is no country with that name');
        throw 'Oops, there is no country with that name';
        }
        
      return response.json();
    })
    
}