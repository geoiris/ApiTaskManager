'use strict';
var internal = require('./tasks/mongo/internal');

// Do the bridge
exports.getAll = internal.getAll;
exports.remove = internal.remove;
exports.update = internal.update;
exports.add = internal.add;