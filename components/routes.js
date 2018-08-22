const router = require('express').Router();
const { groupController, addGroupController } = require('./group/groupControllers');
const {
  addBoardController,
  deleteBoardController,
  editBoardController,
} = require('./board/boardControllers');

router.post('/board', addBoardController);
router.delete('/board', deleteBoardController);
router.patch('/board', editBoardController);

router.get('/group/:groupname', groupController);
router.post('/group', addGroupController);

// router.post('/list', listController);
// router.delete('/list', listController);
// router.patch('/list', listController);

// router.post('/listItem', listItemController);
// router.delete('/listItem', listItemController);
// router.patch('/listItem', listItemController);

module.exports = router;
