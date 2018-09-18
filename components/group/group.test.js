/* eslint-disable */
const request = require('supertest');
let instance;

describe('Group routes', () => {
  beforeEach(async () => {
    // spin up server/database
    instance = require('../../index');
    await instance.db.dropDatabase();
    // add seed data
    await require('../../services/seedDB')();
  });

  afterEach(() => instance.server.close());

  it('GET /group/:groupName should return all data associated with a group', async () => {
    const res = await request(instance.server).get('/api/group/test_group_1');
    const { status, body } = res;

    expect(status).toBe(200);
    expect(body.groupName).toBe('test_group_1');
    expect(body.boards[0].boardName).toBe('test_board_1');
    expect(body.boards[0].lists[0].listName).toBe('test_list_1');
    expect(body.boards[0].lists[0].listItems[0].text).toBe('test_listItem_1');
  });
});
