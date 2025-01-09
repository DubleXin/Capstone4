export default class ApiUrlGenerator {
  static #urlMap = new Map([
    ['BTC', 'BTC-USD'],
    ['UNI', 'UNI-USD'],
    ['ETH', 'ETH-USD'],
    ['DOGE', 'DOGE-USD'],
    ['ALGO', 'ALGO-USD'],
  ]);
  static getUrl(symbol) {
    if (ApiUrlGenerator.#urlMap.has(symbol))
      return ApiUrlGenerator.#urlMap.get(symbol);
    console.warn('Api does npt provide data for the symbol: ', symbol);
    return '';
  }
}
