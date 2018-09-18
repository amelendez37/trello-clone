/* eslint-disable */
const request = require('supertest');
let instance;

describe('Board routes', () => {
  beforeEach(async () => {
    // spin up server
    instance = require('../../index');
    // drop database
    await instance.db.dropDatabase();
    // add seed data
    await require('../../services/seedDB')();
  });

  afterEach(() => {
    instance.server.close();
  });

  it('POST /board should add a new board to a group', async () => {
    const postRes = await request(instance.server)
      .post('/api/board')
      .send({
        groupName: 'testGroup1',
        boardName: 'newTestBoard'
      });

    const getRes = await request(instance.server).get('/api/group/testGroup1');
    const { body } = getRes;
    const { status } = postRes;

    expect(status).toBe(201);
    // check 3rd board due to 2 boards already existing from seed data
    expect(body.boards[2].boardName).toBe('newTestBoard');
  });
});
