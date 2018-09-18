const mongoose = require('mongoose');

const Group = mongoose.model('Group');

/**
 * @param {Object} data - An object representing a group
 */
module.exports = async () => {
  const newGroup = {
    groupName: 'testGroup1',
    boards: [
      {
        boardName: 'testBoard1',
        lists: [
          {
            listName: 'testList1',
            listItems: [
              {
                text: 'testListItem1',
                completed: false,
              },
            ],
          },
        ],
      },
      {
        boardName: 'testBoard2',
        lists: [
          {
            listName: 'testList2',
            listItems: [
              {
                text: 'testListItem2',
                completed: false,
              },
            ],
          },
        ],
      },
    ],
  };

  const groupData = new Group(newGroup);
  await groupData.save();
};
