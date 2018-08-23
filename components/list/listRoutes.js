const {
  addListController,
  deleteListController,
  editListController,
} = require('./listControllers');

module.exports = (router) => {
  router.post('/list', addListController);
  router.delete('/list', deleteListController);
  router.patch('/list', editListController);
};
