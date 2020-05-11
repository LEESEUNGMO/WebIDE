import React from 'react';
import {
    NavLink
    } from "react-router-dom";
const ClassTasks = (props) => {
    return (
        <>
        <ul className = "navigation ul-nolist-inline">
            {
                props.tasks.map((item, index) => (
                    <li key = {`task-${index}`}><NavLink   activeStyle={{
                       background: "rgba(44, 62, 80)"
                    }} to = {item.link}>{item.block}</NavLink></li>
                ))
            }
        </ul>
        </>
    );
};
export default ClassTasks;
