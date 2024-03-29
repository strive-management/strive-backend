import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLocations = async (userId: string) => {
  if (!userId) return [];
  const locations = await prisma.locations.findMany({
    where: {
      user_id: userId,
    },
    select: {
      location_name: true,
      number_of_staff: true,
      _count: {
        select: { employees: true },
      },
    },
  });
  return locations;
};

export const getLocationById = async (id: number) => {
  const location = await prisma.locations.findUnique({
    where: {
      id,
    },
  });
  return location;
};

export const addNewLocation = async (data: {
  location_name: string;
  user_id: string;
}) => {
  const location = await prisma.locations.create({
    data,
  });
  return location;
};

export const deleteLocation = async (id: number) => {
  const location = await prisma.locations.delete({
    where: { id },
  });
  return location;
};

export const patchLocationById = async (id: number, data: any) => {
  const location = await prisma.locations.update({
    where: { id },
    data,
  });
  return location;
};
