import { Table } from 'sequelize-typescript';
import { AbstractSolarData } from './AbstractSolarData';

@Table({tableName: "solar_data_month_summary", timestamps:false})
export class SolarDataMonthSummary extends AbstractSolarData<SolarDataMonthSummary> {

};