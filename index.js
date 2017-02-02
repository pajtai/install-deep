'use strict';

const BB = require('bluebird');
const chalk = require('chalk');
const glob = BB.promisify(require('glob'));
const path = require('path');
const runner = require('node-shell-runner');

module.exports = installDeep;

function installDeep(options) {

    options = options || {};
    var installer = options.installer || 'npm';

    var installationCmd = getInstallationCommand(installer);

    return BB.try(() => {
        var ignore = ['**/node_modules/**'];

        if (options.ignore) {
            ignore = ignore.concat(options.ignore);
        }

        console.log('will be ignoring:', chalk.green(ignore));

        return glob("*/**/package.json", { ignore : ignore })
    })
        .then(files => {
            console.log(`\n\nwill be ${installer} installing:`, chalk.green(JSON.stringify(files, null, 4)));
            return files;
        })
        .then(files => {
            return files.map(file => {
                return [`cd ${path.dirname(file)}; ${installationCmd}`, `\n\nRunning ${installer} install for ${file}` ];
            });
        })
        .then(commands => {
            if (!options.dryRun) {
                runner.run(commands);
            }
            return commands;
        })
        .catch(err => {
            console.log('err', err);
        });
}

function getInstallationCommand(installer) {
    switch (installer) {
        case 'npm':
        case 'pnpm':
        case 'ied':
            return `${installer} install`;
        case 'yarn':
            return installer;
        default:
            throw new Error('Unknown installer used');
    }
}
