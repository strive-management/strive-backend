import request from 'supertest'
import app from '../src/index'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

beforeAll(async() => {
  await prisma.employees.create({data: {
    first_name: "test",
    last_name: "test2",
    email: "test@test.com",
    phone_number: "13523423",
    job_title: "Product Manager",
    department_name: "Marketing",
    location_name: "Berlin",
    salary: 10000,
    role: "BASIC"
}})
})

afterAll(async() => {
  await prisma.employees.delete({
    where: {
      first_name: "test",
      last_name: "test2",
      email: "test@test.com",
      phone_number: "13523423",
      job_title: "Product Manager",
      department_name: "Marketing",
      location_name: "Berlin",
      salary: 10000,
      role: "BASIC",
    },
      
  })
  await prisma.employees.deleteMany({
    where: {
      first_name: "first"
    },
  });
}
)

describe('GET /employees', () => {

  test('Should return all the employees', async () => {
    const response = await request(app).get('/employees')
    
    expect(response.statusCode).toBe(200)
    expect(await prisma.employees.findFirst({
      where: {
        first_name: "Alice",
        last_name: "Williams",
        email: "alice.williams@example.com",
        phone_number: "9876543210",
        job_title: "Product Manager",
        department_name: "Marketing",
        location_name: "Berlin",
        salary: 80000,
        role: "BASIC",
      }
    }))
  })

  test('should accept a limit argument', async() => {
    const response = await request(app).get('/employees')
    const users = await prisma.employees.findMany()

    expect(response.statusCode).toBe(200);
    expect(users).toBeDefined
    expect(users).toHaveLength(5)
  })

})

describe('POST /employees', () => {
  test("should specify json in the content type header and post is working", async() => {
  const response = await request(app).post('/employees').send({
    first_name: 'first',
    last_name: 'last'
  })


  expect(response.statusCode).toBe(200)
  expect(response.header['content-type']).toEqual(expect.stringContaining("json"))
})

  test("should add user", async ()=> {
    const users = await request(app).get("/employees")
    const createdUser = users.body
    expect(users).toBeDefined
    expect(users.body).toHaveLength(6)
    expect(createdUser).toBeDefined
    expect(users.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({first_name:'first', last_name: 'last'})
      ])
    )
  })
})

describe('DELETE /employees/:id', () => {
  let createdUserId: number;

    beforeAll(async() => {
      const createUserResponse = await request(app).post('/employees').send({first_name: 'first', last_name: 'lastname_temp'})
      createdUserId = createUserResponse.body.id 
      console.log(createdUserId)     
    })


  test('should delete by id', async () => {
    const deleteResponse = await request(app).delete(`/employees/${createdUserId}`)
    const users = await request(app).get(`/employees/${createdUserId}`)

    expect(users.statusCode).toBe(400)
    expect(users).toBeUndefined
  })

})

describe('PATCH / employees/:id', () => {
  let createdUserId: number;

    beforeAll(async() => {
      const createUserResponse = await request(app).post('/employees').send({first_name: 'first', last_name: 'lastname_temp'})
      createdUserId = createUserResponse.body.id 
    })


  test('should patch the user by ID', async () => {
    const patchUser = await request(app).patch(`/employees/${createdUserId}`).send({last_name: 'Edited_lastname'})

    const patchResult = await request(app).get(`/employees/${createdUserId}`)
    
    expect(patchResult).toBeDefined()
    expect(patchResult.body).toEqual(expect.objectContaining({last_name: 'Edited_lastname'}))
  });

})