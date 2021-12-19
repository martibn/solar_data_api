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

        if(dto.Body.Data.Site.P_Grid > 0){
            current.power_consumption = dto.Body.Data.Site.P_PV + dto.Body.Data.Site.P_Grid;
            current.grid_injection = 0;
            current.grid_consumption = dto.Body.Data.Site.P_Grid;
        }else{
            current.power_consumption = dto.Body.Data.Site.P_PV + dto.Body.Data.Site.P_Grid;
            current.grid_injection = -1 * dto.Body.Data.Site.P_Grid;
            current.grid_consumption = 0;
        }
        
        current.power_generated = dto.Body.Data.Inverters["1"].P;

        /*
        {
        "Body":{
            "Data":{
                "Inverters":{
                    "1":{
                    "DT":78,
                    "E_Day":11624,
                    "E_Total":493677,
                    "E_Year":493677.09375,
                    "P":38
                    }
                },
                "Site":{
                    "E_Day":11624,
                    "E_Total":493677,
                    "E_Year":493677.09375,
                    "Meter_Location":"grid",
                    "Mode":"meter",
                    "P_Akku":null,
                    "P_Grid":595.12,
                    "P_Load":-633.12,
                    "P_PV":38,
                    "rel_Autonomy":6.002021733636593,
                    "rel_SelfConsumption":100
                },
                "Version":"12"
            }
        },
        "Head":{
            "RequestArguments":{
                
            },
            "Status":{
                "Code":0,
                "Reason":"",
                "UserMessage":""
            },
            "Timestamp":"2021-12-19T17:00:11+01:00"
        }
        }
        */
        

        return current;
    }
};