import { Request, Response } from 'express';
import * as JobsModel from './jobs.model';
import axios from 'axios';
import e from 'cors';
import { deprecate } from 'util';

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await JobsModel.getJobs();
    res.status(200).json(jobs);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.error(err.message);
  }
};

export const getSingleJob = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ message: 'Invalid job ID.' });
    }
    const singleJob = await JobsModel.getJobById(id);
    if (!singleJob) {
      res.status(400).json({ message: 'Job not found.' });
    }
    res.status(200).json(singleJob);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const addSingleJob = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const addDepartment = await JobsModel.addNewJob(data);
    res.status(200).json(addDepartment);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const deleteSingleJob = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleteJob = await JobsModel.deleteJob(id);
    if (!deleteJob) {
      res.status(400).json({ message: 'That job ID does not exist' });
    }
    res.status(200).send({ message: `${deleteJob} has been deleted` });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const updateJobData = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = parseInt(req.params.id);
    const updateJobInfo = await JobsModel.patchJobById(id, data);
    if (!updateJobInfo) {
      res.status(400).json({ message: 'Job not found.' });
    }
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};
