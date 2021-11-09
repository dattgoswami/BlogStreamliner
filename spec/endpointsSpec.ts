import supertest from 'supertest';
import app from '../src/server';

const request = supertest(app);

describe('endpoint response test suite', () => {
  it('get ping', async () => {
    const response = await request.get('/api/ping');
    const result = { success: true };
    expect(response.status).toBe(200);
    expect(response.body).toEqual(result);
  });
  it('get posts without sort by and direction', async () => {
    const response = await request.get('/api/posts/?tag=tech,history');
    expect(response.status).toBe(200);
    expect(response.body.posts.length).toEqual(46);
  });
  it('get posts with sortby and without direction', async () => {
    const response = await request.get('/api/posts/?tag=tech&sortBy=likes');
    expect(response.status).toBe(200);
  });
  it('get posts without sortby and with direction', async () => {
    const response = await request.get('/api/posts/?tag=tech&direction=desc');
    expect(response.status).toBe(200);
  });
  it('get posts with valid sortby and direction ', async () => {
    const response = await request.get(
      '/api/posts/?tag=tech&sortBy=likes&direction=desc'
    );
    expect(response.status).toBe(200);
  });
  it('get posts with sortby having a value that is not present in the list of acceptable fields and with valid direction', async () => {
    const response = await request.get(
      '/api/posts/?tag=tech&sortBy=invalidField&direction=desc'
    );
    const errorMessage = {
      error: 'sortBy parameter is invalid'
    };
    expect(response.status).toBe(400);
    expect(response.body).toEqual(errorMessage);
  });
  it('get posts with sortby having a valid value and with invalid direction', async () => {
    const response = await request.get(
      '/api/posts/?tag=tech&sortBy=likes&direction=invalidDirection'
    );
    const errorMessage = {
      error: 'sortBy parameter is invalid'
    };
    expect(response.status).toBe(400);
    expect(response.body).toEqual(errorMessage);
  });
});
