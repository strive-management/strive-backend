import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (data: any) => {
  return await prisma.app_users.create({
    data,
  });
};

export const findUserByEmail = async (email: any) => {
  return await prisma.app_users.findUnique({
    where: { email },
  });
};
