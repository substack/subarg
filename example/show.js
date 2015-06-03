var subarg = require('../');
var argv = subarg(process.argv.slice(2));
console.log(JSON.stringify(argv, null, 2));
