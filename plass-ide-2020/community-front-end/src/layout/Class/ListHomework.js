import React, { Component } from 'react';
import HomeWork from '../../components/Homework';
import { MdLibraryBooks } from "react-icons/md";
import SelectSearch from '../../components/SelectSearch';
import callAPI from '../../_utils/apiCaller';
const queryString = require('query-string');
class ListHomework extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			listHomework : []
		}
	}
	getToken = () => {
		const token = localStorage.getItem('token')
		return {
			auth_token : token
		}
	}
	componentDidUpdate(prevProps){
		if (prevProps.classId !== this.props.classId) {
			const { classId } =  this.props
			console.log("classID",classId);
			callAPI(`lectures/${classId}/homework`, 'GET', this.getToken(),null).then(res => {
				this.setState({
					listHomework : res.data.data
				})
			})
		}
	}
	componentDidMount()
	{
		const { classId } = this.props;
		callAPI(`lectures/${classId}/homework`, 'GET',  this.getToken() ,null).then(res => {
			this.setState({
				listHomework : res.data.data
			})
		})
	}
	currentCourse = () => {
		const course = queryString.parse(this.props.location.search).p;
		return course;
	}
	render(){ 
    return(
		<div className ="class_homeworks">   
			<h2><i className = "icon"><MdLibraryBooks /></i>과제 관리</h2>    
				<SelectSearch />
			<div className =  "list_homework u-mr-top-small">
				{
					this.state.listHomework.slice(0).reverse().map((item, index) => (
						<HomeWork key = {index}
							id = {item.id}
							title  = {item.title}
							description = {item.description}
							created = {item.created}
							updated = {item.updated}
							limitdate = {item.limitdate}
							week = {item.week}
							course = {this.currentCourse()}
							file = {{
								name : item.name,
								path : item.path
							}}
						/>
					))
				}
			</div>
		</div>
    )
	};
}
export default ListHomework;
