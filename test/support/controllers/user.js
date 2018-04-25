import faker from 'faker';
import _ from 'lodash';

const generateFakeUser = () => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  userName: faker.internet.userName()
});

export function getAll(req, res) {
  res.send(_.times(faker.random.number(10)).forEach(generateFakeUser));
}

export function getById(req, res) {
  res.send(generateFakeUser());
}
