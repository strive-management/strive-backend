import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (data: any) => {
  return prisma.app_users.create({
    data,
  });
};
