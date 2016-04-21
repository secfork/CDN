/**
 * Created by jiajunwei on 2016/4/20.
 * 功能：实现指令的模块
 */

var module = angular.module('common.directive',[]);

module.directive('uiOverview' , function(){
    return {
        "restrict" : 'EA',
        "transclude" : true,
        "templateUrl" : "view/overview.html",
        "controller" : "cdnOverview"
    }
});

