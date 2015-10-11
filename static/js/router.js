define(['utils/appFunc'],function(appFunc){
	
	var router = {
		/***************
		* 初始化路由
		***************/
		init : function(){
			//新页面中的组件初始化完毕
	  		$(document).on("pageInit", function(e, pageId, $page) {
				//router.pageInit(pageId)
			});
			//新页面的DOM插入当前页面之后，动画执行之前
			$(document).on('pageAnimationStart',function(e, pageId, $page){
				router.pageAnimationStart(pageId);
			});
			//新页面动画执行完毕
			$(document).on('pageAnimationEnd',function(e, pageId, $page){
				router.pageAnimationEnd(pageId);
			});
			//返回到上一个页面的时候触发
			$(document).on('pageReinit',function(e, pageId, $page){
				router.pageReinit(pageId);
			});
			//发送Ajax之前触发
			$(document).on('pageLoadStart',function(e, pageId, $page){
				router.pageLoadStart(pageId);
			});
			//Ajax 请求结束，无论是成功还是失败
			$(document).on('pageLoadComplete',function(e, pageId, $page){
				router.pageLoadComplete(pageId);
			});
			if($.device.os == 'android'){
  				$(".content").scroller({
			        type: 'auto'
			    });
  			}
			//初始化
			$.init();
	  	},
	  	/***************
		* 页面初始化
		***************/
	  	pageInit: function(moduleName){

	  		require([$.wdConfig.modulePath+'/' + moduleName + '/'+ moduleName + 'Ctrl.js'], function(Ctrl) {
	  			switch (moduleName){
		  			case 'home' :
		  			break;
		  		}
	  			Ctrl.init($.parseUrlQuery());
	  			$(".content").scroller('refresh');
	  		});
	  	},
	  	/***************
		* 页面开始加载
		***************/
	  	pageLoadStart: function(obj){
	  		
	  	},
	  	/***************
		* 页面开始执行动画
		***************/
	  	pageAnimationStart: function(pageID){
	  		
	  	},
	  	pageAnimationEnd: function(pageID){
	  		$(".content").scroller('refresh');
	  	},
	  	pageReinit: function(pageID){
	  		$(".content").scroller('refresh');
	  	},
	  	pageLoadStart: function(pageID){

	  	},
	  	pageLoadComplete: function(pageID){

	  	}
	}
	return router;
});
