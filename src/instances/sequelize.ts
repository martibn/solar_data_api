import { Sequelize } from 'sequelize-typescript';
import { SolarData } from '../models/SolarData';
import { SolarDataDaySummary } from '../models/SolarDataDaySummary';
import { SolarDataMonthSummary } from '../models/SolarDataMonthSummary';
import { SolarDataYearSummary } from '../models/SolarDataYearSummary';

const db = 'postgres';
const username = 'postgres';
const password = 'postgres';

export const sequelize = new Sequelize(db, username, password, {
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    PGTZ: 'Europe/Paris'
  },
  timezone: '+01:00',
  models: [
            SolarData,
            SolarDataDaySummary,
            SolarDataMonthSummary,
            SolarDataYearSummary,
          ]
});