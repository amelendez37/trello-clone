const router = require('express').Router();

// expose router to individual routes
require('./board/boardRoutes')(router);
require('./group/groupRoutes')(router);
require('./list/listRoutes')(router);
require('./listItem/listItemRoutes')(router);

module.exports = router;
