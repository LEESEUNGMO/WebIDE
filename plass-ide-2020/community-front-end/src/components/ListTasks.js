import React, { Component } from 'react'
import TaskItem from './TaskItem';
export default class ListTasks extends Component {
    render() {
        return (
        <div className = "listask">
            {
                console.log("type of listtask" + typeof this.props.listtask)
            }
                <ul className = "ul-nolist-inline">
                    {
                    this.props.listtask.map((item,index) =>{
                        return (
                                <li key = {index}><TaskItem 
                                name = {item.name}  
                                time = {item.time} 
                                /></li>
                        )
                    })
                }
            </ul>
        </div>
        )
    }
}
