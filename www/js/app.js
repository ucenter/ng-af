angular.module('app',['ngCordova','angular-carousel'])

.config(function ($cordovaInAppBrowserProvider) {

	  document.addEventListener(function () {
	    $cordovaInAppBrowserProvider.setDefaultOptions({
	    	location: 'no',
	    	clearcache: 'no',
	    	toolbar: 'no'
	  	})
	  }, false);	
})

$.afui.ready(function(){

	AV.init('DXEQiY2oEBX8mE8Vz12gINHj-gzGzoHsz','sW5BjA4qDVy89NVuXCjUz9Lo');
    angular.bootstrap(document, ['app']);
});

(function(window){

	var initUser = {};
	initUser.isLogin = false;
	initUser.setLogin = function(b){
		if (b == true || b == false) {
			initUser.isLogin = b;			
		}else{
			console.error('参数为boolean')
		}
	}

	window.initUser = initUser;

})(window)

document.addEventListener("deviceready", function(){	
	
	document.addEventListener("backbutton", onBackKeyDown, false);  
	function onBackKeyDown() {  
		if ($.afui.activeDiv.id == 'main') {
			navigator.notification.confirm('确定退出吗？',confirmCallback,'提示信息',['确定','取消'])
		}else{
			navigator.app.backHistory()
		}
	}
	function confirmCallback(res){
		if (res == '1') {
			exitApp()
		}else{
			navigator.app.clearHistory()
			return false;
		}
	}  
	function exitApp(){  
	    navigator.app.exitApp();  
	}  
}, false);  
              

function goBack(){
	return window.history.back();
}

$.afui.registerDataDirective('[data-action]',function(e){
	var thisVal = $(e).attr('data-action');
	if (thisVal == 'goBack') {
		return window.history.back();
	}
})

	
$(document).ready(function() {
	$('#mainview .panel').bind('panelbeforeload',function(e){
		console.log(this.id)
		if (this.id == 'main') {
			$.afui.clearHistory();
			console.log('clearHistory')			
		}
		//$.afui.setBackButtonVisibility(false)
	})
	
	$('#test').bind('panelbeforeload',function(e){
		$.ajax({
			url:'http://demo.simovision.cn/ajax.html?'+parseInt(Date.now()),
			//url:'../cordovaTest.html',
			success:function(res){
				$('#test').empty().html(res)
			},
			error:function(){
				$('#test').html('获取远程页面失败')
			}
		})
	})
});


