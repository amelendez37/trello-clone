const {
  addListController,
} = require('./listControllers');

module.exports = (router) => {
  router.post('/list', addListController);
  // router.delete('/list', listController);
  // router.patch('/list', listController);
};
