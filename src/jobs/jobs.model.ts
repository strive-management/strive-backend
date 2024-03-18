import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getJobs = async (UUID:string) => {
  const jobs = await prisma.jobs.findMany({
    where: {
      user_id: {
        equals: UUID
      }
    }
  });
  return jobs;
};

export const getJobById = async (id: number, UUID:string) => {
  const job = await prisma.jobs.findUnique({
    where: {
      id, user_id:UUID
    },
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

export const patchJobById = async (id: number, data: any, UUID:string) => {
  const job = await prisma.jobs.update({
    where: { id, user_id: UUID },
    data
  });
  return job;
};
