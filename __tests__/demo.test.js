require('dotenv').config();
const supertest = require("supertest");
const app = require("../server/demo");

/**
 * This is a test case for the GET request to the '/info' endpoint of a chat microservice built using the OpenAI API `createChatCompletion`. 
 * The test checks if the response status is 200 and if the response body contains a JSON object with the key 'info' and the corresponding value 'This is a Chat Microservice built using the OpenAI API `createChatCompletion`'. 
 * */
describe('GET /info endpoint', () => {
  it('should respond with status 200 and JSON containing the info message', async () => {
    const res = await supertest(app).get('/info');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ info: 'This is a Chat Microservice built using the OpenAI API `createChatCompletion`' });
  });
});

/**
 * This is a test case for the POST request to the '/inputMsg' endpoint of a chat microservice built using the OpenAI API `createChatCompletion`. 
 * */
describe('POST /inputMsg endpoint', () => {
  it('should respond with status 200 and JSON containing the response data', async () => {
    const requestBody = {
      parcel: 'Hello'
    };
    const expectedResponse = {
      prompt: 'Hello',
      status: 'recieved',
      created: expect.any(Number),
      message: 'Hello there, how may I assist you today',
      total_tokens: 0,
      _id: expect.any(String)
    };
    const res = await supertest(app)
      .post('/inputMsg')
      .send(requestBody)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body).toEqual(expectedResponse);
  });

  it('should respond with status 400 if parcel is missing', async () => {
    const requestBody = {};
    const expectedResponse = {
      status: 'failed'
    };
    const res = await supertest(app)
      .post('/inputMsg')
      .send(requestBody)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(res.body).toEqual(expectedResponse);
  });
});
