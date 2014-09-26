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

This can be traced back to an old version of jsdom, which doesn't have [this commit](https://github.com/tmpvar/jsdom/commit/b0f6c73cf5f1d1e8d3bda6f5f0b49b7567b9eeea). But if you include a new version of jsdom directly, you still get errors, now at runtime:

```
> jest-repro@ test /Users/danvk/code/jest-d3-repro
> jest __tests__/*

Found 1 matching test...
 FAIL  __tests__/CheckboxWithLabel-test.js (1.912s)
● CheckboxWithLabel › it changes the text after click
  - TypeError: /Users/danvk/code/jest-d3-repro/CheckboxWithLabel.js: /Users/danvk/code/jest-d3-repro/node_modules/jsdom/lib/jsdom.js: /Users/danvk/code/jest-d3-repro/node_modules/jsdom/lib/jsdom/level2/style.js: /Users/danvk/code/jest-d3-repro/node_modules/jsdom/lib/jsdom/level2/core.js: Cannot read property 'length' of undefined
        at Object.firstChild (/Users/danvk/code/jest-d3-repro/node_modules/jsdom/lib/jsdom/level1/core.js:466:28)
        at _getMetadata (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/lib/moduleMocker.js:279:49)
        at _getMetadata (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/lib/moduleMocker.js:286:23)
        at _getMetadata (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/lib/moduleMocker.js:279:27)
        at _getMetadata (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/lib/moduleMocker.js:279:27)
        at _getMetadata (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/lib/moduleMocker.js:279:27)
        at _getMetadata (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/lib/moduleMocker.js:279:27)
        at Object.module.exports.getMetadata (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/lib/moduleMocker.js:388:20)
        at Loader._generateMock (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:280:56)
        at Loader.requireMock (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:790:43)
        at Loader.requireModuleOrMock (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:905:17)
        at /Users/danvk/code/jest-d3-repro/node_modules/jsdom/lib/jsdom/level2/core.js:1:99
        at Object.runContentWithLocalBindings (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/lib/utils.js:315:17)
        at Loader._execModule (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:243:9)
        at Loader.requireModule (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:886:12)
        at Loader._generateMock (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:274:30)
        at Loader.requireMock (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:790:43)
        at Loader.requireModuleOrMock (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:905:17)
        at /Users/danvk/code/jest-d3-repro/node_modules/jsdom/lib/jsdom/level2/style.js:1:79
        at Object.runContentWithLocalBindings (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/lib/utils.js:315:17)
        at Loader._execModule (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:243:9)
        at Loader.requireModule (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:886:12)
        at Loader._generateMock (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:274:30)
        at Loader.requireMock (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:790:43)
        at Loader.requireModuleOrMock (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:905:17)
        at /Users/danvk/code/jest-d3-repro/node_modules/jsdom/lib/jsdom.js:8:13
        at Object.runContentWithLocalBindings (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/lib/utils.js:315:17)
        at Loader._execModule (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:243:9)
        at Loader.requireModule (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:886:12)
        at Loader.requireModuleOrMock (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:907:17)
        at /Users/danvk/code/jest-d3-repro/CheckboxWithLabel.js:3:13
        at Object.runContentWithLocalBindings (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/lib/utils.js:315:17)
        at Loader._execModule (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:243:9)
        at Loader.requireModule (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:886:12)
        at Loader.requireModuleOrMock (/Users/danvk/code/jest-d3-repro/node_modules/jest-cli/src/HasteModuleLoader/HasteModuleLoader.js:907:17)
        at Spec.<anonymous> (/Users/danvk/code/jest-d3-repro/__tests__/CheckboxWithLabel-test.js:9:29)
        at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)
1 test failed, 0 test passed (1 total)
Run time: 2.883s
npm ERR! Test failed.  See above for more details.
npm ERR! not ok code 0
```
