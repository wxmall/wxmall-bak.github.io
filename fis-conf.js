'use strict';
var path = require('path');
// 利用package.json文件定义项目名和版本
var meta = require('./package.json');

/****************环境变量*****************/
fis
    // 排除指定目录
    .set('project.files', ['**', '.**', '.**/**'])
    .set('project.ignore', ['node_modules/**', '.gitignore', '**/_*.scss', '.docs/**', '.dist/**', '.git/**', '.svn/**', 'fis-conf.js'])
    .set('project.fileType.image', 'css,js')

    .set('name', meta.name)
    .set('version', meta.version)
    .set('module','module')
    .set('static','static')
    .set('domain',meta.domain)
    .set('svnPath',meta.svn.path)
    .set('excludeList',meta.excludeList)
    .set('cdnName',meta.cdn.cdnName)
    .set('bucketName',meta.cdn.bucketName)
    .set('accessKey',meta.cdn.accessKey)
    .set('secretKey',meta.cdn.secretKey);
// 开启模块化包装amd，cmd
// fis.hook('module', {
//     //mode: 'amd',
// });

//公共配置开始
/****************语言编译*****************/
fis
	.match('::package', {
        // npm install [-g] fis3-postpackager-loader
        spriter: fis.plugin('csssprites', {
            htmlUseSprite: true,
            layout: 'matrix',
            margin: '15',
            styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig
        }),
        
        postpackager:fis.plugin('loader', {
            allInOne: true
        }),
    })
	.match('::image', {
	  useHash: false,
      domain:'http://127.0.0.1:10086'
	})
	.match('*.js', {
	  optimizer: fis.plugin('uglify-js',{
	  	mangle: {
            expect: ['require', 'define'] //不想被压的
        }
	  }),
	  lint: fis.plugin('jshint')
	})
	.match('*.css', {
		useSprite: true,
		optimizer: fis.plugin('clean-css',{
			'keepBreaks': false
		})
	})
	.match('*.png', {
	  optimizer: fis.plugin('png-compressor',{
	  	type : 'pngquant'
	  })
	})
    .match('*.php', {
        loaderLang: 'html'
    })
    .match('*.scss', {
        rExt: '.css',
        parser: fis.plugin('node-sass', {
            // options...
        })
    })
	.match('*.html:js', {
		optimizer: fis.plugin('uglify-js')
	})
	.match('*.html:css', {
		optimizer: fis.plugin('clean-css')
	});

/*************************目录规范*****************************/
require('./config/path.js');
//公共配置结束



/******************************
*********** 开发环境 ***********
******************************/
require('./config/dev.js');


/******************************
*********** SVN环境 ***********
******************************/
require('./config/svn.js');




/******************************
*********** 演示环境 ***********
******************************/
require('./config/demo.js');




/******************************
*********** 生产环境 ***********
******************************/
require('./config/production.js');
    