/* eslint-disable */
const request = require('supertest');

describe('List item routes', () => {
  beforeEach(async () => {
    // spin up server
    instance = require('../../index');
    // drop database
    await instance.db.dropDatabase();
    // add seed data
    await require('../../services/seedDB')();
  });

  afterEach(() => instance.server.close());

  it('POST /listItem should add a list item to a list', async () => {
    const res = await request(instance.server).get('/api/group/testGroup1');

    const group = res.body;
    const { groupName } = group;
    const boardId = group.boards[0]._id;
    const listId = group.boards[0].lists[0]._id;

    const postRes = await request(instance.server)
                      .post('/api/listItem')
                      .send({
                        groupName,
                        boardId,
                        listId,
                        text: 'newListItem'
                      });

    const updatedRes = await request(instance.server).get('/api/group/testGroup1');
    // first two list items already exist from seed data
    const addedListItem = updatedRes.body.boards[0].lists[0].listItems[2];

    expect(postRes.status).toBe(201);
    expect(addedListItem.text).toBe('newListItem');
  });
});
