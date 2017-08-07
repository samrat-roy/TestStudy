process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

import config from '../config';
import initApp from './init-app';
import setRoutes from './init-api';

const app = initApp(config);
setRoutes(app);

export default app;
