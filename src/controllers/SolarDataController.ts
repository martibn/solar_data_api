import {Router} from 'express';
import { SolarData } from '../models/SolarData';

export const SolarDataController = Router();

SolarDataController.get('', async (req, res, next) => {
    try {
      res.json(await SolarData.findAll());
    } catch (e) {
      next(e);
    }
  });