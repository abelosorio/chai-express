# chai-express
[![Build Status](https://travis-ci.org/abelosorio/chai-express.svg?branch=master)](https://travis-ci.org/abelosorio/chai-express) [![NPM version](https://img.shields.io/npm/v/chai-express.svg)](https://www.npmjs.com/package/chai-express)

It provides useful [Chai's assertions](https://www.npmjs.com/package/chai)  to use in [Express' routes](https://www.npmjs.com/package/express).

## Installation

```
npm install --save-dev chai-express
npm install --save-dev sinon sinon-chai # if you want to use  my approach for simulateRouteDispatch.
```

## How to use

### src/app.js (minimal configuration for tests to work)

```javascript
import express from 'express';

const app = express();
const router = express.Router();

app.use(router);

require('./routes/user')(router);

export { router, app as default };
```

### src/controllers/user.js
```javascript
import User from '../models/user';

export function getAll(req, res) {
  res.send(User.findAll());
}
```

### src/routes/user.js
```javascript
import * as UserController from '../controllers/user';

export default function (router) {
  router.get('/users', UserController.getAll);
}
```

### test/routes/user.js

```javascript
import chai from 'chai';
import chaiExpress, { simulateRouteDispatch } from 'chai-express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { router } from '../src/app';
import * as UserController from '../src/controllers/user';

chai.use(chaiExpress);
chai.use(sinonChai);

describe('routes', () => {
  describe('GET /users', () => {
    it('should define it', () => {
      expect(router).to.have.route(/^\/users_1\/?$/i);
    });

    it('should call to the right controller', () => {
      sinon.spy(UserController, 'getAll');

      simulateRouteDispatch(router, 'get', /^\/users_1\/?$/i);

      expect(UserController.getAll).to.be.calledOnce;

      UserController.getAll.restore();
    });
  });
});
```

## Motivation

I'll write this from my point of view using what I learned so far and trying to use as many references as I can. Feel free to put your comments or thoughts in an [issue](https://github.com/abelosorio/chai-express/issues) if you want.

### The problem I found

In every single article or post I've read related to testing routes I found the same problems:

1.  Those are not unit tests.
2.  Those tests are not testing only the routes, but also the controllers.

As [J.B. Rainsberger said](https://vimeo.com/80533536) it's almost impossible to write **unit** tests. Instead we try to isolate functionality and test it in an isolated and reduced scope. Hence Rainsberger prefers to use the term **Isolated tests**. And I do prefer it too.

Before moving on I should mention another thing I noticed in these articles. They do not divide controllers from routes. They show source code like this:

`route/users.js`:
```javascript
// ...
router.get('/users/all', (req, res) => res.send(User.findAll()));
// ...
```

In that code the route and the controller are defined in a single line. There is no clearly distinction between controller and route's responsibility.

Again, this is not what I learned. Christopher Okhravi is very clear [in this video](https://www.youtube.com/watch?v=AEnePs2Evg0) about what *Single Responsibility* is: a single reason to change.

In the code above there are multiple reasons to change. Just to mention some:

1.  The route could change from `/users/all` to just `/users`.
2.  We could expect a JSON output instead of a plain stringified object.
3.  The User model's method `findAll` could change to `getAll`, or change its arguments.

### A possible solution

The first refactor we should perform in this code is to lift up the controller's function to an another file:

`controllers/user.js`:
```javascript
// ...
export function getAll(req, res) {
  return res.send(User.findAll();
}
```

`routes/user.js`:
```javascript
import * as UserController from '../controllers/user';

//...
router.get('/users/all', UserController.getAll);
//...
```

A lot better, isn't it?

So, what should we test now? Remember, we are testing our API **router**.

## What should you test in an API router?

This checklist is meant to suit in a well modularized API framework. This means that you will need *at least* to move your route handlers to controllers as shown [here](#a-possible-solution).

So, the checklist:

- Check if the route is defined.
- Check if the route accepts the right parameters.
- Check if the route calls to the right controller's method.
- Check if the route has the right  ACLs.

You will notice that we are not testing the endpoints. In this point we don't care if they work properly or respond as expected.

Why? Express has (or should have) its own tests. So, we delegate the **responsibility** of responding to a route to Express. Thus, the router is not responsible for calling to any model or perform no other action but **calling a controller's function**. In that way, the responsible for calling to models and perform actions would be the **controller** and, of course, we have another `test/controllers` directoy testing all our controllers.

## Changelog

### 1.1.0

- Provide helper `simulateRouteDispatch`.

### 1.0.0

- Provide assertion `route`.

## Contribute

Please do it! If you have any idea please [create an issue](https://github.com/abelosorio/chai-express/issues) and we can discuss about it.


## Issues
[https://github.com/abelosorio/chai-express/issues](https://github.com/abelosorio/chai-express/issues)