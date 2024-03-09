import { Request, Response } from 'express';
import * as ClocksModel from './clocks.model'

export const getAllClocks = async (req: Request, res: Response) => {
  try {
    const clocks = await ClocksModel.getClocks();
    res.status(200).json(clocks);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.error(err.message);
  }
};

export const getSingleClocks = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ message: 'Invalid Clock.' });
    }
    const singleClocks = await ClocksModel.getClocksById(id);
    if (!singleClocks) {
      res.status(400).json({ message: 'Clock not found.' });
    } else {
      res.status(200).json(singleClocks);
    }
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const addSingleClocks = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const addClocks = await ClocksModel.addNewClocks(data);
    res.status(200).json(addClocks);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const deleteSingleClocks = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleteClocks = await ClocksModel.deleteClocks(id);
    if (!deleteClocks) {
      res.status(400).json({ message: 'That Clock ID does not exist' });
    }
    res.status(200).send({ message: `Clock ${id} has been deleted` });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const updateClocksData = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = parseInt(req.params.id);
    const updateClocksInfo = await ClocksModel.patchClocksById(
      id,
      data
    );
    if (!updateClocksInfo) {
      res.status(400).json({ message: 'Clock not found.' });
    }
    res.status(200).json({ message: 'Clock is now updated.' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};
