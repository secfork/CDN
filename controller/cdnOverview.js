/**
 * Created by jiajunwei on 2016/4/20.
 * 功能：概览的控制器
 */
var module = angular.module('controller.cdnOverview',[]);

module.controller('cdnOverview',['$scope','$element','$location','$cdnData','$ocLazyLoad',
    function ($scope,$element,$location,$cdnData,$ocLazyLoad) {


        //启动日期插件
        $element.find('.form_datetime').datetimepicker({
            language:  'zh-CN',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1
        });

        //查询条件
        $scope.option = {

        }

        //查询和初始化页面函数
        function cdnQuery() {
            if(op){
                //设置参数
                $cdnData.setOption($scope.option);
                //请求数据，刷新地图
                $cdnData.getMapData(function (data) {
                    mapInit('cdnMap',data);
                });
                //请求数据，刷新曲线
                $cdnData.getChartData(function (data) {
                    //刷新两条曲线
                    chartInit('cdnChart1',data);
                    chartInit('cdnChart2',data);
                });
                //请求数据，刷新曲线
                $cdnData.getMapData(function (data) {
                    tableInit('cdnTable',data);
                });
            }
        }

        //快速查询
        function quickQuery(type) {
            //今天
            if(type=="today"){

            }else if(type=="yesterday"){//昨天

            }else if(type=="week"){//近7天

            }else if(type=="halfMonth"){//半月

            }else{//月
            }
            //查询
            cdnQuery();
        }

        //曲线,参数：容器ID，数据
        function chartInit(id,data) {
            $('#'+id).highcharts({
                    chart: {
                        zoomType: 'x',
                        spacingRight: 20
                    },
                    xAxis: {
                        type: 'datetime',
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    title:{
                        text:null
                    },
                    tooltip: {
                        shared: true
                    },
                    legend: {
                        enabled: true
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            lineWidth: 1,
                            marker: {
                                enabled: false
                            },
                            shadow: false,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: '',
                        name: 'USD to EUR',
                        pointInterval: 48 * 3600 * 1000,
                        pointStart: Date.UTC(2015, 0, 01),
                        data: data
                    }]
                });
        }

        //地图，参数：容器ID，数据
        function mapInit(id,data) {
            var mapArray = Highcharts.maps['cn-with-city'];
            var mappoint = Highcharts.geojson(mapArray, 'mappoint');
            $('#'+id).highcharts('Map', {

                title: {
                    text: null
                },
                credits: {
                    enabled: false
                },

                colors: function(color) {
                    return {
                        radialGradient: {
                            cx: 0.5,
                            cy: 0.3,
                            r: 0.7
                        },
                        stops: [
                            [0, color],
                            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                        ]
                    };
                }(),
                chart: {
                    events: {
                        click: function() {
                            console.log('ssssssssssss');
                        }
                    }
                },

                mapNavigation: {
                    enabled: true,

                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },

                legend: {
                    title: {
                        text: '单位：S'
                    },
                    align: 'right',
                    verticalAlign: 'bottom',
                    floating: true,
                    layout: 'vertical',
                    valueDecimals: 0,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)',
                    symbolRadius: 0,
                    symbolHeight: 14
                },
                colorAxis: {
//                    min: 0,
//                    stops: [
//                        [0, '#EFEFFF'],
//                        [0.5, Highcharts.getOptions().colors[0]],
//                        [1, '#006cee']
//                    ]
                    dataClasses: [{
                        to: 3
                    }, {
                        from: 3,
                        to: 10
                    }, {
                        from: 10,
                        to: 30
                    }, {
                        from: 30,
                        to: 100
                    }, {
                        from: 100,
                        to: 300
                    }, {
                        from: 300,
                        to: 1000
                    }, {
                        from: 1000
                    }]
                },
                tooltip: {
                    formatter: function() {
                        return "<b>" + this.point.name + ": </b><br/>"
                            + this.point.value+"<br/>"
                            +this.point.val;
                    }
                },

                series: [
//                    {
//                    //keys:keys,
//                    data: mapData,
//                    type: 'mapbubble',
//                    mapData: mappoint,
//                    joinBy: ['name', 'name'],
//                    name: 'Random data',
//                    states: {
//                        hover: {
//                            color: '#BADA55'
//                        }
//                    },
//                    // negativeColor:'#FF0022',
//                    maxSize: '5%',
//                    minSize: 10,
//                    negativeColor: '#FF0022',
//                    zThreshold: 120,
//                    showInLegend: true,
//                    dataLabels: {
//                        enabled: true,
//                        format: '{point.name}',
//                        style: {
//                            fontSize: '8px',
//                            color: '#000'
//                        }
//                    },
//                    states: {
//                        hover: {
//                            brightness: 0.8,
//                            borderWidth: 10
//                        }
//                    },
//                    tooltip: {
//                        formatter: function() {
//                            return this.point.name + " \t" + this.point.z;
//                        }
//                    },
//                    zIndex: 1000
//                }, {
//                    type: 'mappoint',
//                    id: 'clicks',
//                    showInLegend: false,
//                    name: 'Clicks'
//                },
                    {
                        // Basic China map
                        data: data,
                        mapData: mapArray,
                        joinBy: ['name', 'name'],
                        name: 'Random data',
                        showInLegend: false,
                        events: {
                            click: function (e) {
                                console.log(e.point.name);
                            }
                        },
                        states: {
                            hover: {
                                color: 'red'
                            }
                        },
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}',
                            style: {
                                fontSize: '8px'
                            }
                        }
                    }]

            }, function(map) {
                console.log("Map init ok!");
            });
        }

        //表格，参数：容器ID，数据
        function tableInit(id,data) {

        }

}])
