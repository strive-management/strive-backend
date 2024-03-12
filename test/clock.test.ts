import request from 'supertest'
import app from '../src/index'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

beforeAll(async () => {
  await prisma.clock.createMany({
    data: [
      { employee_id: 15,
        clock_in: new Date(),
        clock_out: new Date  
      },
      { employee_id: 15,
        clock_in: new Date(),
        clock_out: new Date()  
      },
      { employee_id: 15,
        clock_in: new Date(),
        clock_out: new Date()  
      },
    ]
  });
});


afterAll(async () => {
  await prisma.clock.deleteMany({
    where: {
      OR: [
        { employee_id: 15 },
        { employee_id: 15 },
        { employee_id: 15 },
        { employee_id: 11 },
      ]
    }
  });
});


describe('GET /clocks', () => {

  test('Should return all the clocks', async () => {
    const response = await request(app).get('/clocks')
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(5)
  })

  test('should accept a limit argument', async() => {
    const response = await request(app).get('/clocks')

    expect(response.statusCode).toBe(200);
    expect(response).toBeDefined
  })
})

describe('POST /clocks', () => {
  test('should specify json in the content type header', async () => {
    const response = await request(app).post('/clocks').send(
      { employee_id: 11,
        clock_in: new Date(),
        clock_out: new Date()  
      },
    );

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    
  });

  // If this test is meant to test the POST action, it should be a POST request, not GET
  test('post is working', async () => {
    const response = await request(app).get('/clocks')

    // The length assertion may vary based on the action performed and the response structure
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({employee_id:11})
    ]));
    expect(response.body).toHaveLength(6);

  });

  test('should add department', async () => {
    const response = await request(app).get('/clocks');
  
    const clocks = response.body;
    
    expect(clocks).toBeDefined();
    expect(Array.isArray(clocks)).toBe(true); // Ensure it's an array if you're checking length
    expect(clocks.length).toBeGreaterThan(0); // Adjust based on expected test data
    expect(clocks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ employee_id: 15 })
      ])
    );
  });
});


describe('DELETE /clocks/:id', () => {
  let jobId: number;

    beforeAll(async() => {
      const createUserResponse = await request(app).post('/clocks').send({employee_id: 15})
      jobId = createUserResponse.body.id 
      console.log(jobId)     
    })


  test('should delete by id', async () => {
    const deleteResponse = await request(app).delete(`/clocks/${jobId}`)
    const deletedDepartment = await request(app).get(`/clocks/${jobId}`)

    expect(deletedDepartment.statusCode).toBe(400)
    expect(deletedDepartment).toBeUndefined
  })

})

describe('PATCH / clocks/:id', () => {
  let created: number;

    beforeAll(async() => {
      const createUserResponse = await request(app).post('/clocks').send({employee_id: 15})
      created = createUserResponse.body.id 
      console.log(created)     
    })


  test('should patch the user by ID', async () => {
    const patchUser = await request(app).patch(`/clocks/${created}`).send({employee_id: 15})

    const patchResult = await request(app).get(`/clocks/${created}`)

    
    expect(patchResult).toBeDefined()
    expect(patchResult.body).toEqual(expect.objectContaining({employee_id: 15}))
  });

})