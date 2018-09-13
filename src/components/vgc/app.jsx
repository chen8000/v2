
import React, { Component } from 'react'
import style from './app.scss'
import 'fetch-detector'
import 'fetch-ie8'
import { topPosts, topUsers } from './config/fetchindex'
import 'core-js/es6/map'
import 'core-js/es6/set'

// 子组件
import OverView from './overView'
import Detail from './detail'
import Stacked from './stacked'
import TopUsers from './topUsers'
import TopPosts from './topPosts'

class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            // 柱形图
            stackedData:{
                xNum:24,
                selected:'月',
                date:{}
            },
            // toppost topUsers 数据
            topUsers:[],
            topPosts:[]
        }

        
    }

    // 根据线图的改变 改变柱形图的数据
    setStackedData = val => {
        this.setState({stackedData:val})

        this.getTopData(val)
    }

    // 通过子组件传来的值 获取 topPosts模块和topUsers模块的 数据
    getTopData = val => {

        // fetch (两个) topusers
        fetch(topUsers
            , { 
                method: "post", 
                mode: "cors",
                headers: {'Content-Type': 'application/x-www-form-urlencoded',}, 
                body: JSON.stringify(val)
            }
        )
        .then(res => {
            return res.json()
        })
        .then(res => {
            this.setState({topUsers:res})
        })


        fetch(topPosts
            , { 
                method: "post", 
                mode: "cors",
                headers: {'Content-Type': 'application/x-www-form-urlencoded',}, 
                body: JSON.stringify(val)
            }
        )
        .then(res => {
            return res.json()
        })
        .then(res => {
            this.setState({topPosts:res})
        })
    }

    render(){
        let { stackedData, topUsers, topPosts } = this.state

        return (
            <div className={ style.app }>
                
                {/* 数字 */}
                <OverView />
                {/* line charts */}
                <Detail setStackedData = {this.setStackedData}/>
                {/* 柱形图 */}
                {/* <Stacked res={stackedData}/> */}

                {/* 两列布局 */}
                <div className={style.twoLayout}>
                    {/* topUsers */}
                    <div className={style.topUsers}>
                        <TopUsers res={topUsers}/> 
                    </div>

                    {/* topPosts */}
                    <div className={style.topPosts}>
                        <TopPosts res={topPosts}/>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default App


