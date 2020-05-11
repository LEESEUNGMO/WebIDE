import React, { Component } from 'react';
import callAPI from '../../_utils/apiCaller';
var queryString = require('query-string');

export default class ProblemDetails extends Component {
    constructor(props, context) {
        super(props, context)
        this.state =    {
            selectedProblem : this.props.selectedProblem,
        }
    }
    getToken (){
        const token = localStorage.getItem('token')
        return {
            auth_token : token
        }
    }
    componentDidMount(){
        if(Object.keys(this.state.selectedProblem).length === 0){
            const problemId = queryString.parse(window.location.search).id;
            callAPI(`problems/${problemId}`,'GET',this.getToken(),null).then(res => {
                const fetchProblem = res.data.data[0];
                this.setState({
                    selectedProblem : fetchProblem
                })
            })
        }
    }
    // handleReset = () => {
    //     Alert({
    //         title : "리셋하시 겟습니까?",
    //         btns :[
    //             {
    //                 text: "예", onClick: ()=>{
    //                     let language = this.state.language
    //                     let simpleCode = getSimpleCode(language);
    //                     this.setState({
    //                         language : language,
    //                         editorContent : simpleCode
    //                     })
    //                     var valueEditor = {
    //                         language : language,
    //                         editorContent : simpleCode
    //                     }
    //                     localStorage.setItem("editor", JSON.stringify(valueEditor))
    //                 }
    //             },
    //             {
    //                 text: "아니오", onClick: ()=>{}
    //             }
    //         ]
    //     })
    // }
    render() {
        const {selectedProblem} = this.state;
        return (
            <div  className = "problem_detail">
                <div className = "problem_name u-mr-top-small">
                    <span>{selectedProblem.id}.{selectedProblem.name}</span>
                    {/* <button to = "#"  className = "btn btn_primary" onClick = {() => this.handleDisplayEditor()}>프로젝트 생성</button> */}
                </div>
                <div className = "problem_content">
                    <div className = "define border-btm">
                        <h3>문제</h3>
                        <p>
                        {selectedProblem.content}
                        </p>   
                    </div>    
                    <div className = "problem_input border-btm">
                        <h3>입력</h3>
                        <p>
                        {selectedProblem.input}
                        </p>
                    </div>    
                    <div className = "problem_output border-btm">
                        <h3>출력</h3>
                        <p>
                        {selectedProblem.output}
                        </p>
                    </div>                                           
                    <div className = "problem-example">                   
                        <div className = "col span-1-of-2 example_input">
                            <h3 >입력 예제 1</h3><br/>
                            <textarea className="form-control" cols="55"rows="12" disabled value = {selectedProblem.input_example}>
                            </textarea>
                        </div>
                        <div className = "col span-1-of-2 example_output">
                            <h3 >출력 예제 1</h3><br/>
                            <textarea className="form-control" cols="55" rows="12" disabled  value =  {selectedProblem.output_example}>
                            </textarea>
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
}
