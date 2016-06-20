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

.controller('homeCtrl', ['$scope', function($scope){
    $.afui.clearHistory();
}])

.controller('loginCtrl', ['$scope', function($scope,$http){
    $scope.codeBtn = '获取验证码';
    $scope.number = 2;

    $scope.getCode = function(){

    }
    $scope.submit = function(){


    var query = new AV.Query('user');
    query.equalTo('name','demo')     
    query.find().then(function(res){
        console.log(res)
    })   

        console.log($scope.tel,$scope.password)
        if ($scope.tel && $scope.password && $scope.tel.length == '11' && $scope.password.length == '4') {            
            $.when(
                $.afui.toast({'message':'登录成功','position':'bc'})
            ).then(function(res){
                window.history.back();
            })
        }else{
            $.afui.toast({'message':'输入有误','position':'bc','type':'error'})
        }
    }
}])