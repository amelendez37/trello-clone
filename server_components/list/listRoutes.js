const {
  addListController,
  deleteListController,
  editListController,
  updateListItemsController,
} = require('./listControllers');

module.exports = (router) => {
  router.post('/list', addListController);
  router.delete('/list', deleteListController);
  router.patch('/list', editListController);
  router.patch('/list/updateListItems', updateListItemsController);
};
