import * as UserController from './controllers/user';

export default (router) => {
  router.get('/users', UserController.getAll);
  router.get('/api/v1/lookup-by-id/:id', UserController.getById);
};
