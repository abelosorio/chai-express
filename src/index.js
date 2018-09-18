import * as lib from './lib';

export default function(chai, utils) {
  utils.addMethod(
    chai.Assertion.prototype,
    'route',
    function(method, route) {
      this.assert(
        lib.hasRouterRoute(this._obj, method, route),
        `expected router to have the route [${method}] ${route}`,
        `expected router to not have the route [${method}] ${route}`
      )
    }
  );

  utils.addMethod(
    chai.Assertion.prototype,
    'acceptRoute',
    function(method, route) {
      this.assert(
        lib.acceptsRouterRoute(this._obj, method, route),
        `expected router to accept provided route [${method}] ${route}`,
        `expected router to not accept provied route [${method}] ${route}`
      )
    }
  );
}

export function simulateRouteDispatch(router, method, routeRegexp, reqData) {
  const findStrategy = lib.equalRegexpStrategy;
  const routeLayer = lib.findRouteLayer(findStrategy)(router, method, routeRegexp);

  if (!routeLayer) {
    throw new Error(`The route [${method}] ${routeRegexp} does not exists`);
  }

  return lib.dispatchRoute(routeLayer, method, reqData);
}
