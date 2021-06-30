/* eslint class-methods-use-this: ["error", { "exceptMethods": ["apply"] }] */

class UnusedJSPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('Unused JS Plugin', (stats) => {
            console.log('Hello World!');
        });
    }
}

module.exports = UnusedJSPlugin;
