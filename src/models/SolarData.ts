import { Table } from 'sequelize-typescript';
import { AbstractSolarData } from './AbstractSolarData';

@Table({tableName: "solar_data", timestamps:false})
export class SolarData extends AbstractSolarData<SolarData> {

};