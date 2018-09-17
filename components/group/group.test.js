/* eslint-disable */
let instance;

beforeEach(async () => {
  // spin up server/database
  instance = require('../../index');
  await instance.db.dropDatabase();
  // add seed data
  await require('../../services/seedDB')();
});

afterEach(() => instance.server.close());

test('empty group test', () => {});
