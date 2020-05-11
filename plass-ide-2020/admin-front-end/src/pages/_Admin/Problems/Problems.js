import React, { Component } from 'react';
import ListProblem from './ListProblem';
import ProblemDetail from './ProblemDetail';
import CreateProblem from './CreateProblem';
import qs from 'query-string';
import { Route } from 'react-router';
import callAPI from '../../../_utils/apiCaller';
class Problems extends Component {
	constructor(props, context) {
        super(props, context)
        this.state = {
			listProblem : [],
			problem : {},
			
			problemName : '',
			problemContent : '',
			problemInput : '',
			problemOutput : '',
			problemOutputExam : '',
			problemInputExam : '',
			category : 'C/C++',
			level : '하',
			modify : false,
		}
	}
	getToken(){
        const token = localStorage.getItem('token')
        return {
            auth_token : token
        }
	}
    async componentDidMount(){
		try {
			const response = await callAPI('problems','GET',this.getToken(),null);
			const { data } = await response.data;
			this.setState({
				listProblem : data
			})
		} catch (error) {
			alert("계속 사용하려면 다시 로그인 하십시오");			
		}
	}
	handleDetailsProblem = (id, method) =>
	{	
		//! Promise refactoring
		let filteredProblem = this.state.listProblem.filter((element) => element.id === id)
		this.setState({
			problem : filteredProblem
		})
		switch (method) {
			case "details":
				this.props.history.push(`${this.props.match.path}/details?id=${id}`);
				break;
			default: //default modify
				this.props.history.push(`${this.props.match.path}/modify?id=${id}`);
				break;
		}
	}
	render(){ 
		return( 
		<div className = "problem">
			<div className = "row">
				<div className = "content">
					<Route path = {`${this.props.match.path}/list`} 
						render = {(props) => <ListProblem {...props} listProblem = {this.state.listProblem} handleDetailsProblem = {this.handleDetailsProblem}/>}
					/>
					<Route path = {`${this.props.match.path}/details`} 
						render = {(props) => <ProblemDetail {...props} problem = {this.state.problem} />}
					/>
					<Route path = {`${this.props.match.path}/modify`}
						render = {(props) => <CreateProblem {...props} problem = {this.state.problem} method = "modify"/>}
					/>
					<Route path = {`${this.props.match.path}/create`} component = {CreateProblem} method = "create" />
				</div>
			</div>
		</div>
		)
	};
}
export default Problems;
