import { Request, Response } from 'express';
import * as schedulesModel from './schedules.model';

export const getAllschedules = async (req: Request, res: Response) => {
  try {
    const userId = req.query.user_id as string;
    const schedules = await schedulesModel.getSchedules(userId);
    res.status(200).json(schedules);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.error(err.message);
  }
};

export const getSingleSchedules = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ message: 'Invalid schedule ID.' });
    }
    const singleSchedule = await schedulesModel.getJobById(id);
    if (!singleSchedule) {
      res.status(400).json({ message: 'Schedule not found.' });
    } else {
      res.status(200).json(singleSchedule);
    }
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const addSingleSchedules = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const addSingleSchedule = await schedulesModel.addNewSchedules(data);
    res.status(200).json(addSingleSchedule);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const deleteSingleSchedules = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleteSchedule = await schedulesModel.deleteSchedule(id);
    if (!deleteSchedule) {
      res.status(400).json({ message: `Schedule ${id} does not exist` });
    }
    res.status(200).send({ message: `Schedule ${id} has been deleted` });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const updateScheduleData = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = parseInt(req.params.id);
    const updateScheduleInfo = await schedulesModel.patchScheduleById(id, data);
    if (!updateScheduleInfo) {
      res.status(400).json({ message: 'Schedule not found.' });
    }
    res.status(200).json({ message: 'Schedule is now updated.' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const workingToday = async (req: Request, res: Response) => {
  try {
    const userId = req.query.user_id as string;
    const workingNumbers = await schedulesModel.howManyWorking(userId);
    res.status(200).json(workingNumbers);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const holidayToday = async (req: Request, res: Response) => {
  try {
    const userId = req.query.user_id as string;
    const holidayNumbers = await schedulesModel.howManyHoliday(userId);
    res.status(200).json(holidayNumbers);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};
