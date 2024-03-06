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
