import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getJobs = async (userId: string) => {
  if (!userId) return [];
  const jobs = await prisma.jobs.findMany({
    where: {
      user_id: userId,
    },
    select: {
      job_title: true,
      _count: {
        select: { employees: true },
      },
    },
  });
  return jobs;
};

export const getJobById = async (id: number) => {
  const job = await prisma.jobs.findUnique({
    where: { id },
  });
  return job;
};

export const addNewJob = async (data: any) => {
  const job = await prisma.jobs.create({
    data,
  });
  return job;
};

export const deleteJob = async (id: number) => {
  const job = await prisma.jobs.delete({
    where: { id },
  });
  return job;
};

export const patchJobById = async (id: number, data: any) => {
  const job = await prisma.jobs.update({
    where: { id },
    data,
  });
  return job;
};
