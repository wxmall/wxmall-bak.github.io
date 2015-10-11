var plugins = {
    push_lingtal : require('../build/fis/fis3-deploy-http-push-lingtal/index'),
};
// 有限制使用本地自定义插件~~
var plugin = function(name, options) {
    var localPlugin = plugins[name];
    if (typeof localPlugin === 'function') {
        localPlugin.options = options;
        return localPlugin;
    } else {
        return fis.plugin.apply(fis, arguments);
    }
}

fis
    .media('demo')
    .match('*.{jpg,gif,png,jpeg,swf}', {
          useHash: true
    })
    .match('*.{php,html}',{
        //loaderLang: 'html',
        optimizer: fis.plugin('html-minifier', {
            // fis直接将此配置传递给html-minfier模块
            // 因此相关配置项请直接参阅html-minifier文档
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeAttributeQuotes: false
        }),
    })
    .match('**', {
        deploy: [
            fis.plugin('replace', {
                from: 'http://127.0.0.1:10086',
                to: fis.get('domain').demo
            }),
            plugin('push_lingtal', {
                //如果配置了receiver，fis会把文件逐个post到接收端上 
                receiver: 'http://demo.lingtal.com/receiver.php',
                //这个参数会跟随post请求一起发送 
                to: '/home/lingtal/webroot/demo.lingtal.com/wwwroot/fis3',
                exclude : fis.get('excludeList')
            })
        ]
    });