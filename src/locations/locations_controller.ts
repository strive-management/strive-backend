import { Request, Response } from 'express';
import * as LocationModel from './locations_model';
import axios from 'axios';
import e from 'cors';
import { deprecate } from 'util';

export const getAllLocations = async (req: Request, res: Response) => {
  try {
    
    const locations = await LocationModel.getLocations();
    res.status(200).json(locations);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
    console.error(err.message);
  }
};

export const getSingleLocation = async (req: Request, res: Response) => {
  try {
    
    const id = parseInt(req.params.id);
    if (!id) {
      res.status(400).json({ message: 'Invalid location ID.' });
    }
    const singleLocation = await LocationModel.getLocationById(id);
    if (!singleLocation) {
      res.status(400).json({ message: 'Location not found.' });
    } else {
      res.status(200).json(singleLocation);
    }
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const addSingleLocation = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const addLocation = await LocationModel.addNewLocation(data);
    res.status(200).json(addLocation);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const deleteSingleLocation = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleteLocation = await LocationModel.deleteLocation(id);
    if (!deleteLocation) {
      res.status(400).json({ message: `Location ${id} not found in database` });
    }
    res.status(200).send({ message: `Location ${id} has been deleted` });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const updateLocationData = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = parseInt(req.params.id);
    const updateLocationInfo = await LocationModel.patchLocationById(id, data);
    if (!updateLocationInfo) {
      res.status(400).json({ message: 'Location not found.' });
    }
    res.status(200).send({ message: `Location ${id} has been updated` });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};
