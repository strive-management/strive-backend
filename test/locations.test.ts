import request from 'supertest'
import app from '../src/index'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

beforeAll(async () => {
  await prisma.locations.createMany({
    data: [
      { location_name: "test1" },
      { location_name: "test2" },
      { location_name: "test3" },
    ]
  });
});


afterAll(async () => {
  await prisma.locations.deleteMany({
    where: {
      OR: [
        { location_name: "test1" },
        { location_name: "test2" },
        { location_name: "test3" },
        { location_name: "test" },
        { location_name: "Edited_location" },
      ]
    }
  });
});


describe('GET /locations', () => {

  test('Should return all the locations', async () => {
    const response = await request(app).get('/locations')
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(6)
  })

  test('should accept a limit argument', async() => {
    const response = await request(app).get('/locations')

    expect(response.statusCode).toBe(200);
    expect(response).toBeDefined
  })
})

describe('POST /locations', () => {
  test('should specify json in the content type header', async () => {
    const response = await request(app).post('/locations').send({
      location_name: "test"
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    
  });

  // If this test is meant to test the POST action, it should be a POST request, not GET
  test('post is working', async () => {
    const response = await request(app).get('/locations')

    // The length assertion may vary based on the action performed and the response structure
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({location_name: "New York"})
    ]));
    expect(response.body).toHaveLength(7);

  });

  test('should add department', async () => {
    const response = await request(app).get('/locations');
  
    const locations = response.body;
    
    expect(locations).toBeDefined();
    expect(Array.isArray(locations)).toBe(true); // Ensure it's an array if you're checking length
    expect(locations.length).toBeGreaterThan(0); // Adjust based on expected test data
    expect(locations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ location_name: "test" })
      ])
    );
  });
});


describe('DELETE /locations/:id', () => {
  let locationId: number;

    beforeAll(async() => {
      const createUserResponse = await request(app).post('/locations').send({location_name: 'test123'})
      locationId = createUserResponse.body.id 
      console.log(locationId)     
    })


  test('should delete by id', async () => {
    const deleteResponse = await request(app).delete(`/locations/${locationId}`)
    const deletedDepartment = await request(app).get(`/locations/${locationId}`)

    expect(deletedDepartment.statusCode).toBe(400)
    expect(deletedDepartment).toBeUndefined
  })

})

describe('PATCH / locations/:id', () => {
  let createdId: number;

  beforeAll(async () => {
    const createUserResponse = await request(app).post('/locations').send({ location_name: "test123123" });
    createdId = createUserResponse.body.id;
    console.log(createdId);
    expect(createUserResponse.statusCode).toBe(200); // Check creation was successful
  });

  test('should patch the location by ID', async () => {
    const patchResponse = await request(app).patch(`/locations/${createdId}`).send({ location_name: 'Edited_location' });
    expect(patchResponse.statusCode).toBe(200); // Check patch was successful

    const getResult = await request(app).get(`/locations/${createdId}`);
    expect(getResult.statusCode).toBe(200); // Check get was successful
    expect(getResult.body).toEqual(expect.objectContaining({ location_name: 'Edited_location' }));
  });

})