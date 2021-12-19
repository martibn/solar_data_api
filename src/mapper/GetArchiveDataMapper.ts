import { GetArchiveData } from "../model/GetArchiveData";
import { SolarData } from "../models/SolarData";

export default class GetArchiveDataMapper{

    static dtoToModel(model : GetArchiveData) : SolarData[]{
        let currentTime : number = new Date(model.Body.Data["inverter/1"].Start).getTime();
        const watts = model.Body.Data["inverter/1"].Data.PowerReal_PAC_Sum.Values;
        const absolute = model.Body.Data["meter:IME - Smart Meter 63A-1 - 19120744"].Data.EnergyReal_WAC_Plus_Absolute.Values;
        const minus = model.Body.Data["meter:IME - Smart Meter 63A-1 - 19120744"].Data.EnergyReal_WAC_Minus_Absolute.Values;

        let lastAbsolute = absolute["0"];
        let lastMinus = minus["0"];
        let ret : SolarData[] = [];

        for(const props in watts){
            const powerGenerated = watts[props];
            const gridInjected = (minus[props] - lastMinus) * 12;
            const gridConsumed = (absolute[props] - lastAbsolute) * 12;
            
            const s : SolarData = new SolarData();
            s.timestamp = new Date(currentTime + (parseInt(props) * 1000));
            s.power_consumption = powerGenerated - gridInjected + gridConsumed;
            s.power_generated = powerGenerated;
            s.grid_consumption = gridConsumed;
            s.grid_injection = gridInjected;

            lastAbsolute = absolute[props];
            lastMinus = minus[props];

            ret.push(s);
        }
        
        return ret;
    }
};