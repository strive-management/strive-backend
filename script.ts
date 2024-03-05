import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function main() {

  await prisma.job_table.deleteMany() // delete the existing data everytime
  await prisma.department_table.deleteMany() // delete the existing data everytime
  await prisma.location_table.deleteMany() // delete the existing data everytime
  await prisma.hr_employees_table.deleteMany() // delete the existing data everytime
  const manager = await prisma.hr_employees_table.create({
    data: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone_number: '1234567890',
      job_id: 1, 
      department_id: 1,
      location_id: 1, 
      starting_date: new Date('2023-01-01'),
      role: 'ADMIN', 
    },
  })

  const users = await prisma.hr_employees_table.createMany({
    data: [
      {
        first_name: "Alice",
        last_name: "Johnson",
        email: "alice.johnson@example.com",
        phone_number: "123451231",
        job_id: 1, 
        manager_id: null,
        department_id: 1,
        location_id: 1,
        starting_date: new Date("2023-01-01"),
        role: 'BASIC',
      },
      {
        first_name: "Bob",
        last_name: "Smith",
        email: "bob.smith@example.com",
        phone_number: "123123464",
        job_id: 2,
        manager_id: null, // TODO: this is not working
        department_id: 2,
        location_id: 2,
        starting_date: new Date("2023-02-01"),
        role: 'ADMIN',
      },

    ],
})

    const departments = await prisma.department_table.createMany({
      data: [
        { department_name: "Engineering" },
        { department_name: "Human Resources" },
        { department_name: "Marketing" },
        { department_name: "Sales" },
        { department_name: "Customer Support" },
      ],
    })

    const locations = await prisma.location_table.createMany({
      data: [
        { location_name: "New York", number_of_staff: 100 },
        { location_name: "San Francisco", number_of_staff: 50 },
        { location_name: "Berlin", number_of_staff: 70 },
        { location_name: "Tokyo", number_of_staff: 80 },
        { location_name: "London", number_of_staff: 90 },
      ],
    })

    const jobs = await prisma.job_table.createMany({
      data: [
        { job_title: "Software Engineer", min_salary: 6000000, max_salary: 12000000 },
        { job_title: "Product Manager", min_salary: 7000000, max_salary: 13000000 },
        { job_title: "Design Lead", min_salary: 6500000, max_salary: 12500000 },
        { job_title: "HR Specialist", min_salary: 5000000, max_salary: 9000000 },
        { job_title: "Marketing Director", min_salary: 8000000, max_salary: 15000000 },
      ],
    })
  
  console.log(jobs);
  console.log(locations);
  console.log(departments)
  console.log(users)
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })