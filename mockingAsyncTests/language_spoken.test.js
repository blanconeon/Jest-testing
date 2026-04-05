import httpRequest from './utils/http-request.js';// import real httpRequest
jest.mock('./utils/http-request');

//jest.mock('./utils/http-request'); tells Jest to mock the module at that path. Jest then looks for a mock version in utils/__mocks__/http-request.js automatically. You never write the path to the __mocks__ folder in your import or mock statement.

import {
  capitalize,
  getAlpha2Code,
  countryExtractor,
  countryListLookup,
  getResponse
} from "./language_spoken.js";

// TODO: Import and mock httpRequest

it("converts array of country data objects to array of countries", () => {
  //arrange
  const inputObject = [
    {name: "Argentina", capital: "Buenos Aires"},
    {name: "Belize", capital: "Belmopan"},
    {name: "Bolivia", capital: "Sucre"}
  ];
  const expectedValue = ["Argentina","Belize","Bolivia"];
  
  //act
  const actualValue = countryExtractor(inputObject);
  
  //assert
  expect(actualValue).toEqual(expectedValue);
  expect(actualValue[0]).toBe("Argentina");
  expect(actualValue).toContain("Belize");
  expect(actualValue[2] === "Bolivia").toBeTruthy();
  expect(actualValue[3]).not.toBeDefined();
});

it("correctly fetches a list of countries",  async () => {
  //arrange
  const inputLanguageCode = "jest";
  const expectedValue ="CodeLand";
  const resolvedValue = {
    status: 'MOCK',
    data: [
      { name: "CodeLand", capital: "Codecademy" },
    ]
  };
  // TODO: Mock the first resolved value of httpRequest
   httpRequest.mockResolvedValueOnce(resolvedValue); // this code automatically replaces the httpRequest inside countryListLookup and returns resolvedValue.
  //act
  const actualValue = await countryListLookup(inputLanguageCode);
  //assert
  expect(actualValue).toContain(expectedValue);
});


//Remember coverage in the terminal: npm test -- --coverage   these are called: CLI flags (or command-line options) 