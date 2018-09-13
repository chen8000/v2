
import React, { Component } from 'react'
import style from './index.scss'
import { OverViewJson, OverViewTitleJson } from '../config/fetchindex'
import 'fetch-detector'
import 'fetch-ie8'

class OverView extends Component {

    constructor(props){
        super(props)

        this.state = {
            bar:[],
            title:''
        }
    }

    componentWillMount(){
        fetch(OverViewJson)
            .then(res => res.json())
            .then(res => {
                this.setState({ bar:res })
            })
        
    
        // title 
        fetch(OverViewTitleJson)
            .then(res => res.json())
            .then(res => {
                
                this.setState({ title:res })
            })    
    }
    
    render(){
        let { bar, title } = this.state
        return (
            <div>
                <h2 className={ style.title }>{ title }</h2>
                <h3 className={ style.mintitle }>Overview</h3>
                <div className={style.textViewBox}>
                    <ul className={style.textView}>
                        {
                            bar.map((res, i) => 
                                <li key={ i }>
                                {
                                    res ? <div className={style.viewLayout}>
                                            <h2 className={ style.viewTitle }>{ res.title }</h2>
                                            <p className={ style.viewNum  }>{ res.num }</p>
                                            <p className={style.viewDes}>{ res.des }</p>
                                        </div> : null
                                }
                                    
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
            
        )
    }
}

export default OverView


