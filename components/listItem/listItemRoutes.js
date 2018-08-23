const {
  addListItemController,
  deleteListItemController,
  editListItemController,
} = require('./listItemControllers');

module.exports = (router) => {
  router.post('/listItem', addListItemController);
  router.delete('/listItem', deleteListItemController);
  router.patch('/listItem', editListItemController);
};
