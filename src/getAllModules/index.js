const fsp = require('fs/promises');
const path = require('path');

module.exports = async function getAllModules(dirAbsName) {
    const result = [];

    const content = await fsp.readdir(dirAbsName, {
        withFileTypes: true,
    });

    for (const entity of content) {
        const absPath = path.resolve(dirAbsName, entity.name);

        if (entity.isDirectory()) {
            result.push(...(await getAllModules(absPath)));
        } else if (path.extname(absPath) === '.js') {
            result.push(absPath);
        }
    }

    return result;
};
