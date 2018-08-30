const {
  findGroupController,
  addGroupController,
} = require('./groupControllers');

module.exports = (router) => {
  router.get('/group/:groupName', findGroupController);
  router.post('/group', addGroupController);
};
