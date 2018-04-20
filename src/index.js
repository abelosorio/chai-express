export default function(chai, utils) {
  utils.addMethod(
    chai.Assertion.prototype,
    'route',
    function(method, route) {
      this.assert(
        hasRouterRoute(this._obj, method, route),
        `expected router to have the route [${method}] ${route}`,
        `expected router to not have the route [${method}] ${route}`
      )
    }
  );
}

function hasRouterRoute(router, method, routeRegexp) {
  return findRouteLayer(router, method, routeRegexp) !== undefined;
}

function findRouteLayer(router, method, routeRegexp) {
  return router.stack.find(layerMatchesRoute(method, routeRegexp));
}

function layerMatchesRoute(method, routeRegexp) {
  return (layer) => {
    if (String(layer.regexp) !== String(routeRegexp)) return false;
    if (!layer.route.methods[method]) return false;

    return true;
  }
}
