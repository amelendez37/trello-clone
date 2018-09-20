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

  afterEach(() => instance.server.close());

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

  it('DELETE /board should delete a board', async () => {
    const res = await request(instance.server).get('/api/group/testGroup1');
    const boardId = res.body.boards[0]._id;
    // delete first board
    const deleteRes = await request(instance.server)
      .delete('/api/board')
      .send({
        groupName: 'testGroup1',
        boardId,
      });
    
    const updatedRes = await request(instance.server).get('/api/group/testGroup1');
    const updatedBoard = updatedRes.body.boards[0];

    expect(deleteRes.status).toBe(200);
    // board at position 0 should now be testBoard2 since testBoard1 was deleted
    expect(updatedBoard.boardName).toBe('testBoard2');
  });

  it('PATCH /board should edit a board\'s name', async () => {
    const res = await request(instance.server).get('/api/group/testGroup1');
    const group = res.body;
    const boardToEdit = res.body.boards[0];

    expect(boardToEdit.boardName).toBe('testBoard1');

    const editRes = await request(instance.server)
      .patch('/api/board')
      .send({
        groupName: group.groupName,
        boardId: boardToEdit._id,
        newBoardName: 'editedBoardName',
      });

    const updatedRes = await request(instance.server).get('/api/group/testGroup1');
    const updatedBoard = updatedRes.body.boards[0];
    
    expect(editRes.status).toBe(200);
    expect(updatedBoard.boardName).toBe('editedBoardName');
  });
});
