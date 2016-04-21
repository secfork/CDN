/**
 * Created by jiajunwei on 2016/4/20.
 * 功能：概览的控制器
 */
var module = angular.module('controller.cdnOverview',[]);

module.controller('cdnOverview',['$scope','$element',
    function ($scope,$element) {

        $element.find('.form_datetime').datetimepicker({
            language:  'zh-CN',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1
        });
        

}])
