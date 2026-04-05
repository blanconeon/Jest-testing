const httpRequest = jest.fn(() => {
  return Promise.resolve({
    status: "", 
    data:{}
  });
})

export default httpRequest;

// note this muck empty object structure must match whats expected from the actual API