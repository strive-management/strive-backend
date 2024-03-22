import { PrismaClient } from '@prisma/client';
import { getEmployees } from '../hr_employees/hr_employees.model';

const prisma = new PrismaClient();

export const getSchedules = async (userId: string) => {
  if (!userId) return [];
  const schedules = await prisma.schedule.findMany({
    where: { user_id: userId },
    include: {
      employee: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  });
  const result = schedules.map((schedule) => {
    return {
      id: schedule.id,
      employee_id: schedule.employee_id,
      fullname: `${schedule.employee?.first_name} ${schedule.employee?.last_name}`,
      date: schedule.date,
      available: schedule.available ? '✅' : '❌',
      schdeuled_start: schedule.scheduled_start,
      schdeuled_end: schedule.scheduled_end,
      clock_in: schedule.clock_in,
      clock_out: schedule.clock_out,
    };
  });
  console.log(result);
  return result;
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

export const howManyWorking = async (userId: string) => {
  if (!userId) return [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const count = await prisma.schedule.count({
    where: {
      available: true,
      user_id: userId,
      date: {
        gte: today,
        lte: tomorrow,
      },
    },
  });

  return count;
};

export const howManyHoliday = async (userId: string) => {
  if (!userId) return [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const count = await prisma.schedule.count({
    where: {
      available: false,
      user_id: userId,
      date: {
        gte: today,
        lte: tomorrow,
      },
    },
  });

  return count;
};
