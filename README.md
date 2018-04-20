# chai-express
[![Build Status](https://travis-ci.org/abelosorio/chai-express.svg?branch=master)](https://travis-ci.org/abelosorio/chai-express) [![NPM version](https://img.shields.io/npm/v/chai-express.svg)](https://www.npmjs.com/package/chai-express)

It provides useful [Chai's assertions](https://www.npmjs.com/package/chai)  to use in [Express' routes](https://www.npmjs.com/package/express).

## Installation

```javascript
npm install --save-dev chai-express
```

## How to use

### src/app.js (minimal configuration for tests to work)

```
import express from 'express';

const app = express();
const router = express.Router();

app.use(router);

router.get('/users', UsersController.getAll);

export { router, app as default };
```

### test/routes.js

```
import chai from 'chai';
import chaiExpress from 'chai-express';

import { router } from '../src/app';

chai.use(chaiExpress);

describe('routes', () => {
  describe('GET /users', () => {
    it('should define it', () => {
      expect(router).to.have.route(/^\/users_1\/?$/i);
    });
  });
});
```

**Small advice:** As far as I worked with API tests, I'd recommend you to have one directoy per route, and have all its tests inside it.

```
  tests
  |
  +--> routes
           |
           +-->user
           |       |
           |       +--> create
           |       +--> list_all
           |       +--> ...
           +--> car
           |       +--> ...
           |
           +--> ...
```

## What should you test in an API router?

This is something I've been thinking and discussing with people I work with or I know. So, feel free to put your comments our thoughts in an [issue](https://github.com/abelosorio/chai-express/issues) if you want.

This checklist is meant to suit in a well moduled API framework. This means that you will need *at least* to move your route handlers to controllers.

So, the checklist:

- Check if the route is defined **(supported)**
- Check if the route accepts the right parameters **(not supported yet)**
- Check if the route calls to the right controller's method **(not supported yet)**
- Check if the route has the right  ACLs **(not supported yet)**

You will notice that we are not testing the endpoints. In this point we don't care if they work properly or respond as expected.

Why? Express has (or should have) its own tests. So, we delegate the **responsibility** of responding to a route to Express. Thus, the router is not responsible for calling to any model or perform no other action but **calling a controller's function**. In that way, the responsible for calling to models and perform actions would be the **controller** and, of course, we have another `test/controllers` directoy testing all our controllers.

## Contribute

Please do it! If you have any idea please [create an issue](https://github.com/abelosorio/chai-express/issues) and we can discuss about it.


## Issues
https://github.com/abelosorio/chai-express/issues