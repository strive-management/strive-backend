import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const getClocks = async () => {
  const clock = await prisma.clock.findMany();
  return clock;
};

export const getClocksById = async (id: number) => {
  const clock = await prisma.clock.findUnique({
    where: {
      id,
    },
  });
  return clock;
};

export const addNewClocks = async (data: any) => {
  const clock = await prisma.clock.create({
    data,
  });
  return clock;
};

export const deleteClocks = async (id: number) => {
  const clock = await prisma.clock.delete({
    where: { id },
  });
  return clock;
};

export const patchClocksById = async (id: number, data: any) => {
  const clock = await prisma.clock.update({
    where: { id },
    data,
  });
  return clock;
};