import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSchedules = async (UUID:string) => {
  const schedules = await prisma.schedule.findMany({
    where: {
      user_id: {
        equals: UUID
      }
    }
  });
  return schedules;
};

export const getJobById = async (id: number, UUID:string) => {
  const schedule = await prisma.schedule.findUnique({
    where: {
      id, user_id:UUID
    },
  });
  return schedule;
};

export const addNewSchedules = async (data: any) => {
  const schedule = await prisma.schedule.create({
    data,
  });
  return schedule;
};

export const deleteSchedule = async (id: number) => {
  const schedule = await prisma.schedule.delete({
    where: { id },
  });
  return schedule;
};

export const patchScheduleById = async (id: number, data: any, UUID:string) => {
  const schedule = await prisma.schedule.update({
    where: { id, user_id: UUID },
    data
  });
  return schedule;
};
