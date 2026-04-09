const fetchData = jest.fn(()=> {
  return Promise.resolve({
    status: "Mock",
  data: {
    rates: {}
  }
  })
})

export default fetchData;