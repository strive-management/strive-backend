import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDepartments = async () => {
  const departments = await prisma.department_table.findMany();
  return departments;
};

export const getDepartmentById = async (id: number) => {
  const department = await prisma.department_table.findUnique({
    where: {
      id,
    },
  });
  return department;
};

export const addNewDepartment = async (data: any) => {
  const department = await prisma.department_table.create({
    data,
  });
  return department;
};

export const deleteDepartment = async (id: number) => {
  const department = await prisma.department_table.delete({
    where: { id },
  });
  return department;
};

export const patchDepartmentById = async (id: number, data: any) => {
  const department = await prisma.department_table.update({
    where: { id },
    data,
  });
  return department;
};
