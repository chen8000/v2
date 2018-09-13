
import React, { Component } from 'react'
import style from './index.scss'
import { renderCharts } from './renderCharts'
import 'fetch-detector'
import 'fetch-ie8'
import { getDate, total } from '../module/date'
import { detailJson } from '../config/fetchindex'

// 子组件
import Select from '../select'
import Date from '../date'

class Detail extends Component {

    constructor(props){
        super(props)

        this.state = {
            // 坐标 一个月的总数
            xNum:24,  // 根据选中的是日还是月修改坐标
            // 大众数据
            VCICData:[],
            // select
            select:[{name:'日', id :'日'}, {name:'月', id : '月'}],
            // 默认选中值
            selected:{name:'日', id :'日'}, // 当前选中的是日还是月
            // 当前日期
            date:getDate() // 当前选中的日期
            
        }

        // 把选中的数据传给柱形图(初始默认数据)
        let { xNum, selected, date } = this.state
        this.props.setStackedData({ xNum, selected, date })
        // 获取数据 fetch
        this.getJson({xNum, selected, date})
        
    }

    // 修改数据后渲染
    componentDidUpdate(){
        // 渲染图标数据
        renderCharts(this.charts, this.state)

    }

    // 得到当前选中的 月/日 和日期（根据这个问后台要数据）
    getJson = val => {

        fetch(detailJson
            , { 
                method: "post", 
                mode: "cors",
                headers: {'Content-Type': 'application/x-www-form-urlencoded',}, 
                body: JSON.stringify(val)
            }
        )
        .then(res => res.json())
        .then(res => {

            let { VCICData } = this.state

            VCICData = res
            // console.log(res)
            this.setState({ VCICData })
        })

        // 把选中的数据传给柱形图
        this.props.setStackedData(val)
    }

    // 获取select的val
    getVal = val => {
        
        let { selected, date } = this.state
        
        selected.name = val.name
        selected.id = val.id

        this.setState({selected})

        let xNum;

        // 根据选中的是月还是日，修改坐标数值
        if(selected.name === '月'){
            xNum = total(date.year, date.month)
            this.setState({ xNum })
        }
        if(selected.name === '日'){
            xNum = 24
            this.setState({ xNum })
        }
        this.getJson({ xNum, selected, date})
    }

    // 修改date
    setDate = date => {
        let {xNum, selected} = this.state

        // 如果是月，根据选中的日期显示每月多少天
        if(selected.name === '月'){
            xNum = total(date.year, date.month)
            this.setState({ xNum })
        }

        // 修改当前选中的日期
        this.setState({ date })
        this.getJson({ xNum, selected, date})
    }

    render(){
        let { select, selected, date } = this.state
        
        return (
            <div>
                <div className={ style.titleBar }>
                    <h2 className={ style.title }>Detail Statistics</h2>
                    <Date selected={ selected } 
                          setDate = {this.setDate} 
                          date={ date }/>
                    <Select select={ select } selected={ selected } getVal={ this.getVal }/>
                </div>

                {/* 放图表 */}
                <div ref={ c => this.charts = c } className={ style.charts }></div>
            </div>
        )
    }
}

export default Detail



