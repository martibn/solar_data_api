import { Column, Model } from 'sequelize-typescript';

export class AbstractSolarData<T> extends Model<T,T> {

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