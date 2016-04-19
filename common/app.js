/**
 * Created by jiajunwei on 2016/4/19.
 * 功能:整个cdn的app文件
 */
'use strict';

var app = angular.module("cdnApp" , []);


//修改注册控制器的方法
app.config(['$controllerProvider' ,

    function($controllerProvider){
        app.registerCtrl = $controllerProvider.register;
    }
]);