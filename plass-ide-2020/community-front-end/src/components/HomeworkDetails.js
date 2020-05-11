import React, { Component } from 'react'
import { MdLibraryBooks } from 'react-icons/md'
import callAPI from '../_utils/apiCaller';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import { GoFilePdf } from 'react-icons/go';
import moment from 'moment';
export default class componentName extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = ({
            detailsHomework : []
        })
    }
    async componentDidMount(){
        const token = localStorage.getItem('token');
        const {p, id} = qs.parse(this.props.location.search);
        await callAPI(`lectures/${p}/homework/${id}`,'GET',{auth_token : token}, null).then(res => {
            this.setState({
                detailsHomework : res.data.data
            })
        })
    }   
    render() {
        const {detailsHomework} = this.state;
        return (
        <div className = "class_homeworks_details">   
			<h2><i className = "icon"><MdLibraryBooks /></i>과제 뷰</h2>
                    {
                        detailsHomework.length !== 0 && 
                        <div className = "form_itemview u-mr-top-small">
                            <div className = "form_itemview-title">
                            </div>
                                {console.log(detailsHomework[0])}
                                <div className = "form_itemview-information">
                                    <b>제목 : {detailsHomework[0].title} &nbsp;&nbsp;&nbsp; </b>
                                    <b>작성일 : {moment(detailsHomework[0].created).format("YYYY-MM-DD")}&nbsp;&nbsp;&nbsp; </b>
                                    <b>주차 : {detailsHomework[0].week}&nbsp;&nbsp;&nbsp; </b>
                                    <div className = "form_itemview-content" dangerouslySetInnerHTML={{__html: detailsHomework[0].description}}/>
                            </div>
                            <div className = "form_itemview-file">
                                    <b>첨부 파일 : </b> <Link to = "#" >syllabus.pdf<GoFilePdf/></Link>
                            </div>
                        </div>
                    }
            <p></p>
        </div>
        )
    }
}
