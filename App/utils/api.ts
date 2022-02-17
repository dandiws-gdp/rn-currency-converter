export default {
  BASE_URL: 'https://api.frankfurter.app',
  latestRates(base = 'USD') {
    return fetch(`${this.BASE_URL}/latest?from=${base}`).then((res) => res.json())
  }
}
