var subarg = require('../');
var test = require('tape');

test('forward options', function (t) {
    var options = {
      forward: true,
      alias: { a: 'alpha', b: 'bravo', c: 'charlie' }
    };

    t.plan(1);

    t.deepEqual(
        subarg('-a [ -b [ -c 1 ] --charlie 2 ] --bravo 3'.split(/\s+/), options),
        {
            _: [],
            a: {
                _: [],
                b: {
                    _: [],
                    c: 1,
                    charlie: 1
                },
                bravo: {
                    _: [],
                    c: 1,
                    charlie: 1
                },
                c: 2,
                charlie: 2
            },
            alpha: {
                _: [],
                b: {
                    _: [],
                    c: 1,
                    charlie: 1
                },
                bravo: {
                    _: [],
                    c: 1,
                    charlie: 1
                },
                c: 2,
                charlie: 2
            },
            b: 3,
            bravo: 3
        }
    );
});
