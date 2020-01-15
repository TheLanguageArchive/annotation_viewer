const fs = require('fs-extra');
const concat = require('concat');

(async function build() {

    await fs.ensureDir('dist/elements');
    await concat([

        './dist/annotation-viewer/runtime.js',
        './dist/annotation-viewer/polyfills.js',
        './dist/annotation-viewer/styles.js',
        './dist/annotation-viewer/main.js',

    ], 'dist/elements/annotation-viewer.js');
})();
