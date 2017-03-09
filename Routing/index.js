/**
 * Created by apple on 17/3/9.
 */

var server = require("./server");
var router = require("./route");

server = new server();
router = new router();

server.start(router.displayroute);
