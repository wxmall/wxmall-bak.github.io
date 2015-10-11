define([],function(){
    var appFunc = {
        cookie : function(name, value, options) {
            if (typeof value != 'undefined') {
                options = options || {};
                if (value === null) {
                    value = '';
                    options.expires = -1;
                }
                var expires = '';
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    } else {
                        date = options.expires;
                    }
                    expires = '; expires=' + date.toUTCString();
                }
                var path = options.path ? '; path=' + options.path : '';
                var domain = options.domain ? '; domain=' + options.domain : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            } else {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = $$.trim(cookies[i]);
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
        },
        getPageNameInUrl: function(url){
            url = url || '';
            var arr = url.split('.');
            return arr[0];
        },
        isEmpty: function(obj) {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }

            return true;
        },
        getCharLength: function(str){
            var iLength = 0;
            for(var i = 0;i<str.length;i++)
            {
                if(str.charCodeAt(i) >255)
                {
                    iLength += 2;
                }
                else
                {
                    iLength += 1;
                }
            }
            return iLength;
        },
        appDebug: function(obj){
            if( WD.device.os==='ios' || WD.device.os ==='android') {
                
                console.log(obj);
            }else{
                alert(JSON.stringify(obj));
            }
        },
        /******************************************************
        * 简化ReturnFalse
        * @param {jQueryEvent} evt : jQuery事件对象
        * @param {Integer} type : 1 - 只取消冒泡；
        *                         2 - 只阻止事件默认行为；
        *                         0 - 既取消冒泡，阻止事件默认行为
        * @return null
        *******************************************************/
        returnFalse: function(evt, type){
            type = type || 0;
            switch(parseInt(type, 10)){
                case 1: 
                    evt.stopPropagation();
                break;
                
                case 2: 
                    evt.preventDefault();
                break;
                
                default : 
                    evt.stopPropagation();
                    evt.preventDefault();
                break;
            };
            return null;
        },
        bindEvents: function(bindings) {
            for (var i in bindings) {
                if(bindings[i].selector) {
                    $(bindings[i].element)
                        .on(bindings[i].event,bindings[i].selector , bindings[i].handler);
                }else{
                    $(bindings[i].element)
                        .on(bindings[i].event, bindings[i].handler);
                }
            }
        }
    };
    return appFunc;
});