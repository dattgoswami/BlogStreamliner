import { getPingResponse, getPostsResponse } from '../../src/models/get_data';

describe('test suite for functions that fetch data', () => {
  it('should return list of all recipes when called', () => {
    const result = getPingResponse();
    const response = { success: true };
    expect(result['body']).toEqual(response);
  });
});
