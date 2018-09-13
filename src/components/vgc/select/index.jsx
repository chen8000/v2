
import React, { Component } from 'react'
import style from './index.scss'

class Select extends Component {

    constructor(props){
        super(props)

        this.state = {
            select:{
                renderType:false
            }
        }
    }

    // list down up
    selectFn = () => {
        let { select } = this.state

        select.renderType = !this.state.select.renderType
        
        this.setState({ select })
    }

    getVal = index => {
        // 关闭弹出框
        this.selectFn()
        
        
        // 调用父组件，传给父组件选中的值
        this.props.getVal(this.props.select[index])
    }

    render(){
        let { select, selected } = this.props
        
        return (
            <div className={ style.select }>
                <span className={ style.val } onClick={ this.selectFn }>{selected.name}</span>
                <ul className={ this.state.select.renderType ? style.selectAni : null }>
                    {
                        select.map((res, i) => 
                            <li onClick={ () => this.getVal(i) } key={ i }>{ res.name }</li>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default Select


