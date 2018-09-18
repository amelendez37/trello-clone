/* eslint-disable */
const request = require('supertest');
let instance;

describe('Group routes', () => {
  beforeEach(async () => {
    // spin up server
    instance = require('../../index');
    // drop database
    await instance.db.dropDatabase();
    // add seed data
    await require('../../services/seedDB')();
  });

  afterEach(() => instance.server.close());

  it('GET /group/:groupName should return all data associated with a group', async () => {
    const res = await request(instance.server).get('/api/group/testGroup1');
    const { status, body } = res;

    expect(status).toBe(200);
    expect(body.groupName).toBe('testGroup1');
    expect(body.boards[0].boardName).toBe('testBoard1');
    expect(body.boards[0].lists[0].listName).toBe('testList1');
    expect(body.boards[0].lists[0].listItems[0].text).toBe('testListItem1');
    expect(body.boards[1].boardName).toBe('testBoard2');
    expect(body.boards[1].lists[0].listName).toBe('testList2');
    expect(body.boards[1].lists[0].listItems[0].text).toBe('testListItem2');
  });

  it('GET /group/:groupName should return 404 if group doesn\'t exist', async () => {
    const res = await request(instance.server).get('/api/group/nonExistentGroup');
    const { status, body } = res;

    expect(status).toBe(404);
  });

  it('POST /group should save a new group if group name does not already exist', async () => {
    const res = await request(instance.server)
                  .post('/api/group')
                  .send({ groupName: 'newTestGroup' });
    const createdGroup = await request(instance.server).get('/api/group/newTestGroup');
    const { body } = createdGroup;

    expect(res.status).toBe(201);
    expect(body.groupName).toBe('newTestGroup');
  });

  it('PATCH /group/updateBoards should update order of boards', async () => {
    const res = await request(instance.server).get('/api/group/testGroup1');
    let temp;

    temp = res.body.boards[0];
    res.body.boards[0] = res.body.boards[1];
    res.body.boards[1] = temp;

    await request(instance.server)
      .patch('/api/group/updateBoards')
      .send({
        groupName: 'testGroup1',
        updatedBoards: res.body.boards,
      });

    const updatedRes = await request(instance.server).get('/api/group/testGroup1');
    const { body, status } = updatedRes;

    expect(status).toBe(200);
    expect(body.boards[0].boardName).toBe('testBoard2');
  });
});
