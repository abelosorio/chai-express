import sinon from 'sinon';

import { simulateRouteDispatch } from '../src';
import * as lib from '../src/lib';

describe('simulateRouteDispatch', () => {
  it('should be a function', () => {
    expect(simulateRouteDispatch).to.be.a('function');
  });

  it('should call to findRouteLayer once with the right arguments', () => {
    sinon.stub(lib, 'findRouteLayer').callsFake(() => ({
      handle: () => true
    }));

    simulateRouteDispatch('a', 'b', 'c');

    expect(lib.findRouteLayer).to.be.calledOnce;
    expect(lib.findRouteLayer).to.be.calledWith('a', 'b', 'c');

    lib.findRouteLayer.restore();
  });

  it('should call to the route\'s handler', () => {
    const handlerSpy = sinon.spy();

    sinon.stub(lib, 'findRouteLayer')
      .callsFake(() => ({ handle: handlerSpy }));

    simulateRouteDispatch(null, 'get');

    expect(handlerSpy).to.be.calledOnce;

    lib.findRouteLayer.restore();
  });

  it('should return a stub representing the Response object', () => {
    const handlerSpy = sinon.spy();

    sinon.stub(lib, 'findRouteLayer')
      .callsFake(() => ({ handle: () => true }));

    const res = simulateRouteDispatch(null, 'get');

    expect(res).to.exist;
    expect(res).to.be.an('object');
    expect(res.append).to.exist;
    expect(res.append.isSinonProxy).to.exist;
    expect(res.append.isSinonProxy).to.be.true;

    lib.findRouteLayer.restore();
  });

  it('should throw an exception if the route does not exists', () => {
    sinon.stub(lib, 'findRouteLayer').callsFake(() => undefined);

    expect(simulateRouteDispatch).to.throw();

    lib.findRouteLayer.restore();
  });
});
