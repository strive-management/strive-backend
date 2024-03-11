import request from 'supertest'
import app from '../src/index'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

beforeAll(async () => {
  await prisma.departments.createMany({
    data: [
      { department_name: "testDepartment" },
      { department_name: "testDepartment1" },
      { department_name: "testDepartment2" }
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
        { department_name: "test" },
      ]
    }
  });
});


describe('GET /deparments', () => {

  test('Should return all the departments', async () => {
    const response = await request(app).get('/departments')
    
    expect(response.statusCode).toBe(200)
    expect(response).toHaveLength(6)
  })

  test('should accept a limit argument', async() => {
    const response = await request(app).get('/departments')
    const users = await prisma.departments.findMany()

    expect(response.statusCode).toBe(200);
    expect(users).toBeDefined
    expect(users).toHaveLength(6)
  })
})

describe('POST /departments', () => {
  test("should specify json in the content type header and post is working", async() => {
  const response = await request(app).post('/departments').send({
    department: "test"
  })


  expect(response.statusCode).toBe(200)
  expect(response.header['content-type']).toEqual(expect.stringContaining("json"))
  console.log(response)
})

  test("should add department", async ()=> {
    const department = await request(app).get("/departments")
    const department_name = department.body
    expect(department_name).toHaveLength(6)
    expect(department_name).toBeDefined
    expect(department_name).toEqual(
      expect.arrayContaining([
        expect.objectContaining({department_name:"Engineering"})
      ])
    )
  })
})

// describe('DELETE /departments/:id', () => {
//   let deparmentId: number;

//     beforeAll(async() => {
//       const createUserResponse = await request(app).post('/departments').send({deparment_name: 'test2'})
//       deparmentId = createUserResponse.body.id 
//       console.log(deparmentId)     
//     })


//   test('should delete by id', async () => {
//     const deleteResponse = await request(app).delete(`/departments/${deparmentId}`)
//     const users = await request(app).get(`/departments/${deparmentId}`)

//     expect(users.statusCode).toBe(400)
//     expect(users).toBeUndefined
//   })

// })

// describe('PATCH / departments/:id', () => {
//   let createdUserId: number;

//     beforeAll(async() => {
//       const createUserResponse = await request(app).post('/departments').send({first_name: 'first', last_name: 'lastname_temp'})
//       createdUserId = createUserResponse.body.id 
//       console.log(createdUserId)     
//     })


//   test('should patch the user by ID', async () => {
//     const patchUser = await request(app).patch(`/departments/${createdUserId}`).send({last_name: 'Edited_lastname'})

//     const patchResult = await request(app).get(`/departments/${createdUserId}`)

//     console.log(patchResult.body);
    
//     expect(patchResult).toBeDefined()
//     expect(patchResult.body).toEqual(expect.objectContaining({last_name: 'Edited_lastname'}))
//   });

// })