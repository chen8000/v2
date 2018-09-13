
import React, {Component} from 'react'
import style from './index.scss'

class TopUsers extends Component{

    render(){
        
        let { res } = this.props
        return(
            <div className={style.users}> 
                <h2 className={style.title}>TOP POSTS</h2>

                <div className={style.titlebar}>
                    <p>Title</p>
                    <p>View Count</p>
                </div>
                <div className={style.usersbox}>
                    <ul>
                        {
                            res.map((res, i) => 
                                <li key={i}>
                                    <p> 
                                        {res.userName}
                                    </p>
                                    <p>{res.pageView}</p>
                                </li>
                            )
                        }
                    </ul>
                </div>
                
            </div>
        )
    }
}

export default TopUsers
