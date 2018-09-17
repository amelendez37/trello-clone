const mongoose = require('mongoose');

const Group = mongoose.model('Group');

/**
 * @param {Object} data - An object representing a group
 */
module.exports = async () => {
  const newGroup = {
    groupName: 'test_group_1',
    boards: [
      {
        boardName: 'test_board_1',
        lists: [
          {
            listName: 'test_list_1',
            listItems: [
              {
                text: 'test_listItem_1',
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
