import express from 'express';
import chai, { expect } from 'chai';

import chaiExpress from '../../src';

chai.use(chaiExpress);

export default () => {
  let app;
  let router;

  function initializeApp() {
    app = express();
    router = express.Router();
    app.use(router);
  }

  function setTestRoutes() {
    router.get('/users', (req, res) => res.send([1, 2, 3]));
  }

  before(() => {
    initializeApp();
    setTestRoutes();
  });

  it('should assert correctly that a route exists', () => {
    expect(router).to.have.route('get', /^\/users\/?$/i);
  });

  it('should assert correctly that a route doesn\'t exists', () => {
    expect(router).to.not.have.route('get', /^\/users_1\/?$/i);
    expect(router).to.not.have.route('put', /^\/users\/?$/i);
  });
};
