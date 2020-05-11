import React from 'react';
import {
    NavLink
    } from "react-router-dom";
import classname from 'classname';
const ClassTasks = (props) => {
    return (
        <>
        <ul className = "navigation ul-nolist-inline">
            {
                props.tasks.map((item, index) => (
                    <li key = {`task-${index}`}>
                        <NavLink 
                            className = {classname({'selected-class-task': item.isSelected})}
                            to = {item.link}>{item.block}
                        </NavLink>
                    </li>
                ))
            }
        </ul>
        </>
    );
};
export default ClassTasks;
