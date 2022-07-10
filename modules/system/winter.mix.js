/* eslint-disable */
const mix = require('laravel-mix');
require('laravel-mix-polyfill');
/* eslint-enable */

mix.setPublicPath(__dirname);

mix
    .options({
        terser: {
            extractComments: false,
        },
        runtimeChunkPath: './assets/js/build',
    })

    // Extract imported libraries
    .extract({
        libraries: ['js-cookie'],
        to: './assets/js/snowboard/build/snowboard.vendor.js',
    })

    // Compile Snowboard for the Backend / System
    .js(
        [
            './assets/js/snowboard/snowboard.base.debug.js',
            './assets/js/snowboard/ajax/Request.js',
            './assets/js/snowboard/snowboard.backend.extras.js',
        ],
        './assets/js/build/system.js',
    )

    // Compile Snowboard framework separately for the CMS module
    .js(
        './assets/js/snowboard/snowboard.base.js',
        './assets/js/snowboard/build/snowboard.base.js',
    )
    .js(
        './assets/js/snowboard/snowboard.base.debug.js',
        './assets/js/snowboard/build/snowboard.base.debug.js',
    )
    .js(
        './assets/js/snowboard/ajax/Request.js',
        './assets/js/snowboard/build/snowboard.request.js',
    )
    .js(
        './assets/js/snowboard/ajax/handlers/AttributeRequest.js',
        './assets/js/snowboard/build/snowboard.data-attr.js',
    )
    .js(
        './assets/js/snowboard/snowboard.extras.js',
        './assets/js/snowboard/build/snowboard.extras.js',
    )

    // Copy PrismJS into location
    .combine([
        '../../node_modules/prismjs/prism.js',
        '../../node_modules/prismjs/components/prism-php.js',
        '../../node_modules/prismjs/components/prism-markup-templating.js',
        '../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js',
        '../../node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js',
    ], './assets/vendor/prism/prism.js')

    .combine([
        '../../node_modules/prismjs/themes/prism.css',
        '../../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css',
        '../../node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css',
    ], './assets/vendor/prism/prism.css')

    // Copy Select2 into location
    .copy('../../node_modules/select2/dist/js/select2.full.js', './assets/ui/vendor/select2/js/select2.full.js')
    .copy('../../node_modules/select2/dist/js/i18n/*.js', './assets/ui/vendor/select2/js/i18n')

    // Polyfill for all targeted browsers
    .polyfill({
        enabled: mix.inProduction(),
        useBuiltIns: 'usage',
        targets: '> 0.5%, last 2 versions, not dead, Firefox ESR, not ie > 0',
    });
