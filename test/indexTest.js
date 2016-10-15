'use strict';

const chai = require('chai');
const installDeep = require('../index');
const path = require('path');

chai.should();

describe('Recursive install', () => {
    it('in fixtures', (done) => {

        const filePath = path.resolve(__dirname, '..', 'fixtures');

        installDeep({ cwd : filePath, dryRun : true })
            .then((commands) => {
                commands.should.deep.equal([
                    [ "cd fixtures/a/b; npm install",   "\n\nRunning npm install for fixtures/a/b/package.json" ],
                    [ "cd fixtures/c; npm install",     "\n\nRunning npm install for fixtures/c/package.json" ],
                    [ "cd fixtures; npm install",       "\n\nRunning npm install for fixtures/package.json" ]

                ]);
                done();
            })
            .catch(done);
    });
});