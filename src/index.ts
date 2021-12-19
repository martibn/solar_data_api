import * as express from 'express';
import { createServer } from 'http';
import { SolarDataController, SolarDataControllerUrl } from './controllers/SolarDataController';
import { DataCron } from './crons/DataCron';
import { sequelize } from './instances/sequelize';

const app = express();
const port = 3000;

app.use(SolarDataControllerUrl, SolarDataController);

new DataCron();

(async () => {
    await sequelize.sync({force:false});
  
    createServer(app)
      .listen(
        port,
        () => console.info(`Server running on port ${port}`)
      );
})();