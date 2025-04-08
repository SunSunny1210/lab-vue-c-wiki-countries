export async function fetchCountries() {
    try {
        const response = await fetch('https://ih-countries-api.herokuapp.com/countries');
        const countries = await response.json();
        
        if (countries) {
            return countries
        } else {
            return []
        }
    } catch (error) {
    console.error(error)
    return []
    }
}