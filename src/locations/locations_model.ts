import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLocations = async (UUID:string) => {
  const locations = await prisma.locations.findMany({
    where: {
      user_id: {
        equals:UUID
      }
    }
  });
  return locations;
};

export const getLocationById = async (id: number, UUID:string) => {
  const location = await prisma.locations.findUnique({
    where: {
      id, user_id:UUID
    },
  });
  return location;
};

export const addNewLocation = async (data: { location_name: string }) => {
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

export const patchLocationById = async (id: number, data: any, UUID:string) => {
  const location = await prisma.locations.update({
    where: { id , user_id: UUID},
    data,
  });
  return location;
};
