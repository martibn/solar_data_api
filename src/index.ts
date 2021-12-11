import * as express from 'express';
import { createServer } from 'http';
import { SolarDataController } from './controllers/SolarDataController';
import { sequelize } from './instances/sequelize';

const app = express();
const port = 3000;

app.use("/solar_data", SolarDataController);

(async () => {
    await sequelize.sync({force:false});
  
    createServer(app)
      .listen(
        port,
        () => console.info(`Server running on port ${port}`)
      );
})();