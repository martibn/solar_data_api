import { Table } from 'sequelize-typescript';
import { AbstractSolarData } from './AbstractSolarData';

@Table({tableName: "solar_data_year_summary", timestamps:false})
export class SolarDataYearSummary extends AbstractSolarData<SolarDataYearSummary> {

};