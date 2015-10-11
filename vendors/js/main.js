/******************************************
* @project     :    
* @file        :    APP入口
* @authors     :    听着情歌流泪 (bobo.xiao@nmtree.com)
* @version     :    v1.0.0
* @web         :    http://www.nmvdian.com
* Released     :    2015-08-18 13:30
******************************************/
+function ($) {
    "use strict";
    //全局配置
    var defaults = {
        version     :   {
          'frame' : '0.4.1',
          'app'   : '0.1.1'
        },
        
        author          :   '听着情歌流泪',
        email           :   'bobo.xiao@nmtree.com',
        errCode         : [{
            code:404,
            message:'请求的地址不存在',
        },{
            code:500,
            message:'服务器错误',
        }]
    };
    $.wdConfig = $.extend(defaults,appConfig);
}(Zepto);

;(function() {
    'use strict';
    require.config({
        baseUrl: $.wdConfig.staticPath,
        paths: {
            utils       :   'js/utils',
            text        :   'js/libs/text',
            css         :   'js/libs/css.min',
            router      :   'js/router',
            //handlebars  :   $.wdConfig.galleryPath+'/handlebars/1.3.0/handlebars',
            module      :   $.wdConfig.modulePath,
        },
        shim:{
            handlebars: {
                exports: "Handlebars"
            },
            underscore: {
                exports: '_'
            },
            /*
            modal : {
                deps:['css!'+$.hbConfig.galleryPath+'/modal/1.0.0/modal.css'],
                exports: '$'
            },
            */
            //intro : ['css!'+$.hbConfig.galleryPath+'/plugin/1.0.0/intro.css'],
        },
        waitSeconds:15,
        urlArgs: "v=" + (+new Date()),
    });
    
    requirejs.onError = function (err) {
        if (err.requireType === 'timeout') {
            console.log('modules: ' + err.requireModules);
        }
        //throw err;
    };
    
    require(['router'], function(router) {
        var web = {
            initialize: function() {
                window.onload = this.initMainView();
            },
            initMainView: function() {
                window.WD = $ = Zepto;
                router.init();
            }
        };
        web.initialize();
    });

})();
