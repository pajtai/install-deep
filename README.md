# install-deep

Recursively npm install all package.json outside node_modules. Will not run
npm install on the root package.json.

This is useful if you structure your app as smaller modularized bits of code, following 
something similar to [this](https://strongloop.com/strongblog/modular-node-js-express/).
That post has a script in it, but it assumes you only go one level deep.

## Usage

Suggested usage is in `scripts.postinstall` of root package.json.

`npm install --save-dev install-deep`

`installDeep(options)`

```javascript
const installDeep = require('install-deep');

installDeep()
    .then(() => console.log('all done'); )
    .catch((e) => console.log('error:', e); );
```

## Options

* `installer` : app to be used for installation. Possible values: `npm` (default), `pnpm`, `ied`, `yarn`.
* `ignore`    : concatenate this array onto the existing `[ '**/node_modules/**' ]` ignore.
* `dryRun`    : will not run cds or npm installs
