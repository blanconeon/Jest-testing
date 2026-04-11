export default {
  get: () => {
    const res = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
      status: 200,
      data: {
        "base": "USD",
        "rates": {
          "MXN": 19.9021,
          "CAD": 1.2121, 
          "EUR": .8235  
        },
        "date": new Date().toISOString()
      }
    })
      }, 3000) 
    })
    return res
  }      
}

/* The `axios` function in your code is a mock version of the real Axios library. Here’s how it works:

- It has a `get` method that simulates making an HTTP GET request.
- When you call `axios.get()`, it returns a Promise.
- After a short delay (using `setTimeout`), the Promise resolves with an object that looks like a real API response:
  - `status`: the HTTP status code (e.g., 200)
  - `data`: an object with currency rates and other info

Example:
```js
axios.get('some-url').then(response => {
  // response.status is 200
  // response.data.rates contains the currency rates
});
```

This lets you test your code without making real network requests. The structure matches what your code expects from a real API.


Axios is a popular JavaScript library used to make HTTP requests from the browser or Node.js. It helps you send and receive data from APIs easily. Axios returns Promises, making it simple to handle asynchronous requests.

For example, you can use Axios to get data from a server like this:
```js
import axios from 'axios';

axios.get('https://api.example.com/data')
  .then(response => {
    // response.data contains the data from the server
  });
```

It is widely used because it is easy to use, supports Promises, and works in both browsers and Node.js.



*/