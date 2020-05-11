import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import qs from  'query-string';
import callAPI from '../../../_utils/apiCaller';
export default class CreateProblem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name : '',
			content : '',
			input : '',
			output : '',
			input_example : '',
			output_example : '',
			category : 'C/C++',
			level : '하',
        }
    }
    getToken (){
        const token = localStorage.getItem('token')
        return {
            auth_token : token
        }
    }
    componentDidMount()
    {
        const { method } = this.props
        if(method === "modify")
        {
            if(Object.keys(this.props.problem).length)  
            {
                let { name, content, input, output, input_example, output_example, category, level} = this.props.problem[0];
                this.setState({
                    name, content, input, output, input_example, output_example, category, level
                })
            }
            else{
                const { id } = qs.parse(this.props.location.search);
                callAPI(`problems/${id}`,'GET',this.getToken(),null).then(res => {
                    let { name, content, input, output, input_example, output_example, category, level} = res.data.data[0];
                    console.log(res.data.data[0])
                    this.setState({
                        name, content, input, output, input_example, output_example, category, level
                    })
                })

            }
        }else{ //create problem
            
        }
    }
    onSubmit = (event) => {
        event.preventDefault();
        let { method } = this.props;
		const { name, content, input,  output, input_example, output_example, level, category} = this.state
		if(method === 'create'){
			//등록
			callAPI(`problems`, 'POST', this.getToken(),{
                name, content, input,  output, input_example, output_example, level, category
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
				name, content, input,  output, input_example, output_example, level, category
			},null).then(res =>{
				const { message} = res.data;
				alert(message);
				if(message === '문제가 수정되었습니다.'){
					this.props.history.push(`/main/problems/list`);
					this.setState({
						name : '',
						content : '',
						input : '',
						output : '',
						input_example : '',
						output_example : '',
						level : '하',
						category : 'C/C++'
					})
				}
            })
        }
    }
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }
    render() {
        let { method } = this.props
        let { name, content, input, output, input_example, output_example, category, level } = this.state;
        return (
            <div className = "create_problem">
                <div  className = "problem_detail">
                <div className = "problem_name">
                    <h2 className = "u-text-center">문제 작성</h2>
                    {
                        method === 'modify' ?  <Link to = "#"  className = "btn btn_primary u-float-right" onClick = {this.onSubmit}>문제 수정</Link> :
                        <Link to = "#"  className = "btn_primary u-float-right" onClick = {this.onSubmit}>문제 등록</Link>
                    }
                </div>
                <div className = "problem_content">
                    <div className = "define border-btm">
                        <h3>문제 이름 :</h3><input value = {name} name = "name" onChange = {event => this.handleChange(event)} type = "text"/>
                        <h3 className = "level">난이도 </h3> 
                        <select className = "level_select" name = "level" onChange = {event => this.handleChange(event)} value = {level}>
                            <option value = "하">하</option>
                            <option value = "중">중</option>
                            <option value = "급">급</option>
                        </select>
                        <h3 className = "category">언어 </h3> 
                        <select name = "category" className = "category_select" onChange = {event => this.handleChange(event)} value = {category}>
                            <option value = "C/C++">C/C++</option>
                            <option value = "JAVA">JAVA</option>
                            <option value = "JAVA">Python</option>
                        </select>
                    </div>  
                    <div className = "define border-btm u-mr-top-small">
                        <h3>문제</h3>
                        <p>
                            <textarea className="form-control" cols="100" rows="5" value = {content}  name = "content" onChange = {event => this.handleChange(event)} />
                        </p>
                    </div>    
                    <div className = "problem_input border-btm">
                        <h3>입력</h3>
                        <p>
                            <textarea className="form-control" cols="100" rows="5" value =  {input}  name = "input" onChange = {event => this.handleChange(event)} />
                        </p>
                    </div>    
                    <div className = "problem_output border-btm">
                        <h3>출력</h3>
                        <p>
                            <textarea className="form-control" cols="100" rows="5"  value = {output} name = "output" onChange = {event => this.handleChange(event)} />
                        </p>
                    </div>                                           
                    <div className = "problem-example">                   
                        <div className = "col span-1-of-2 example_input">
                            <h3 >입력 예제 1</h3><br/>
                            <textarea className="form-control u-mr-top-small" cols="55" rows="8" value = {input_example} name = "input_example"  onChange = {event => this.handleChange(event)} />
                        </div>
                        <div className = "col span-1-of-2 example_output">
                            <h3 >출력 예제 1</h3><br/>
                            <textarea className="form-control u-mr-top-small" cols="55" rows="8" value = {output_example} name = "out_example"  onChange = {event => this.handleChange(event)} />
                        </div>
                    </div>    
                </div>
            </div>
            </div>
        )
    }
}
