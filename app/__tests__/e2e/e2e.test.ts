import request, { Response } from "supertest"

import app from "../../app"

describe('e2e', () => {
  it('should load 1 product', async () => {
    const result: Response = await request(app)
      .get('/products/1')
    expect(result.statusCode).toBe(200)
    expect(typeof result.body).toBe('object')
  })    
})
