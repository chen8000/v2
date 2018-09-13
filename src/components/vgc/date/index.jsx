
import React, {Component} from 'react'
import style from './index.scss'
import { total } from '../module/date'

class Date extends Component{

    // 减
    dateLeft = () => {
        
        let { selected, date } = this.props
        let { year, month, day } = date

        if(selected.name === '月'){
            // 月份
            date.month = (() => {
                let m = month - 1
                if(m < 1){ m = 12 }
                return m
            })()

            //年份
            if(date.month === 12){
                date.year = year - 1
            }
            // 日
            date.day = 1
            // 修改 date
            this.props.setDate(date)
        }
        if(selected.name === '日'){
            // 天
            let thisDayTotal = total(year, month)
            
            date.day = (() => {
                let d = day - 1
                if(d < 1){ d = thisDayTotal }
                return d
            })()
            // 月
            if(date.day === thisDayTotal){
                date.month = (() => {
                    let m = month - 1
                    if(m < 1){ m = 12 }
                    return m
                })()

                //年份
                if(date.month === 12){
                    date.year = year - 1
                }
            }
            

            // 修改 date
            this.props.setDate(date)
        }
    }
    // 加
    dateRight = () => {
        let { selected, date } = this.props
        let { year, month, day } = date

        if(selected.name === '月'){
            // 月份
            date.month = (() => {
                let m = month + 1
                if(m > 12){ m = 1 }
                return m
            })()

            //年份
            if(date.month === 1){
                date.year = year + 1
            }
            // 日
            date.day = 1
            // 修改 date
            this.props.setDate(date)
        }
        if(selected.name === '日'){
            // 天
            let thisDayTotal = total(year, month)
            
            date.day = (() => {
                let d = day + 1
                if(d > thisDayTotal){ d = 1 }
                return d
            })()
            // 月
            if(date.day === 1){
                date.month = (() => {
                    let m = month + 1
                    if(m > 12){ m = 1 }
                    return m
                })()

                //年份
                if(date.month === 1){
                    date.year = year + 1
                }
            }
            

            // 修改 date
            this.props.setDate(date)
        }

    }

    render(){
        let { date } = this.props

        return (    
            <div className={ style.viewDatebox }>
                <span onClick={this.dateLeft} className={ style.left }></span>
                {/* 年月日 */}
                <p className={ style.viewDate }>
                    {
                        `
                        ${date.year}/${
                            date.month < 10 ? `0${date.month}` : date.month
                        }/${
                            date.day < 10 ? `0${date.day}` : date.day
                        }`
                    }
                </p>
                <span onClick={this.dateRight} className={ style.right }></span>
            </div>
        )
    }
}

export default Date

