import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getJobs = async () => {
  const jobs = await prisma.job_table.findMany();
  return jobs;
};

export const getJobById = async (id: number) => {
  const job = await prisma.job_table.findUnique({
    where: {
      id,
    },
  });
  return job;
};

export const addNewJob = async (data: any) => {
  const job = await prisma.job_table.create({
    data,
  });
  return job;
};

export const deleteJob = async (id: number) => {
  const job = await prisma.job_table.delete({
    where: { id },
  });
  return job;
};

export const patchJobById = async (id: number, data: any) => {
  const job = await prisma.job_table.update({
    where: { id },
    data,
  });
  return job;
};
