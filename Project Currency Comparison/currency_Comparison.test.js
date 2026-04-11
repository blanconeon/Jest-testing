import CurrencyComparison from './currency_comparison';
import fetchData from "./utils/fetch-data.js.";
// Task 10: Import and mock fetchData

const testSalary = new CurrencyComparison(50000)
    
// Task 1: Create a test for testSalary.currencyConversion below
it ("returns exchange rate for USD in 2 decimal points", () => {
//arrange 
const currencyCode1 = 'CAD'
const expectedValue1 = 1.21
const currencyCode2 = 'EUR'
const expectedValue2 = .82
const rates = {
  "MXN": 19.9021,
  "CAD": 1.2121, 
  "EUR": .8235  
}

// Act
const actualValue1 = testSalary.currencyConversion(rates, currencyCode1);
const actualValue2 = testSalary.currencyConversion(rates, currencyCode2);
//assertions  & matcher Functions from Jest, for example .toEqual
expect(actualValue1).toBe(expectedValue1);
expect(actualValue2).toBe(expectedValue2);


})

// Task 5: Create a test for testSalary.hourlyPayUSD below
it ("accepts a conversion rate and returns the hourly pay in USD converted using that rate", ()=> {
//arrange
const rateCad = 1.21;
const expectedValueFromCad =  20.66;
const rateEur = .8235;
const expectedValueFromEur = 30.36;
// Act
const actualValueFromCad = testSalary.hourlyPayUSD(rateCad);
const actualValueFromEur = testSalary.hourlyPayUSD(rateEur);

//assertions  & matcher Functions from Jest, for example .toEqual
expect(actualValueFromCad).toBe(expectedValueFromCad);
expect(actualValueFromEur).toBe(expectedValueFromEur);

})


// Task 6: Complete this test!
it("Respond with different salaries based on currency", (done) => {
  //arrange
  const currency = "CAD"
  const exchangeRate = 1.21
  const expectedValue = {
    USD: 25,
    CAD: 20.66,
    salary: 50000,
  }
  //act
  testSalary.response(currency, exchangeRate, (result, currency) => { //currency is not needed for the test only result "hourlyPayComparison"
  try {
   //assertions  & matcher Functions from Jest, for example .toEqual
   expect(result).toEqual(expectedValue);
   ////rememeber The matcher .toBe() checks for strict equality (same object in memory), but you want to check if the objects have the same properties and values..toEqual() does that
   done();
  } catch (error) {
    done(error);
  }   
  });
});

   /* You are correct, `.response` itself is not asynchronous—it does not return a Promise or use `async/await`. However, it **uses a callback**, and in testing, callbacks can sometimes cause timing issues if not handled properly.

The use of `done` and `try...catch` in the test is a precaution to ensure that:
- If an assertion fails inside the callback, the error is caught and passed to Jest using `done(error)`.
- This helps Jest know when the test is finished and if it failed, even though the method is not truly asynchronous.

So, while `.response` is not async, the test uses this pattern to safely handle errors in callback-based code.*/

// Task 10 & 11: Complete this test!
it("Receives current currency exchange data", async ()=>{
  //arrange
  const mockResponse = {
    status : "Mock",
    data: {
      "base": "USD",
      "rates": {
        "CCD": 50, //CCD just represents a sample currency code in reality we would egt all the rates.
      },
      "date": "2021-05-17"
    }
  }
  const expectedValue = [{"CCD": 50}, "Mock"];

  // Mock the resolved value of fetchData
  fetchData.mockResolvedValueOnce(mockResponse); // this code automatically replaces the fetchData inside fetchCurrentExchange and returns expectedValue.
  
  //act
  const actualValue = await testSalary.fetchCurrentExchange() 
  
  //assert
 expect(expectedValue).toEqual(actualValue);
})


/* The mockResponse and expectedValue are not supposed to be identical. Here’s why:

mockResponse is the full response returned by your mocked fetchData function.
expectedValue is what your fetchCurrentExchange() method returns.
Inside fetchCurrentExchange(), the code does this:

return await fetchData().then(res => {
  return [res.data.rates, res.status]
})

Copy code

So, it takes the rates object from res.data and the status from res, and returns them as an array:

[res.data.rates, res.status]

Copy code

That’s why expectedValue is [{"CCD": 50}, "Mock"]—it matches the structure returned by fetchCurrentExchange(), not the full mock response.





That’s a good observation. The `fetchCurrentExchange` method itself does **not** use the `salary` value stored in `testSalary`. It only fetches exchange rates and status.

However, it is still a method of the `CurrencyComparison` class, which means it is available to any instance, including `testSalary`. The relevance is that `fetchCurrentExchange` provides the exchange rates, which can then be used by other methods in the same instance (like `currencyConversion` or `hourlyPayUSD`) that **do** use the salary.

So, while `fetchCurrentExchange` does not use the salary directly, it is part of the workflow for currency comparison in the `CurrencyComparison` class. The test is just checking that this method returns the correct structure, not that it uses the salary.





async await normally handles errors, therefore in a test no need for try catch. however:

In regular API calls, developers often use `try...catch` with `async/await` to handle errors gracefully. This allows them to manage what happens if the request fails, such as showing an error message or retrying the request.

Example:
```js
async function getData() {
  try {
    const response = await fetchData();
    // handle successful response
  } catch (error) {
    // handle error, e.g., show a message or log it
  }
}
```

This pattern is common in real applications to ensure errors are managed and users get feedback if something goes wrong.





*/




