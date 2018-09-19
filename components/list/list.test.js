/* eslint-disable */
const request = require('supertest');
let instance;

describe('List routes', () => {
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

  it('POST /list should add new list to a board', async () => {
    const res = await request(instance.server).get('/api/group/testGroup1');
    const group = res.body;
    // add list to first board
    const postRes = await request(instance.server)
                      .post('/api/list')
                      .send({
                        groupName: group.groupName,
                        boardId: group.boards[0]._id,
                        listName: 'newListName',
                      });
    
    const updatedRes = await request(instance.server).get('/api/group/testGroup1');
    // new list will be at index 1 due to one list existing from seed data
    const { listName } = updatedRes.body.boards[0].lists[1];

    expect(postRes.status).toBe(201);
    expect(listName).toBe('newListName');
  });
});
