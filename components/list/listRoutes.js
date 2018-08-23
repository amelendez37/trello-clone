const {
  addListController,
  deleteListController,
} = require('./listControllers');

module.exports = (router) => {
  router.post('/list', addListController);
  router.delete('/list', deleteListController);
  // router.patch('/list', listController);
};
