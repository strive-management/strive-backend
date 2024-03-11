import request from 'supertest'
import app from '../src/index'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

beforeAll(async () => {
  await prisma.departments.createMany({
    data: [
      { department_name: "testDepartment" },
      { department_name: "testDepartment1" },
      { department_name: "testDepartment2" },
    ]
  });
});


afterAll(async () => {
  await prisma.departments.deleteMany({
    where: {
      OR: [
        { department_name: "testDepartment" },
        { department_name: "testDepartment1" },
        { department_name: "testDepartment2" },
        {department_name: "test"},
        {department_name: "Edited_department"},

      ]
    }
  });
});


describe('GET /deparments', () => {

  test('Should return all the departments', async () => {
    const response = await request(app).get('/departments')
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(6)
  })

  test('should accept a limit argument', async() => {
    const response = await request(app).get('/departments')

    expect(response.statusCode).toBe(200);
    expect(response).toBeDefined
  })
})

describe('POST /departments', () => {
  test('should specify json in the content type header', async () => {
    const response = await request(app).post('/departments').send({
      department_name: "test"
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    
  });

  // If this test is meant to test the POST action, it should be a POST request, not GET
  test('post is working', async () => {
    const response = await request(app).get('/departments')

    // The length assertion may vary based on the action performed and the response structure
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({department_name: "Engineering"})
    ]));
    expect(response.body).toHaveLength(7);

  });

  test('should add department', async () => {
    const response = await request(app).get('/departments');
  
    const departments = response.body;
    
    expect(departments).toBeDefined();
    expect(Array.isArray(departments)).toBe(true); // Ensure it's an array if you're checking length
    expect(departments.length).toBeGreaterThan(0); // Adjust based on expected test data
    expect(departments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ department_name: "test" })
      ])
    );
  });
});


describe('DELETE /departments/:id', () => {
  let deparmentId: number;

    beforeAll(async() => {
      const createUserResponse = await request(app).post('/departments').send({department_name: 'test123'})
      deparmentId = createUserResponse.body.id 
      console.log(deparmentId)     
    })


  test('should delete by id', async () => {
    const deleteResponse = await request(app).delete(`/departments/${deparmentId}`)
    const deletedDepartment = await request(app).get(`/departments/${deparmentId}`)

    expect(deletedDepartment.statusCode).toBe(400)
    expect(deletedDepartment).toBeUndefined
  })

})

describe('PATCH / departments/:id', () => {
  let createdUserId: number;

    beforeAll(async() => {
      const createUserResponse = await request(app).post('/departments').send({department_name: "test123123"})
      createdUserId = createUserResponse.body.id 
      console.log(createdUserId)     
    })


  test('should patch the user by ID', async () => {
    const patchUser = await request(app).patch(`/departments/${createdUserId}`).send({department_name: 'Edited_department'})

    const patchResult = await request(app).get(`/departments/${createdUserId}`)

    
    expect(patchResult).toBeDefined()
    expect(patchResult.body).toEqual(expect.objectContaining({department_name: 'Edited_department'}))
  });

})