import { Router } from 'express';
import { Op } from 'sequelize';
import { SolarData } from '../models/SolarData';

export const SolarDataControllerUrl: string = "/solar_data";

export const SolarDataController = Router();


    /*SolarDataController.get('/save', async (req , res, next) => {
        try {
            const c : SolarData = new SolarData();
            c.timestamp = new Date();
            c.power_consumption = 1;

            const result = await SolarData.create(c.json());

        res.json(result);
        } catch (e) {
        next(e);
        }
    });*/

    SolarDataController.get("/", async (req , res, next) => {
        const date : Date = new Date();
        const nextDay : Date = new Date();
        console.log(req.query);

        if(req.query.start && !Array.isArray(req.query.start)){
            date.setTime(parseInt(req.query.start.toString()));
            nextDay.setTime(parseInt(req.query.start.toString()));
        }
        if(req.query.end && !Array.isArray(req.query.end)){
            nextDay.setTime(parseInt(req.query.end.toString()));
        }

        date.setHours(0,0,0,0);
        nextDay.setHours(24,0,0,0);
        
        try {
            res.json(await SolarData.findAll({
                where : {
                    timestamp:{
                        [Op.between]: [date, nextDay]
                    }
                }
            }));
        } catch (e) {
            next(e);
        }
    });