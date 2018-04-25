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
}

export function simulateRouteDispatch(router, method, routeRegexp, options = {}) {
  const routeLayer = lib.findRouteLayer(router, method, routeRegexp);

  if (!routeLayer) {
    throw new Error(`The route [${method}] ${routeRegexp} does not exists`);
  }

  return lib.dispatchRoute(routeLayer, method);
}
