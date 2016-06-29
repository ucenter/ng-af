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

.controller('listCtrl',function($scope){
    console.log('listCtrl')
    $scope.listName = '通用列表页标题';
    $scope.items = [
        {'id':'1','name':'列表信息标题'},
        {'id':'2','name':'列表信息标题'}
    ]
})

.controller('detailCtrl',function($scope){
    console.log('detailCtrl')
})

.controller('homeCtrl', ['$scope','$cordovaToast','$cordovaGeolocation','userInfo', function($scope,$cordovaToast,$cordovaGeolocation,userInfo){
    
    var promise = userInfo.query(); // 同步调用，获得承诺接口  
    promise.then(function(data) {  // 调用承诺API获取数据 .resolve  
        //$scope.user = data;  
        console.log(data)
    }, function(data) {  // 处理错误 .reject  
        console.log(data)
        //$scope.user = {error: '用户不存在！'};  
    });  

    $.afui.clearHistory();

    $scope.slides = [
        {'img': './img/slide-1.jpg'},
        {'img': './img/slide-2.jpg'}
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

.controller('loginCtrl', ['$scope','$http','$timeout', function($scope,$http,$timeout){
    console.log(initUser.isLogin)

    $scope.codeBtn = '获取验证码';
    $scope.number = 2;
    $scope.loginForm = {    }

    $scope.getCode = function(){
        $.afui.toast({'message':JSON.stringify($scope.tel),'position':'bc'})
        $timeout(function(){
            $.afui.toast({'message':'验证码：5423','position':'bc'})
        },1000)
    }

    $scope.submit = function(){ 
        console.log($scope.tel,$scope.code)
        if ($scope.tel && $scope.code && $scope.tel.length == '11' && $scope.code.length == '4') {            
            $.when(
                $.afui.toast({'message':'登录成功','position':'bc'})
            ).then(function(res){
                //window.history.back();
                initUser.setLogin(true)
                $timeout(function(){
                    $.afui.loadContent('#account',false,false,'fade');
                    $.afui.clearHistory();
                },1000)
            })
        }else{
            $.afui.toast({'message':'输入有误','position':'bc','type':'error'})
            return false;
        }
    }
}])

.controller('account', ['$scope','$cordovaDatePicker', function($scope,$cordovaDatePicker){
    $scope.loginOut = function(){
        
    }
}])

.controller('messageCtrl', ['$scope', function($scope){
    $scope.tab1 = true;
    $scope.tab2 = false;
    $scope.toggle = function(event,id){
        if (id === true) {
            return false;
        }
        console.log(event,id)
        if ($scope.tab1) {
            $scope.tab1 = false;
            $scope.tab2 = true;
        }else{
            $scope.tab1 = true;
            $scope.tab2 = false;
        }
    }
}])