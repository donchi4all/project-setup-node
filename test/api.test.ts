import request from 'supertest';
import Express from '../src/modules/express';

/**
 * TEMPORARY
 */
describe('GET /api', () => {
  it('Should return 503 - Service Temporarily Unavailable.', () => {
    return request(Express.Server).get('/')
      .expect(503);
  });
});