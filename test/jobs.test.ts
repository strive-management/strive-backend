import request from 'supertest'
import app from '../src/index'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

beforeAll(async () => {
  await prisma.jobs.createMany({
    data: [
      { job_title: "test1" },
      { job_title: "test2" },
      { job_title: "test3" },
    ]
  });
});


afterAll(async () => {
  await prisma.jobs.deleteMany({
    where: {
      OR: [
        { job_title: "test1" },
        { job_title: "test2" },
        { job_title: "test3" },
        { job_title: "test" },
        { job_title: "Edited_job" },
      ]
    }
  });
});


describe('GET /jobs', () => {

  test('Should return all the jobs', async () => {
    const response = await request(app).get('/jobs')
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(6)
  })

  test('should accept a limit argument', async() => {
    const response = await request(app).get('/jobs')

    expect(response.statusCode).toBe(200);
    expect(response).toBeDefined
  })
})

describe('POST /jobs', () => {
  test('should specify json in the content type header', async () => {
    const response = await request(app).post('/jobs').send({
      job_title: "test"
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    
  });

  // If this test is meant to test the POST action, it should be a POST request, not GET
  test('post is working', async () => {
    const response = await request(app).get('/jobs')

    // The length assertion may vary based on the action performed and the response structure
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({job_title: "Software Engineer"})
    ]));
    expect(response.body).toHaveLength(7);

  });

  test('should add department', async () => {
    const response = await request(app).get('/jobs');
  
    const jobs = response.body;
    
    expect(jobs).toBeDefined();
    expect(Array.isArray(jobs)).toBe(true); // Ensure it's an array if you're checking length
    expect(jobs.length).toBeGreaterThan(0); // Adjust based on expected test data
    expect(jobs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ job_title: "test" })
      ])
    );
  });
});


describe('DELETE /jobs/:id', () => {
  let jobId: number;

    beforeAll(async() => {
      const createUserResponse = await request(app).post('/jobs').send({job_title: 'test123'})
      jobId = createUserResponse.body.id 
      console.log(jobId)     
    })


  test('should delete by id', async () => {
    const deleteResponse = await request(app).delete(`/jobs/${jobId}`)
    const deletedDepartment = await request(app).get(`/jobs/${jobId}`)

    expect(deletedDepartment.statusCode).toBe(400)
    expect(deletedDepartment).toBeUndefined
  })

})

describe('PATCH / jobs/:id', () => {
  let created: number;

    beforeAll(async() => {
      const createUserResponse = await request(app).post('/jobs').send({job_title: "test123123"})
      created = createUserResponse.body.id 
      console.log(created)     
    })


  test('should patch the user by ID', async () => {
    const patchUser = await request(app).patch(`/jobs/${created}`).send({job_title: 'Edited_job'})

    const patchResult = await request(app).get(`/jobs/${created}`)

    
    expect(patchResult).toBeDefined()
    expect(patchResult.body).toEqual(expect.objectContaining({job_title: 'Edited_job'}))
  });

})