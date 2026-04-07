import fetchData from './utils/fetch-data';
import "regenerator-runtime/runtime.js";

export default class CurrencyComparison {
  constructor(salary) {
    this.salary = salary
  }
  fetchCurrentExchange = async () => {
    return await fetchData().then(res => {
      return [res.data.rates, res.status]
    })
  }
  currencyConversion = (rates, currency) => {
    return +(rates[`${currency}`]).toFixed(2)
  }
  hourlyPayUSD = (exchangeRate) => {
    const usdSalaryEqual = 1/exchangeRate * this.salary
    const weeklySalary = usdSalaryEqual / 50 //assuming 50 work weeks a year
    return +(weeklySalary / 40).toFixed(2) //assuming 40 hour work weeks
  }
  response = (currency, exchangeRate, useData) => {
    const hourlyPayComparison = {
      salary: this.salary,
      USD: this.hourlyPayUSD(1)
    }
    hourlyPayComparison[`${currency}`] = this.hourlyPayUSD(exchangeRate)//sets a new key This is called dynamic property assignment or computed property name in JavaScript

    return useData(hourlyPayComparison, currency) // this is the callback function passing values to the instance call back function. return useData(hourlyPayComparison, currency) is calling the callback function you provided (the instance callback), and passing those values to it. This is how the data gets from the method to your callback
  }
}
