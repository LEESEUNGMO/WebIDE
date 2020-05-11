import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class CreateProblem extends Component {
    render() {
        const {handleChange, handleClickMadeProblem} = this.props
        const {problemName, problemContent, problemInput, problemOutput, problemInputExam, problemOutputExam, level, modify, category} = this.props
        return (
            <div className = "create_problem">
                <div  className = "problem_detail">
                <div className = "problem_name">
                    <h2 className = "u-text-center">문제 작성</h2>
                    {
                        modify ?  <Link to = "#"  className = "btn btn_primary u-float-right" onClick = {handleClickMadeProblem}>문제 수정</Link> :
                        <Link to = "#"  className = "btn_primary u-float-right" onClick = {handleClickMadeProblem}>문제 등록</Link>
                    }
                </div>
                <div className = "problem_content">
                    <div className = "define border-btm">
                        <h3>문제 이름 :</h3><input value = {problemName} name = "problemName" onChange = {handleChange} type = "text"/>
                        <h3 className = "level">난이도 </h3> 
                        <select className = "level_select" name = "level" onChange = {handleChange} value = {level}>
                            <option value = "하">하</option>
                            <option value = "중">중</option>
                            <option value = "급">급</option>
                        </select>
                        <h3 className = "category">언어 </h3> 
                        <select name = "category" className = "category_select" onChange = {handleChange} value = {category}>
                            <option value = "C/C++">C/C++</option>
                            <option value = "JAVA">JAVA</option>
                            <option value = "JAVA">Python</option>
                        </select>
                    </div>  
                    <div className = "define border-btm u-mr-top-small">
                        <h3>문제 </h3>
                        <p>
                            <textarea className="form-control" cols="100" rows="5" value = {problemContent}  name = "problemContent" onChange = {handleChange} />
                        </p>
                    </div>    
                    <div className = "problem_input border-btm">
                        <h3>입력</h3>
                        <p>
                            <textarea className="form-control" cols="100" rows="5" value =  {problemInput}  name = "problemInput" onChange = {handleChange} />
                        </p>
                    </div>    
                    <div className = "problem_output border-btm">
                        <h3>출력</h3>
                        <p>
                            <textarea className="form-control" cols="100" rows="5"  value = {problemOutput} name = "problemOutput" onChange = {handleChange} />
                        </p>
                    </div>                                           
                    <div className = "problem-example">                   
                        <div className = "col span-1-of-2 example_input">
                            <h3 >입력 예제 1</h3><br/>
                            <textarea className="form-control u-mr-top-small" cols="55" rows="8" value = {problemInputExam} name = "problemInputExam"  onChange = {handleChange} />
                        </div>
                        <div className = "col span-1-of-2 example_output">
                            <h3 >출력 예제 1</h3><br/>
                            <textarea className="form-control u-mr-top-small" cols="55" rows="8" value = {problemOutputExam} name = "problemOutputExam"  onChange = {handleChange} />
                        </div>
                    </div>    
                </div>
            </div>
            </div>
        )
    }
}
