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
