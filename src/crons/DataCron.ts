import { CronJob } from "cron";
import axios from 'axios';
import { SolarData } from "../models/SolarData";
import SolarDataMapper from "../mapper/GetArchiveDataMapper";
import { GetArchiveData } from "../dto/GetArchiveData";

export class DataCron {
    private cron : CronJob;
    private lastDataStr : String = "";
    private lastDate: Date = new Date();

    constructor() {

        this.cron = new CronJob("* * * * * *", async () => {
            await SolarData.findAll({
                limit: 1,
                order:[['timestamp','DESC']]
            }).then((entries) => {
                if(entries && entries.length != 0){
                    this.lastDate = entries[0].timestamp;
                }else{
                    this.lastDate = new Date("11/04/2021");
                }
                
                this.lastDataStr = new Date(this.lastDate).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' }).split("/").join(".");
                this.job();
            }); 
            
        });

        this.cron.start();

    }

    private job(){
        this.cron.stop();

        const nextDate: Date = new Date(this.lastDate.getTime() + (1000 * 3600 * 24) * 16);
        const nowStr : String = nextDate.toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' }).split("/").join(".");

        axios.get<GetArchiveData>("http://192.168.1.139/solar_api/v1/GetArchiveData.cgi?Scope=System&StartDate=" + this.lastDataStr + "&EndDate=" + nowStr + "&Channel=PowerReal_PAC_Sum&Channel=EnergyReal_WAC_Plus_Absolute&Channel=EnergyReal_WAC_Minus_Absolute", {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
          const models : SolarData[] = SolarDataMapper.getArchiveDataMapperToModel(response.data);

          SolarData.bulkCreate(models.map(x => x.json()),
            {
                updateOnDuplicate: ['power_generated']
          });
          this.cron.start();
      });
    }

};