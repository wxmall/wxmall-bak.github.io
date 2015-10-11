fis
    // 默认情况下不添加hash
    .match('**', {
        useHash: false,
        //release: false
    })
    //模块
    .match(/^\/module\/(.*)$/i, {
        // components下开启同名依赖，通常是为了自动加载样式文件。
        useSameNameRequire: true
    })
    .match(/^\/module\/(.*)$/i, {
        //url : '${domain}/${name}/${version}/${module}/$1',
        release : '/${name}/${version}/${module}/$1'
    })
    .match(/^\/module\/(.*\.js)$/i, {
        moduleId: '${name}/${version}/$1',
        id : '$1',
        isMod : true,
        useHash : false,
        //url:'/${name}/${version}/${module}/$1',
        release : '/${name}/${version}/${module}/$1'
    })
    .match(/^\/module\/(.*)\.(scss|css)$/i, {
        moduleId: '${version}/$1.css',
        id : '${version}/$1.css',
        isMod : true,
        useSprite : true,
        useHash : false,
        //url:'/${name}/${version}/${module}/$1',
        release : '/${name}/${version}/${module}/$1'
    })
    .match(/^\/module\/(.*)(\.webp)\.(png|jpg|gif)$/i, {
        useWebP: true,
        //url:'/${name}/${version}/${module}/$1.$3',
        release : '/${name}/${version}/${module}/$1.$3'
    })
    //静态资源
    .match(/^\/static\/(.*)$/i, {
        //url : '${domain}/${name}/${version}/static/$1',
        useHash : true,
        release : '/${name}/${version}/${static}/$1',
        query: '?=t'+(new Date).getTime(),
    })
    .match('build/**', {
        release: false
    })
    .match('config/**', {
        release: false
    })
    .match('*.(json)', {
        release: false
    });