

import echarts from 'echarts'

export const renderCharts = (obj, xNum, data) => {

    let Charts = echarts.init(obj)
        Charts.setOption({
            legend: {
                data:['VCIC PR'],
                icon: 'circle',
                right:'3%'
            },
            grid: {
                left: '1%',
                right: '0%',
                bottom: '0%',
                containLabel: true,
                borderWidth:0
            },
            xAxis: {
                type: 'category',
                data: (xNum => {
                    let arr = []
                    for(let i = 1; i< xNum+1; i++){
                        arr.push(i)
                    }
                    return arr
                })(xNum),
                axisTick: {
                    show: false,
                    alignWithLabel: 1,
                },
                axisLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false,
                    alignWithLabel: 1,
                },
                axisLine: {
                    show: false
                },    
                splitLine:{
                    lineStyle:{
                        color:['#dfdfdf'] 
                    }
                }   
            },
            series: [{
                name:'VCIC PR',
                data: data,
                type: 'bar',
                itemStyle:{
                    color:'#1b4663' 
                }
            }]
        })
}







