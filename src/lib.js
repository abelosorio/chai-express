import * as sinonExpress from 'sinon-express-mock';

export function acceptsRouterRoute(router, method, testElement) {
  return findRouteLayer(
    routerRegexpMatchRouteStrategy
  )(routeRegexp, method, testElement) !== undefined;
}

export function hasRouterRoute(router, method, testElement) {
  return findRouteLayer(
    equalRegexpStrategy
  )(router, method, testElement) !== undefined;
}

export function findRouteLayer(strategy) {
  return (router, method, route) => strategy(router, method, route)
}

export function routerRegexpMatchRouteStrategy(router, method, routeStr) {
  return router.stack.find(layer => {
    if (!layer.route.methods[method]) return false;
    return routeStr.search(layer.regexp) == 0;
  })
}

export function equalRegexpStrategy(router, method, routeRegexp) {
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

export function dispatchRoute(routeLayer, method, reqData = {}) {
  if (!routeLayer || typeof routeLayer.handle !== 'function') {
    throw new Error('Cannot dispatch a route if this is not given');
  }

  const res = mockRes();

  routeLayer.handle(
    mockReq({ ...reqData, method }),
    res,
    (err) => { throw err; }
  );

  return res;
}
