import chai from 'chai';
import sinonChai from 'sinon-chai';
import express from 'express';

import chaiExpress from '../../src';
import setRoutes from './routes';

const initializeApp = () => {
  // Set express server and routes
  const app = express();
  const router = express.Router();
  app.use(router);
  setRoutes(router);

  return { router, app };
};

// Use our helper
chai.use(chaiExpress);

// Other helpers
chai.use(sinonChai);

global.chai = chai;
global.initializeApp = initializeApp;
