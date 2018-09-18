import sinon from 'sinon';

import { simulateRouteDispatch } from '../src';
import * as lib from '../src/lib';

describe('simulateRouteDispatch', () => {
  let stubs = [];

  afterEach('Restore stubs', () => {
    stubs.forEach((stub) => stub.restore());
    stubs = [];
  });

  it('should be a function', () => {
    expect(simulateRouteDispatch).to.be.a('function');
  });

  it('should call to equalRegexpStrategy once with the right arguments', () => {
    stubs.push(
      sinon.stub(lib, 'equalRegexpStrategy').callsFake(() => ({
        handle: () => true
      }))
    );

    simulateRouteDispatch('a', 'b', 'c');

    expect(lib.equalRegexpStrategy).to.be.calledOnce;
    expect(lib.equalRegexpStrategy).to.be.calledWith('a', 'b', 'c');
  });

  it('should call to the route\'s handler', () => {
    const handlerSpy = sinon.spy();

    stubs.push(
      sinon.stub(lib, 'equalRegexpStrategy')
        .callsFake(() => ({ handle: handlerSpy }))
    );

    simulateRouteDispatch(null, 'get');

    expect(handlerSpy).to.be.calledOnce;
  });

  it('should return a stub representing the Response object', () => {
    const handlerSpy = sinon.spy();

    stubs.push(
      sinon.stub(lib, 'equalRegexpStrategy')
        .callsFake(() => ({ handle: () => true }))
    );

    const res = simulateRouteDispatch(null, 'get');

    expect(res).to.exist;
    expect(res).to.be.an('object');
    expect(res.append).to.exist;
    expect(res.append.isSinonProxy).to.exist;
    expect(res.append.isSinonProxy).to.be.true;
  });

  it('should throw an exception if the route does not exists', () => {
    stubs.push(
      sinon.stub(lib, 'equalRegexpStrategy').callsFake(() => undefined)
    );

    expect(simulateRouteDispatch).to.throw();
  });
});
