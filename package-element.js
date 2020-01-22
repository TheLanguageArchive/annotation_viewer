const fs = require('fs-extra');
const concat = require('concat');
const zlib = require('zlib');
const gzip = zlib.createGzip();

(async function build() {

    await fs.ensureDir('dist/elements');
    await concat([

        './dist/annotation-viewer/runtime.js',
        './dist/annotation-viewer/polyfills.js',
        './dist/annotation-viewer/styles.js',
        './dist/annotation-viewer/main.js',

    ], 'dist/elements/annotation-viewer.js');

    fs.createReadStream('dist/elements/annotation-viewer.js')
        .pipe(gzip)
        .on('error', () => {})
        .pipe(
            fs.createWriteStream('dist/elements/annotation-viewer.js.gz')
        )
        .on('error', () => {});
})();
