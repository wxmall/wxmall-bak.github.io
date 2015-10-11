fis
    .media('svn')
    .match('*.{jpg,gif,png,jpeg,swf}', {
        useHash: true,
    })
    .match('**', {
        deploy: [
            fis.plugin('replace', {
                from: 'http://127.0.0.1:10086',
                to: fis.get('domain').svn
            }),
            fis.plugin('local-supply', {
                to: fis.get('svnPath'),
                exclude : fis.get('excludeList')
            })
            
        ]
    });