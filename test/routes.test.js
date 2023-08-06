const request = require('supertest');
const cuteExpress = require('../src/cute-express');
const app = cuteExpress()

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API data response' });
});

describe('Get requests', () => {
    it('Handle GET requests', async () => {
        // Use supertest to make a GET request to /test
        const response = await request(app).get('/');

        // Assert that the response status code is 200
        expect(response.statusCode).toBe(200);

        // Assert the Content-Type header
        expect(response.headers['content-type']).toBe('application/json');

        // Assert that the response body matches the expected value
        expect(response._body.message).toBe('API data response');
    });
});