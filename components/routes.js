const router = require('express').Router();
const {
  addGroupController,
  groupController,
} = require('./group/groupControllers');

// router.get('/board', boardController);
// router.post('/board', boardController);

// router.get('/list', listController);
// router.post('/list', listController);

// router.get('/listItem', listItemController);
// router.post('/listItem', listItemController);

router.get('/group/:groupname', groupController);
router.post('/group', addGroupController);

module.exports = router;
