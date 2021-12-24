import { GetArchiveData } from "../dto/GetArchiveData";
import { GetPowerFlowRealtimeData } from "../dto/GetPowerFlowRealtimeData";
import { SolarData } from "../models/SolarData";

export default class SolarDataMapper{

    static getArchiveDataMapperToModel(model : GetArchiveData) : SolarData[]{
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

    static getPowerFlowRealtimeDataMapperToDTO(dto : GetPowerFlowRealtimeData) : SolarData{
        const current: SolarData = new SolarData();
        current.timestamp = new Date(dto.Head.Timestamp);

        current.power_consumption = Math.round((Math.abs(dto.Body.Data.Site.P_Load + Number.EPSILON) * 100) / 100);
        current.power_generated = Math.round((dto.Body.Data.Inverters["1"].P + Number.EPSILON) * 100) / 100;

        if(dto.Body.Data.Site.P_Grid >= 0){
            current.grid_injection = 0;
            current.grid_consumption = Math.round((dto.Body.Data.Site.P_Grid + Number.EPSILON) * 100) / 100;
        }else{
            current.grid_injection = Math.round((Math.abs(dto.Body.Data.Site.P_Grid) + Number.EPSILON) * 100) / 100;;
            current.grid_consumption = 0;
        }
        
        return current;
    }
};