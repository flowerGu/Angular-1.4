/**
 * Created by gupeiling on 2017/1/5.
 */
var app = angular.module('apps');
app.controller('platformDataCtrl',function($scope,$http){
    $http.get('./json/platformData.json')
        .then(function(response){
            var datas = response.data;
            var lendingList = datas.lendDataStatistics.list;
            var option = {
                title:{
                    text:'出借年龄分布',
                    fontSize:14,
                    color:'#5f5f5f'
                },
                tooltip:{
                    trigger: 'item',
                    formatter: "{a}:<br />{b} : {c}%"
                },
                series:[
                    {
                        name:'年龄',
                        type:'pie',
                        radius:'50%',
                        label: {
                            normal: {
                                formatter: '{c}%',
                                position: 'right',
                                show: true,
                                textStyle: { fontSize: 18 }
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data:[]
                    }
                ],
                legend:{
                    orient:'horizontal',
                    right:'center',
                    top:'bottom',
                    itemGap:20,
                    data:[]
                }
            }
            for(var i=0;i<lendingList.length;i++){
                option.legend.data.push(lendingList[i].name);
                option.series[0].data.push({
                    name:lendingList[i].name,
                    value:lendingList[i].value,
                    itemStyle:{
                        normal:{
                            color:lendingList[i].color
                        }
                    }
                })
            }
            var lendingage = echarts.init(document.getElementById('main'))
            lendingage.setOption(option);
        })


})