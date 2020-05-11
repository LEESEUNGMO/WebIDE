import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';

var moment = require('moment');

export default class ListProblem extends Component {
    render() {
        const {handleChange, listProblem, handleClick, handleSearchClick, optionSearch, searchWord, handleFocus} = this.props
        return (
            <div className = "list_problem">
                <h2 className = "u-text-center">문제 리스트</h2>
                    <div className = "headding">
						<select className = "select_option" name = "optionSearch" required="required" onChange = {(event) => handleChange(event)} value = {optionSearch}>
							<option value="제목">제목</option>
						</select>
						<div className = "search_box">
							<input  className = "search_box-text" name = "searchWord" type="text" onChange = {(event) => handleChange(event)} value = {searchWord}placeholder="Search.." onFocus= {() => handleFocus()} ></input>
							<button className = "search_box-btn" onClick = {() => handleSearchClick()}><i className="icon"><FaSearch/></i></button>
						</div>
                    </div>
                    <table className="table table-contribution u-mr-top-small" border = "1">
					<thead>
						<tr>
							<th width = "10%">문제 번호</th>
							<th width = "35%">제목</th>
							<th width = "10%">난이도</th>
							<th width = "10%">작성일</th>
							<th width = "5%">이동</th>
						</tr>
					</thead>
					<tbody>
						{
							listProblem.map((item,index) => {
								return (
									<tr key = {index}>
										<td>{item.id}</td>
										<td><Link to = {`view?id=${item.id}`} onClick = {() => handleClick(item)}>{item.name}</Link></td>
										<td>{item.level}</td>
										<td>{moment(item.created).format("YYYY-MM-DD")}</td>
										<td><Link to = {`view?id=${item.id}`} onClick = {() => handleClick(item)}>가기</Link></td>
									</tr>
								)
							})
						}
					</tbody>     
                    </table>
            </div>
        )
    }
}
