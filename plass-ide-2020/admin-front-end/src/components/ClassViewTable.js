import React, { Component } from 'react'
import { GoFilePdf } from "react-icons/go";
import { Link } from 'react-router-dom';
export default class ClassViewTable extends Component {
   /*  constructor(props){
        super(props);
        console.log(props.test);
    } */
    handleItem= (event) => {
        event.preventDefault();
        this.props.eventItemClick();            
    }
    render() {
        return (
            <table className="table table-contribution" border = "1">
                <thead>
                    <tr>
                        <th width = "10%">번호</th>
                        <th width = "35%">제목</th>
                        <th width = "15%">파일</th>
                        <th width = "15%">작성자</th>
                        <th width = "10%">작성일</th>
                        <th width = "10%">조회수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td><Link onClick = {(event)=> this.handleItem(event)} to = "#" >[일반과제] 개발연구 보고서 [진행]</Link></td>
                        <td><Link to = "#">syllabus.pdf<GoFilePdf/></Link></td>
                        <td>홍길동</td>
                        <td>2020-03-23</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><Link onClick = {(event)=> this.handleItem(event)} to = "#" >[일반과제] 개발연구 보고서 [진행]</Link></td>
                        <td><Link to = "#">syllabus.pdf<GoFilePdf/></Link></td>
                        <td>홍길동</td>
                        <td>2020-03-23</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><Link onClick = {(event)=> this.handleItem(event)} to = "#">[일반과제] 개발연구 보고서 [진행]</Link></td>
                        <td><Link to = "#">syllabus.pdf<GoFilePdf/></Link></td>
                        <td>홍길동</td>
                        <td>2020-03-23</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td><Link onClick = {(event)=> this.handleItem(event)} to = "#">[일반과제] 개발연구 보고서 [진행]</Link></td>
                        <td><Link to = "#">syllabus.pdf<GoFilePdf/></Link></td>
                        <td>홍길동</td>
                        <td>2020-03-23</td>
                        <td>15</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
