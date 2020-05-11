import React, { Component } from 'react'
import { FaSearch } from "react-icons/fa";
export default class SelectSearch extends Component {
    render() {
        return (
            <>
            <select className = "select_option" required="required">
                <option value="">번호</option>
                <option value="">제목</option>
                <option value="">작성일</option>
            </select>
            <div className = "search_box">
                <input  className = "search_box-text" type="text" placeholder="Search.."></input>
                <button className = "search_box-btn" type="submit"><i className="icon"><FaSearch/></i></button>
            </div>
            </>
        )
    }
}
