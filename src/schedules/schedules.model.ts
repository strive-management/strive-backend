import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSchedules = async () => {
  const schedules = await prisma.schedule.findMany();
  return schedules;
};

export const getJobById = async (id: number) => {
  const schedule = await prisma.schedule.findUnique({
    where: {
      id
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

export const patchScheduleById = async (id: number, data: any) => {
  const schedule = await prisma.schedule.update({
    where: { id },
    data
  });
  return schedule;
};
