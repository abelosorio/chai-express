import * as UserController from './controllers/user';

export default (router) => {
  router.get('/users', UserController.getAll);
};
