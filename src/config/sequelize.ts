import { Sequelize } from 'sequelize-typescript';
import { SolarData } from '../models/SolarData';
import { SolarDataDaySummary } from '../models/SolarDataDaySummary';
import { SolarDataMonthSummary } from '../models/SolarDataMonthSummary';
import { SolarDataYearSummary } from '../models/SolarDataYearSummary';

/**
 * Maybe offer a docker-compose with a postgres set in stone
 * or let the user decide via config the DDBB they want to use.
 */

const db = 'postgres'; // TODO: config file or ENV
const username = 'postgres'; // TODO: config file or ENV
const password = 'postgres'; // TODO: config file or ENV

export const sequelize = new Sequelize(db, username, password, {
  dialect: 'postgres', // TODO: config file or ENV
  port: 5432, // TODO: config file or ENV
  dialectOptions: {
    PGTZ: 'Europe/Paris' // TODO: config file or ENV
  },
  timezone: '+01:00', // TODO: config file or ENV
  models: [
            SolarData,
            SolarDataDaySummary,
            SolarDataMonthSummary,
            SolarDataYearSummary,
          ]
});
