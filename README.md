jest-d3-repro
=============

Reproduction of a bug involving Jest and D3.

Here's a working test based on the [React/Jest tutorial](https://github.com/facebook/jest/blob/master/examples/react/__tests__/CheckboxWithLabel-test.js):
```
$ npm install
$ git reset --hard 82ef006
$ npm test

> jest-repro@ test /Users/danvk/code/jest-d3-repro
> jest __tests__/*

Found 1 matching test...
 PASS  __tests__/CheckboxWithLabel-test.js (1.745s)
1 test passed (1 total)
Run time: 3.871s
```

And here's a failing one:
```
$ npm install
$ git reset --hard 
$ npm test

> jest-repro@ test /Users/danvk/code/jest-d3-repro
> jest __tests__/*

Found 1 matching test...
 FAIL  __tests__/CheckboxWithLabel-test.js (1.802s)
● CheckboxWithLabel › it changes the text after click
  - Throws: Error: /Users/danvk/code/jest-d3-repro/CheckboxWithLabel.js: /Users/danvk/code/jest-d3-repro/node_modules/d3/index.js: /Users/danvk/code/jest-d3-repro/node_modules/d3/node_modules/jsdom/lib/jsdom.js: /Users/danvk/code/jest-d3-repro/node_modules/d3/node_modules/jsdom/lib/jsdom/level3/index.js: /Users/danvk/code/jest-d3-repro/node_modules/d3/node_modules/jsdom/lib/jsdom/level3/core.js: /Users/danvk/code/jest-d3-repro/node_modules/d3/node_modules/jsdom/lib/jsdom/level2/core.js: /Users/danvk/code/jest-d3-repro/preprocessor.js: Parse Error: Line 432: Unexpected token )
1 test failed, 0 test passed (1 total)
Run time: 2.777s
npm ERR! Test failed.  See above for more details.
npm ERR! not ok code 0
```

The only difference is the addition of this line to `CheckboxWithLabel.js`:

```javascript
var d3 = require('d3');
```
