# install-deep

Recursively npm install all package.json. outside node_modules. Will not run
npm install on the root pacakge.json.

This is useful of you structure your app as smaller modules, following 
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

`ignore` : concatenate this array onto the existing `[ '**/node_modules/**' ]` ignore.
`dryRun` : will not run cds or npm installs
