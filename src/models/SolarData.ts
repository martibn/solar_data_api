import { Column, Model, Table } from 'sequelize-typescript';

@Table({tableName: "solar_data", timestamps:false})
export class SolarData extends Model<SolarData,SolarData> {

    @Column({primaryKey:true})
    timestamp!: Date;
    
    @Column
    power_generated?: number;
    
    @Column
    grid_injection?: number;
    
    @Column
    grid_consumption?: number;

    @Column
    power_consumption?: number;

    public json(){
        return JSON.parse(JSON.stringify(this));
    }
};