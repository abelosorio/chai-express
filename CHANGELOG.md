# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2018-09-18

### Added

- Added method `acceptRoute` used to check if router accepts or not a route. Thanks @sergioshev.

## [1.2.0] - 2018-04-27

### Added

- Use the third `simulateRouteDispatch`'s parameter as `Request` options.

## [1.1.3] - 2018-04-27

### Added

- It will throw an error if the done() callback of routeLayer.handle is called with one.

## [1.1.2] - 2018-04-26

### Added

- Add a `.npmignore` to exclude some files.

## [1.1.1] - 2018-04-26

### Fixed

- [FIX] Move `sinon` and `sinon-express-mock` to project's dependencies.

## [1.1.0] - 2018-04-26

### Added

- Provide helper `simulateRouteDispatch`.

## [1.0.0] - 2018-04-20

### Added

- Provide assertion `route`.