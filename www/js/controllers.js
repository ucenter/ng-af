angular.module('app')

.controller('TodoCtrl',function TodoCtrl($scope) {
    'use strict';

    var todos=$scope.todos=[];

    $scope.addTodo=function(){
        if(!$scope.todoVal) return;
        todos.push({
            title:$scope.todoVal,
            completed:false
        });
        $scope.todoVal="";
    };

    $scope.removeTodo=function(item){
        todos.splice(todos.indexOf(item),1);
        $scope.$apply();
    };

})


.controller('listCtrl',function($scope,$location){
    $scope.listName = '标题';
    $scope.items = [
        {'id':'1','name':'信息标题'},
        {'id':'2','name':'信息标题'}
    ]
})

.controller('detailCtrl',function($scope,$location){
    $scope.title = $location.url;
    console.log($location)
})

.controller('homeCtrl', ['$scope','$cordovaToast','$cordovaGeolocation', function($scope,$cordovaToast,$cordovaGeolocation){
    $.afui.clearHistory();

    $scope.slides = [
        {'img': './img/slide-1.jpg'}
    ]

    document.addEventListener('deviceready',function(){
        $cordovaToast.show('设备准备就绪', 'long', 'center')
            .then(function(success) {
              // success
            }, function (error) {
              // error
        });    
    },false)

    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        $scope.lat  = position.coords.latitude
        $scope.long = position.coords.longitude
    }, function(err) {
            // error
    });
    var watchOptions = {
        timeout : 3000,
        enableHighAccuracy: false // may cause errors if true
    };
    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
        null,function(err) {
            // error
        },function(position) {
            $scope.lat  = position.coords.latitude
            $scope.long = position.coords.longitude
    });
    watch.clearWatch();
    // OR
    // $cordovaGeolocation.clearWatch(watch)
    // .then(function(result) {
    //   // success
    //   }, function (error) {
    //   // error
    // });

}])

.controller('loginCtrl', ['$scope','$http', function($scope,$http){
    $scope.codeBtn = '获取验证码';
    $scope.number = 2;

    $scope.getCode = function(){

    }
    $scope.submit = function(){

 
        console.log($scope.tel,$scope.password)

        if ($scope.tel && $scope.password && $scope.tel.length == '11' && $scope.password.length == '4') {            
            $.when(
                $.afui.toast({'message':'登录成功','position':'bc'})
            ).then(function(res){
                window.history.back();
                $.afui.clearHistory();
            })
        }else{
            $.afui.toast({'message':'输入有误','position':'bc','type':'error'})
        }
    }
}])

.controller('account', ['$scope','$cordovaDatePicker', function($scope,$cordovaDatePicker){
    $scope.loginOut = function(){
        
    }
}])