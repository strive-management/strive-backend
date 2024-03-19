import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSchedules = async () => {
  const schedules = await prisma.schedule.findMany();
  return schedules;
};

export const getJobById = async (id: number) => {
  const schedule = await prisma.schedule.findUnique({
    where: {
      id,
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
    data,
  });
  return schedule;
};

export const howManyWorking = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const count = await prisma.schedule.count({
    where: {
      available: true,
      date: {
        gte: today,
        lte:tomorrow
      },
    },
  });

  return count;
};

export const howManyHoliday = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const count = await prisma.schedule.count({
    where: {
      available: false,
      date: {
        gte: today,
        lte:tomorrow
      },
    },
  });

  return count;
};
