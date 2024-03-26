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
      scheduled_start: schedule.scheduled_start,
      scheduled_end: schedule.scheduled_end,
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
    include: {
      employee: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  });
  const result = {
    id: schedule.id,
    employee_id: schedule.employee_id,
    fullname: `${schedule.employee?.first_name} ${schedule.employee?.last_name}`,
    date: schedule.date,
    available: schedule.available ? '✅' : '❌',
    scheduled_start: schedule.scheduled_start,
    scheduled_end: schedule.scheduled_end,
    clock_in: schedule.clock_in,
    clock_out: schedule.clock_out,
  };
  return result;
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
  const count = await prisma.schedule.findMany({
    where: {
      available: false,
      user_id: userId,
      date: {
        gte: today,
        lte: tomorrow,
      },
    },
    include: {
      employee: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  });

  const result = count.map((employee) => {
    return {
      employee_id: employee.employee_id,
      fullname: `${employee.employee?.first_name} ${employee.employee?.last_name}`,
    };
  });
  return result;
};
export const patchClock = async (id: number, data: any) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const schedule = await prisma.schedule.update({
    where: {
      id: id,
      date: today.toISOString(),
    },
    data: {
      clock_in: data.clock_in,
      clock_out: data.clock_out,
    },
  });
  return schedule;
};

export const getOneSchedule = async (employeeId: string) => {
  if (!employeeId) return [];
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  // const tomorrow = new Date(today);
  // tomorrow.setDate(tomorrow.getDate() + 1);
  const schedule = await prisma.schedule.findMany({
    where: {
      employee_id: parseInt(employeeId),
      date: today.toISOString(),
    },
    include: {
      employee: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  });
  const result = schedule.map((schedule) => {
    return {
      id: schedule.id,
      employee_id: schedule.employee_id,
      fullname: `${schedule.employee?.first_name} ${schedule.employee?.last_name}`,
      date: schedule.date,
      available: schedule.available ? '✅' : '❌',
      scheduled_start: schedule.scheduled_start,
      scheduled_end: schedule.scheduled_end,
      clock_in: schedule.clock_in,
      clock_out: schedule.clock_out,
    };
  });
  return result;
};
