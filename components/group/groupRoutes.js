const {
  findGroupController,
  addGroupController,
} = require('./groupControllers');

module.exports = (router) => {
  router.get('/group/:groupname', findGroupController);
  router.post('/group', addGroupController);
};
