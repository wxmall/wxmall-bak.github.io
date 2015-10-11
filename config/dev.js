fis
    .media('dev')
    .match('**', {
        useHash: false,
        //optimizer: null
    })
    .match('*.{jpg,gif,png,jpeg,swf}', {
        useHash: false,
    })
    .match('::package', {
        packager:fis.plugin('map', {
            '/static/js/main.min.js': [
                '/vendors/frame/*.js',
                '/vendors/js/main.js',
            ],
            '/static/js/base.min.js': [
                '/vendors/js/zepto.js',
                '/vendors/require/**.js',
            ],
            
            '/static/css/base.min.css': [
                '/vendors/**.{css,scss}',
            ]
        }),
        postpackager:fis.plugin('loader', {
            allInOne: true
        }),
    })
    .match('**', {
        deploy: [
            fis.plugin('replace', {
                from : 'http://127.0.0.1:10086',
                to   : fis.get('domain').dev
            }),
            fis.plugin('local-supply', {
                to: '/Users/bobo/.fis3-tmp/www',
                exclude : fis.get('excludeList')
            })
        ]
    });