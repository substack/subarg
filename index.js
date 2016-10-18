var minimist = require('minimist');

module.exports = function parse (args, opts) {
    var level = 0, index;
    var args_ = [];
    var minopts = {};

    for (var key in opts) {
      if (opts.hasOwnProperty(key) && key !== 'forward') {
        minopts[key] = opts[key];
      }
    }

    for (var i = 0; i < args.length; i++) {
        if (typeof args[i] === 'string' && /^\[/.test(args[i])) {
            if (level ++ === 0) {
                index = i;
            }
        }
        if (typeof args[i] === 'string' && /\]$/.test(args[i])) {
            if (-- level > 0) continue;

            var sub = args.slice(index, i + 1);
            if (typeof sub[0] === 'string') {
                sub[0] = sub[0].replace(/^\[/, '');
            }
            if (sub[0] === '') sub.shift();

            var n = sub.length - 1;
            if (typeof sub[n] === 'string') {
                sub[n] = sub[n].replace(/\]$/, '');
            }
            if (sub[n] === '') sub.pop();

            args_.push(parse(sub, opts && opts.forward && opts));
        }
        else if (level === 0) args_.push(args[i]);
    }

    var argv = minimist(args_, minopts);
    return argv;
};
