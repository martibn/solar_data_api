import { Table } from 'sequelize-typescript';
import { AbstractSolarData } from './AbstractSolarData';

@Table({tableName: "solar_data_day_summary", timestamps:false})
export class SolarDataDaySummary extends AbstractSolarData<SolarDataDaySummary> {

};