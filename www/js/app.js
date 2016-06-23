angular.module('app',['ngCordova'])
.config(function () {

})

.factory('user', ['$http', function($http){
	return function login(){
		return $http.get()
	}
}])


$.afui.ready(function(){
	AV.init('DXEQiY2oEBX8mE8Vz12gINHj-gzGzoHsz','sW5BjA4qDVy89NVuXCjUz9Lo');

    angular.bootstrap(document, ['app']);
});


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
			type: 'GET',
			url:'http://123.57.38.48/cordovaTest.html?'+parseInt(Date.now()),
			dataType:'json',
			success:function(res){
				$('#test').empty().html(res)
			},
			error:function(){
				$('#test').html('获取远程页面失败')
			}
		})
	})
});


