import sinon from 'sinon';

import { simulateRouteDispatch } from '../../src';
import * as UserController from '../support/controllers/user';

export default () => {
  let spies = [];
  let router;

  before('Set spies', () => {
    spies.push(sinon.spy(UserController, 'getAll'));
    spies.push(sinon.spy(UserController, 'getById'));
  });

  before('Initialize', () => {
    router = initializeApp().router;
  });

  after('Reset spies', () => {
    spies.forEach((spy) => spy.restore());
    spies = [];
  });

  it('should assert correctly that it called to UserController.getAll', () => {
    simulateRouteDispatch(router, 'get', /^\/users\/?$/i);

    expect(UserController.getAll).to.be.calledOnce;
  });

  it('should assert correctly that it didn\'t call to UserController.getById', () => {
    simulateRouteDispatch(router, 'get', /^\/users\/?$/i);

    expect(UserController.getById).to.not.be.called;
  });
};
