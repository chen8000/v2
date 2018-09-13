
import React, { Component } from 'react'
import style from './index.scss'
import { renderCharts } from './renderCharts'
import Select from '../select'
import 'fetch-detector'
import 'fetch-ie8'
import { stackedJson, selectJson } from '../config/fetchindex'

class Stacked extends Component {

    constructor(props){
        super(props)

        this.state = {
            // 选择部门
            select : [{name:'选择部门',id:'选择部门'}],
            selected: {name:'选择部门',id:'选择部门'}
        }
    }
    componentWillMount(){
        // 获取部门数据
        fetch(selectJson)
        .then(res => res.json())
        .then(res => {
            this.setState({select:res, selected:res[0]})
            
        })
    }

    // 修改数据后渲染
    componentDidUpdate(){
        // xNum 坐标
        // date 日期（年月日）
        // lineSelected 线图选中 （月 日）
        let { xNum, date } = this.props.res
        let lineSelected = this.props.res.selected
        // 柱形图选中
        let { selected } = this.state

        let jsonData = {
            date, lineSelected, selected
        }

        fetch(stackedJson
            , { 
                method: "post", 
                mode: "cors",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
                body: JSON.stringify(jsonData)
            }
        )
        .then(res => res.json())
        .then(res => {
            let { data } = res
            renderCharts(this.echarts, xNum, data)  
        })
    }
    // 部门
    getVal = val => {
        // 选中部门的selected
        this.setState({ selected:val })
    }

    render(){
        let { select, selected } = this.state
        
        return (
            <div className={style.stacked}>
                <div className={style.title}>
                    <h2>STACKED CHART</h2>
                    <Select select={ select } selected={ selected } getVal={ this.getVal }/>
                </div>
                <div ref={d => this.echarts = d} className={style.echarts}></div>
            </div>
        )
    }
}

export default Stacked


