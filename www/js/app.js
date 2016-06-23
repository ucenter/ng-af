angular.module('app',['infinite-scroll'])
.config(function () {
	angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250)
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

function goBack(){
	return window.history.back();
}

$.afui.registerDataDirective('[data-action]',function(e){
	var thisVal = $(e).attr('data-action');
	if (thisVal == 'goBack') {
		return window.history.back();
	}
})

