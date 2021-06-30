/* eslint class-methods-use-this: ["error", { "exceptMethods": ["apply"] }] */

class UnusedJSPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('UnusedJSPlugin', (compilation) => {
            compilation.hooks.finishModules.tap('UnusedJSPlugin', (modules) => {
                console.log(modules);
            });
        });
    }
}

module.exports = UnusedJSPlugin;
