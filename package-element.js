const fs = require('fs-extra');
const concat = require('concat');

(async function build() {

    const files = [

        './dist/annotation-viewer/runtime-es2015.js',
        './dist/annotation-viewer/polyfills-es2015.js',

        // './dist/annotation-viewer/runtime-es5.js',
        // './dist/annotation-viewer/polyfills-es5.js',

        './dist/annotation-viewer/styles-es2015.js',
        // './dist/annotation-viewer/styles-es5.js',

        './dist/annotation-viewer/main-es2015.js',
        // './dist/annotation-viewer/main-es5.js'
    ];

    await fs.ensureDir('dist/elements/annotation-viewer');
    await concat(files, 'dist/elements/annotation-viewer.js');
})();
