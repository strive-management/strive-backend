import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getDepartments = async () => {
  const departments = await prisma.departments.findMany();

  console.log(departments);
  return departments;
};
//this is working?????\

export const getDepartmentById = async (id: number) => {
  const department = await prisma.departments.findUnique({
    where: {
      id
    },
  });
  return department;
};

export const addNewDepartment = async (data: any) => {
  const department = await prisma.departments.create({
    data,
  });
  return department;
};

export const deleteDepartment = async (id: number) => {
  const department = await prisma.departments.delete({
    where: { id },
  });
  return department;
};

export const patchDepartmentById = async (id: number, data: any) => {
  const department = await prisma.departments.update({
    where: { id},
    data,
  });
  return department;
};
