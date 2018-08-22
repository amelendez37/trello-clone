const {
  groupController,
  addGroupController,
} = require('./groupControllers');

module.exports = (router) => {
  router.get('/group/:groupname', groupController);
  router.post('/group', addGroupController);
};
