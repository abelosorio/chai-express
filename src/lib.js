import * as sinonExpress from 'sinon-express-mock';

export function hasRouterRoute(router, method, routeRegexp) {
  return findRouteLayer(router, method, routeRegexp) !== undefined;
}

export function findRouteLayer(router, method, routeRegexp) {
  return router.stack.find(layerMatchesRoute(method, routeRegexp));
}

export function layerMatchesRoute(method, routeRegexp) {
  return (layer) => {
    if (String(layer.regexp) !== String(routeRegexp)) return false;
    if (!layer.route.methods[method]) return false;

    return true;
  }
}

export function mockReq(options = {}) {
  return sinonExpress.mockReq(options);
}

export function mockRes(options = {}) {
  return sinonExpress.mockRes(options);
}

export function dispatchRoute(routeLayer, method) {
  if (!routeLayer || typeof routeLayer.handle !== 'function') {
    throw new Error('Cannot dispatch a route if this is not given');
  }

  const res = mockRes();

  routeLayer.handle(mockReq({ method }), res, (err) => { throw err; });

  return res;
}
