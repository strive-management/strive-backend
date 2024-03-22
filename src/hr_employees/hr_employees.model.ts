import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEmployees = async (userId: string) => {
  if (!userId) return [];
  const users = await prisma.employees.findMany({
    where: {
      user_id: userId,
    },
  });
  return users;
};

export const getEmployeeById = async (id: number) => {
  const user = await prisma.employees.findUnique({
    where: { id },
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

export const patchEmployeeById = async (id: number, data: any) => {
  const user = await prisma.employees.update({
    where: { id },
    data,
  });
  return user;
};

export const getSomeEmployees = async (userId: string) => {
  if (!userId) return [];
  const users = await prisma.employees.findMany({
    where: {
      user_id: userId,
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

export const employeeCount = async (userId: string) => {
  if (!userId) return [];
  const employeeNumbers = await prisma.employees.count({
    where: {
      user_id: userId,
    },
  });
  return employeeNumbers;
};

export const onlyYourEmployees = async (userId: string) => {
  if (!userId) return [];
  const userInfoOnly = await prisma.employees.findMany({
    where: {
      user_id: userId,
    },
  });
  return userInfoOnly;
};
