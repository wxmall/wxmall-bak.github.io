fis
    .media('production')
    .match('*.{jpg,gif,png,jpeg,swf}', {
          useHash: true
    })
    .match('**', {
        deploy: [
            fis.plugin('replace', {
                from: 'http://127.0.0.1:10086',
                to: fis.get('domain').online
            }),
            fis.plugin('local-supply', {
                to: fis.get('svnPath'),
                exclude : fis.get('excludeList')
            })
            
        ]
    });
    // .match('*.{php,html}',{
    //     optimizer: fis.plugin('html-minifier', {
    //         // fis直接将此配置传递给html-minfier模块
    //         // 因此相关配置项请直接参阅html-minifier文档
    //         removeComments: true,
    //         collapseWhitespace: true,
    //         conservativeCollapse: true,
    //         removeAttributeQuotes: true
    //     }),
    // })
    
    // .match('*.png', {
        
    //     // deploy: fis.plugin('alioss', {
    //     //     accessKey: '在阿里云OSS申请的 accessKeyId',
    //     //     secretKey: '在阿里云OSS申请的 secretAccessKey',
    //     //     bucket: '你的存储空间名称',
    //     //     ossServer: 'http://oss-cn-beijing-internal.aliyuncs.com'
    //     // })
        
    //     deploy: fis.plugin('qiniu', {
    //         accessKey: fis.get('accessKey'),
    //         secretKey: fis.get('secretKey'),
    //         bucket   : fis.get('bucketName'),
    //     })
    // })