const fsp = require('fs/promises');
const path = require('path');
const { validate } = require('schema-utils');

const schema = require('./schema.json');
const getAllModules = require('./getAllModules');

class UnusedJSPlugin {
    constructor(options) {
        validate(schema, options, {
            name: 'UnusedJSPlugin',
            baseDataPath: 'options',
        });
        this.srcDir = options.srcDir || 'src';
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('UnusedJSPlugin', (compilation) => {
            compilation.hooks.finishModules.tap(
                'UnusedJSPlugin',
                async (modules) => {
                    const allModules = await getAllModules(
                        path.resolve(this.srcDir),
                    );
                    const buildedModules = Array.from(modules).map(
                        (module) => module.request,
                    );
                    const unusedModules = allModules
                        .filter((item) => !buildedModules.includes(item))
                        .map((item) => path.relative(path.resolve(), item));

                    const destFile = path.resolve('unused.json');

                    if (unusedModules.length) {
                        await fsp.writeFile(
                            destFile,
                            JSON.stringify(unusedModules, null, 2),
                        );
                    } else {
                        await fsp.rm(destFile, { force: true });
                    }
                },
            );
        });
    }
}

module.exports = UnusedJSPlugin;
