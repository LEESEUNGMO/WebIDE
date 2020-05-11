import React, { Component } from 'react';
import ListProblem from '../../../layout/ListProblem/ListProblem';
import ProblemDetails from '../../../layout/ListProblem/ProblemDetails';
import callAPI from '../../../_utils/apiCaller';
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
    async componentDidMount(){
		window.addEventListener("keydown", (event) => {
			if(event.keyCode  === 13)
			{
				if(this.isEnterKey)
				{
					console.log("enterkey")
					this.handleSearchClick();
				}
			}
		})
        await callAPI('problems','GET',this.getToken(),null).then(res => {
            this.setState({
                listProblem : res.data.data
            })
        })
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
	handleClickMadeProblem = () => {
		callAPI(`problems`, 'POST', this.getToken(),{
			problemName : this.state.problemName,
			problemContent : this.state.problemContent,
			problemInput : this.state.problemInput,
			problemOutput : this.state.problemOutput,
			problemOutputExam : this.state.problemOutputExam,
			problemInputExam : this.state.problemInputExam,
		},null).then(res =>{
			alert(res.data.message)
			this.setState({
				problemName : '',
				problemContent : '',
				problemInput : '',
				problemOutput : '',
				problemOutputExam : '',
				problemInputExam : '',
			})
		})
	}
	//문제 수정
	handleModifyProblem = (problem) =>{
		this.setState({
			problemName : problem.name,
			problemContent : problem.content,
			problemInput : problem.input,
			problemOutput : problem.ouput,
			problemInputExam : problem.input_example,
			problemOutputExam : problem.output_example,
		})
		this.props.history.push(`modify?id=${problem.id}`);
	}
	bodyView = () => {
		const slug = this.props.match.params.slug;
		switch (slug) {
			case "list":
				return <ListProblem 
				handleFocus = {this.handleFocus}
				optionSearch =  {this.state.optionSearch}
				searchWord = {this.state.searchWord}
				handleClick = {this.handleClick}
				listProblem = {this.state.listProblem}
				handleChange = {this.handleChange}
				handleSearchClick = {this.handleSearchClick}
				/>
			case "view":
				return <ProblemDetails 
				selectedProblem = {this.state.selectedProblem}
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
