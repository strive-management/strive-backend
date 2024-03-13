import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.jobs.deleteMany() // delete the existing data everytime
  await prisma.departments.deleteMany() // delete the existing data everytime
  await prisma.locations.deleteMany() // delete the existing data everytime
  await prisma.employees.deleteMany() // delete the existing data everytime



  await prisma.departments.createMany({
    data: [
      { department_name: "Engineering" },
      { department_name: "Human Resources" },
      { department_name: "Marketing" },
    ],
  });
  
  // Seed jobs
  await prisma.jobs.createMany({
    data: [
      { job_title: "Software Engineer" },
      { job_title: "Product Manager" },
      { job_title: "HR Specialist" },
    ],
  });
  
  // Seed locations
  await prisma.locations.createMany({
    data: [
      { location_name: "New York", number_of_staff: 50 },
      { location_name: "San Francisco", number_of_staff: 30 },
      { location_name: "Berlin", number_of_staff: 20 },
    ],
  });

  await prisma.employees.createMany({
    data: [
      {
        first_name: "Alice",
        last_name: "Williams",
        email: "alice.williams@example.com",
        phone_number: "9876543210",
        job_title: "Product Manager",
        department_name: "Marketing",
        location_name: "Berlin",
        salary: 80000,
        role: "BASIC",
      },
      {
        first_name: "Bob",
        last_name: "Johnson",
        email: "bob.johnson@example.com",
        phone_number: "8765432109",
        job_title: "HR Specialist",
        department_name: "Human Resources",
        location_name: "New York",
        salary: 65000,
        role: "BASIC",
      },
      {
        first_name: "Carol",
        last_name: "Smith",
        email: "carol.smith@example.com",
        phone_number: "7654321098",
        job_title: "Software Engineer",
        department_name: "Engineering",
        location_name: "San Francisco",
        salary: 90000,
        role: "ADMIN",
      },
      {
        first_name: "David",
        last_name: "Brown",
        email: "david.brown@example.com",
        phone_number: "6543210987",
        job_title: "Product Manager",
        department_name: "Marketing",
        location_name: "Berlin",
        salary: 85000,
        role: "BASIC",
      },
      {
        first_name: "Eve",
        last_name: "Davis",
        email: "eve.davis@example.com",
        phone_number: "5432109876",
        job_title: "Software Engineer",
        department_name: "Engineering",
        location_name: "New York",
        salary: 95000,
        role: "BASIC",
      },
    ],
  });



  // console.log(jobs);
  // console.log(locations);
  // console.log(departments);
  // console.log(users);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
