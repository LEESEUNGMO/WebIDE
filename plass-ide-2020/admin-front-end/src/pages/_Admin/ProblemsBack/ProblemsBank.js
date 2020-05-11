import React, { Component } from 'react';
import ListProblem from '../../../layout/ListProblem/ListProblem';
import ProblemDetails from '../../../layout/ListProblem/ProblemDetails';
import CreateProblem from '../../../layout/ListProblem/CreateProblem';
import callAPI from '../../../_utils/apiCaller';
import qs from 'query-string';
class ProblemBank extends Component {
	constructor(props, context) {
        super(props, context)
        this.state = {
			listProblem : [],
			selectedProblem: {},
			
			problemName : '',
			problemContent : '',
			problemInput : '',
			problemOutput : '',
			problemOutputExam : '',
			problemInputExam : '',
			category : 'C/C++',
			level : '하',
			modify : false,

			optionSearch : '제목',
			searchWord : '',
		}
	
	}
	getToken(){
        const token = localStorage.getItem('token')
        return {
            auth_token : token
        }
	}
    componentDidMount(){
		window.addEventListener("keydown", (event) => {
			if(event.keyCode  === 13)
			{
				if(this.isEnterKey)
				{
					this.handleSearchClick();
				}
			}
		})
		try {
			callAPI('problems','GET',this.getToken(),null).then(res => {
				this.setState({
					listProblem : res.data.data
				})
			})
		} catch (error) {
			alert("계속 사용하려면 다시 로그인 하십시오");			
		}
	}
	
	handleClick = (problem) => {
		this.setState({
			selectedProblem: problem
		})
	}
	handleChange = (event) => {
		const {name , value } = event.target;
		this.setState({
			[name] : value
		})
	}
	isEnterKey = false;
	handleFocus = () => {
		this.isEnterKey = true;
	}
	handleSearchClick = () => {
		let {optionSearch, searchWord} = this.state;
		switch (optionSearch) {
			case "제목":
				if(searchWord === "")
				{
					window.location.reload();
				}
				const filtered = this.state.listProblem.filter((element) => element.name.includes(searchWord))
				this.setState({
					listProblem : filtered
				})
				break;
			default:
				window.location.reload();
				break;
		}
	}
	//문제 등록
	handleClickMadeProblem = (event) => {
		event.preventDefault();
		const {problemName, problemContent, problemInput,  problemOutput, problemOutputExam, problemInputExam, level, category, modify} = this.state
		if(!modify){
			//등록
			callAPI(`problems`, 'POST', this.getToken(),{
				problemName : problemName,
				problemContent : problemContent,
				problemInput : problemInput,
				problemOutput : problemOutput,
				problemOutputExam : problemOutputExam,
				problemInputExam : problemInputExam,
				problemLevel : level,
				problemCategory : category
			},null).then(res =>{
				const { message , data} = res.data;
				alert(message);
				if(message === '문제가 추가되었습니다.'){
					this.setState({
						listProblem : this.state.listProblem.concat(data)
					})
					this.props.history.push(`/main/problems/list`);
				}
			})
		}else{
			//수정
			let { id } = qs.parse(this.props.location.search);
			console.log(this.state)
			callAPI(`problems/${id}`, 'PUT', this.getToken(),{
				problemName : problemName,
				problemContent : problemContent,
				problemInput : problemInput,
				problemOutput : problemOutput,
				problemInputExam : problemInputExam,
				problemOutputExam : problemOutputExam,
				problemLevel : level,
				problemCategory : category
			},null).then(res =>{
				const { message} = res.data;
				alert(message);
				if(message === '문제가 수정되었습니다.'){
					this.props.history.push(`/main/problems/list`);
					this.setState({
						problemName : '',
						problemContent : '',
						problemInput : '',
						problemOutput : '',
						problemOutputExam : '',
						problemInputExam : '',
						level : '하',
						category : 'C/C++'
					})
				}
			})
		}
	}
	//문제 수정
	handleModifyProblem = (problem) =>{
		this.setState({
			problemName : problem.name,
			problemContent : problem.content,
			problemInput : problem.input,
			problemOutput : problem.output,
			problemInputExam : problem.input_example,
			problemOutputExam : problem.output_example,
			modify : !this.state.modify
		})
		this.props.history.push(`modify?id=${problem.id}`);
	}
	bodyView = () => {
		const slug = this.props.match.params.slug;
		const {problemName, problemContent , problemInput, problemOutput, problemInputExam,
			problemOutputExam, modify, level, searchWord, optionSearch } = this.state
		switch (slug) {
			case "list":
				return <ListProblem 
				handleFocus = {this.handleFocus}
				optionSearch =  {optionSearch}
				searchWord = {searchWord}
				handleClick = {this.handleClick}
				listProblem = {this.state.listProblem}
				handleModifyProblem = {this.handleModifyProblem}
				handleChange = {this.handleChange}
				handleSearchClick = {this.handleSearchClick}
				/>
			case "view":
				return <ProblemDetails 
				selectedProblem = {this.state.selectedProblem}
				/>
			case "modify":
				return <CreateProblem 
				handleChange = {this.handleChange}
				handleClickMadeProblem = {this.handleClickMadeProblem}
				problemName = {problemName}
				problemContent = {problemContent}
				problemInput = {problemInput}
				problemOutput = {problemOutput}
				problemInputExam = {problemInputExam}
				problemOutputExam = {problemOutputExam}
				level = {level}
				modify = {modify}
				/>
			case "made":
				return <CreateProblem 
				handleChange = {this.handleChange}
				handleClickMadeProblem = {this.handleClickMadeProblem}
				problemName = {problemName}
				problemContent = {problemContent}
				problemInput = {problemInput}
				problemOutput = {problemOutput}
				problemInputExam = {problemInputExam}
				problemOutputExam = {problemOutputExam}
				level = {level}
				modify = {modify}
				/>
			default:
				return	<ListProblem 
				/>
		}
	}
	render(){ 
		return( 
		<div className = "listproblem">
			<div className = "row">
				<div className = "content">
					{this.bodyView()}
				</div>
			</div>
		</div>
		)
  };
}
export default ProblemBank;
