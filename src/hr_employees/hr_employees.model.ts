import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEmployees = async (UUID:string) => {
  const users = await prisma.employees.findMany({
    where: {
      user_id: {
        equals: UUID
      }
    }
  }
  );
  return users;
};

export const getEmployeeById = async (id: number,UUID:string ) => {
  const user = await prisma.employees.findUnique({
    where: {
      id, user_id:UUID
    },
  });
  return user;
};

export const addNewEmployee = async (data: any) => {
  const user = await prisma.employees.create({
    data,
  });
  return user;
};

export const deleteEmployeeById = async (id: number) => {
  const user = await prisma.employees.delete({
    where: { id },
  });
  return user;
};

export const patchEmployeeById = async (id: number, data: any, UUID:string) => {
  const user = await prisma.employees.update({
    where: { id, user_id: UUID },
    data
  });
  return user;
};

export const getSomeEmployees = async (UUID:string) => {
  const users = await prisma.employees.findMany({
    where: {
      user_id: UUID,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      job_title: true,
      email: true,
      phone_number: true,
      location_name: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return users;
};
