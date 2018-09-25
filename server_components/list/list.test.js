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

  afterEach(() => instance.server.close());

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

  it('DELETE /list should remove a list from a board', async () => {
    const res = await request(instance.server).get('/api/group/testGroup1');
    const { groupName, boards } = res.body;
    const board = boards[0];

    const deleteRes = await request(instance.server)
                        .delete('/api/list')
                        .send({
                          groupName,
                          boardId: board._id,
                          listId: board.lists[0]._id,
                        });
    
    const updatedRes = await request(instance.server).get('/api/group/testGroup1');
    const listLength = updatedRes.body.boards[0].lists.length;

    expect(deleteRes.status).toBe(200);
    expect(listLength).toBe(0);
  });

  it('PATCH /list should edit list text', async () => {
    const res = await request(instance.server).get('/api/group/testGroup1');
    const { groupName, boards } = res.body;
    const listId = boards[0].lists[0]._id;

    const patchRes = await request(instance.server)
                      .patch('/api/list')
                      .send({
                        groupName,
                        boardId: boards[0]._id,
                        listId,
                        newListName: 'newListName',
                      });
    
    const updatedRes = await request(instance.server).get('/api/group/testGroup1');
    const { listName } = updatedRes.body.boards[0].lists[0];

    expect(patchRes.status).toBe(200);
    expect(listName).toBe('newListName');
  });

  it('PATCH /list/updateListItems should update order of list items', async () => {
    const res = await request(instance.server).get('/api/group/testGroup1');
    const group = res.body;
    const { text } = res.body.boards[0].lists[0].listItems[0];
    const { listItems } = group.boards[0].lists[0];

    expect(text).toBe('testListItem1');

    // swap list items
    const temp = listItems[0];
    listItems[0] = listItems[1];
    listItems[1] = temp;

    const patchRes = await request(instance.server)
                      .patch('/api/list/updateListItems')
                      .send({
                        groupName: group.groupName,
                        boardId: group.boards[0]._id,
                        listId: group.boards[0].lists[0]._id,
                        updatedListItems: listItems,
                      });
    
    const updatedRes = await request(instance.server).get('/api/group/testGroup1');
    const updatedText = res.body.boards[0].lists[0].listItems[0].text;

    expect(patchRes.status).toBe(200);
    expect(updatedText).toBe('testListItem2');
  });
});
