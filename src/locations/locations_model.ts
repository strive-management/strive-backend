import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLocations = async () => {
  const locations = await prisma.location_table.findMany();
  return locations;
};

export const getLocationById = async (id: number) => {
  const location = await prisma.location_table.findUnique({
    where: {
      id,
    },
  });
  return location;
};

export const addNewLocation = async (data: any) => {
  const location = await prisma.location_table.create({
    data,
  });
  return location;
};

export const deleteLocation = async (id: number) => {
  const location = await prisma.location_table.delete({
    where: { id },
  });
  return location;
};

export const patchLocationById = async (id: number, data: any) => {
  const location = await prisma.location_table.update({
    where: { id },
    data,
  });
  return location;
};
