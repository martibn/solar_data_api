import {createServer} from 'http';
import {DataCron} from './crons/DataCron';
import {sequelize} from './config/sequelize';
import API from "./config/express";

(async () => {
    const PORT = 3000; // TODO: config file or ENV

    new DataCron();

    await sequelize.sync({force:false});
  
    createServer(API).listen(PORT, () =>
        logger.info(`Server running on port ${PORT}`)
    );
})();
