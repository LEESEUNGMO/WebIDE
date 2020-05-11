import React, { Component } from 'react';
import {
    Link
    } from "react-router-dom";
import callAPI from '../_utils/apiCaller';
import moment from 'moment'; 
class Homework extends Component {
    getToken = () => {
        const token = localStorage.getItem('token')
        return {
            auth_token : token
        }
    }
    downloadFile = (event, path, name) => {
        event.preventDefault();
        let fileName = path.substring(7, path.length);
        callAPI(`download/${fileName}`,'GET',this.getToken(),null).then(res => {
            const {data} = res;
            if(data === 'Error file dose not exists'){
                alert(data + ". 관리자 문의하세요.");
            }else{
                const url = res.data.url
                const link = document.createElement('a');
                link.href = `${process.env.REACT_APP_API_URL}/${url}`;
                // link.setAttribute("donwload", fileName) 안 됨
                link.setAttribute("target", '_blank');
                document.body.appendChild(link);
                link.click();
            }
        })
        event.stopPropagation();
    }
    checkLimitDate = ({update, limitdate}) => {
        let today = new Date().toLocaleDateString();
        today = moment(today).format('YYYY-MM-DD');
        const strongStyles = {
            fontSize : '13px',
            paddingLeft : '10px'
        }
        if(today >= update && today <= limitdate)
        {
            return (
                <strong
                style = {{...strongStyles, color:'blue'}}
                >[진행중...]</strong>
            )
        }else if(today < update){
            return(
                <strong
                style = {{...strongStyles, color:'orange'}}
                >[예정...]</strong>
            )
        }else{
            return(
                <strong
                style = {{...strongStyles, color:'red'}}
                >[마감...]</strong>
            )
        }
    }
    render(){
    return(
        <div className = "homework border-1">
            <div className = "homework_title border-btm">
                <div className = "title ">
                    <Link to = {`homeworkview/${this.props.id}?p=심화프로그래밍`}><b>[일반과제] {this.props.title}</b><this.checkLimitDate update = {this.props.updated} limitdate = {this.props.limitdate} /></Link>
                    <div className = "tasks">
                        <ul className = "ul-nolist-inline">
                            <li><Link to = {`homeworkdetails?p=${this.props.course}&id=${this.props.id}`} className = "btn btn_classtask">제출정보</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className = "homework_file border-btm">
                <b className = "u-float-right">{moment(this.props.created).format("YYYY-MM-DD")}</b>
                <span className = "u-float-right">작성일 : </span>
                <span>제출기간 : </span>
                <b>{moment(this.props.updated).format("YYYY-MM-DD")} ~ {moment(this.props.limitdate).format("YYYY-MM-DD")}</b>
            </div>
            <div className = "homework_content border-btm" dangerouslySetInnerHTML = {{__html : this.props.description}}>
            </div>
            <div className = "homework_file">
                <b>첨부 파일 : </b>
                <Link to = '#' onClick = {(event) => this.downloadFile(event, this.props.file.path)}>{this.props.file.name ? this.props.file.name : ''}</Link>
            </div>
        </div>
    )
};
}
export default Homework;
