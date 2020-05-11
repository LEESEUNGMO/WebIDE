import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { MdSpeakerNotes, MdLibraryBooks} from "react-icons/md";
import { FaEdit, FaSearch, FaFileAlt} from "react-icons/fa";
import FormWriteNoticeClass from '../../components/FormWriteNoticeClass';
import callAPI from '../../_utils/apiCaller';
import moment  from 'moment';
import qs from 'query-string';
class ClassNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listNotice : [],
            listHomework : [],
            isDisplayWriteNotice : false,
            isDisplayViewNotice : false,
            isDisplayViewHomework: false,
            clickViewItem : {},

            title : '',
            contents : '',
            notice_id : '',
            file: '',
            week : 1,
            file : '',
            
            modify : false,

            optionSearch : '제목',
            searchTextNotice : '',

            optionSearchHomework: '제목',
            searchTextHomework : '',
        }
    }
    getToken = () =>{
        const token = localStorage.getItem('token');
        return {
            auth_token : token
        }
    }
    componentDidUpdate(prevProps){
        if (prevProps.classId !== this.props.classId) {
            const { classId } =  this.props
            callAPI(`lectures/${classId}/notice`, 'GET', this.getToken(),null).then(res => {
                this.setState({
                    listNotice : res.data.data
                })
            })
            callAPI(`lectures/${classId}/homework`, 'GET', this.getToken(),null).then(res => {
                this.setState({
                    listHomework : res.data.data
                })
            })
        }
    }
    componentDidMount()
	{
        window.addEventListener("keydown", (event) => {
            if(event.keyCode === 13)
            {
                if(this.isEnterKeyNotice)
                {
                    this.handleSearchClick("searchNotice");
                }else if(this.isEnterKeyHomework)
                {
                    this.handleSearchClick("searchHomework");
                }
                
            }
        })
        const { classId } =  this.props
        callAPI(`lectures/${classId}/notice`, 'GET', this.getToken(),null).then(res => {
            this.setState({
                listNotice : res.data.data
            })
        })
        callAPI(`lectures/${classId}/homework`, 'GET', this.getToken(),null).then(res => {
            this.setState({
                listHomework : res.data.data
            })
        })
	}
    handleWriteNotice = (event) => {   
        event.preventDefault();
        this.setState({
            title : '',
            contents : '',
            notice_id : '',
            file: '',
            week : 1,
            file : '',
            isDisplayWriteNotice : !this.state.isDisplayWriteNotice
        })
    }
    detailsNotice = (notice) => {
        let {isDisplayViewNotice, clickViewItem} = this.state;
        if(isDisplayViewNotice)
        {
            if(clickViewItem === notice)
            {
                this.setState({
                    isDisplayViewNotice : !isDisplayViewNotice,
                })
            }else{
                this.setState({
                    clickViewItem: notice
                })
            }
        }else{
            this.setState({
                isDisplayViewNotice : !this.state.isDisplayViewNotice,
                clickViewItem : notice
            })
        }
    }
    handleChangeText = (event) => {
        const {name , value } = event.target;
        if(name === 'file')
        {
            this.setState({ file : event.target.files[0] })
        }else{
            this.setState({ [name] : value })
        }
    }
    onEditorChange = (event) => {
        this.setState({
            contents : event.editor.getData()
        })
    }
    // 공지사항 작성 및 수정 이벤트 핸들러
    handleSubmitNotice= (event) => { 
        event.preventDefault();
        const {p} = qs.parse(this.props.location.search);
        if(!this.state.modify){  //공지사항 등록
            const data = new FormData() 
            data.append('file', this.state.file);
            const noticeData = {
                title : this.state.title,
                contents : this.state.contents,
                week : this.state.week,
            }
            data.append('notice', JSON.stringify(noticeData));
            callAPI(`lectures/${p}/notice`,'POST', {...this.getToken(),...{'Content-Type' : 'multipart/form-data'}},
                data).then(res => {
                const {message, data} = res.data;
                if(message === '공지 생성에 성공했습니다.')
                {
                    alert(message);
                    this.setState({
                        listNotice : this.state.listNotice.concat(data),
                        isDisplayWriteNotice : !this.state.isDisplayWriteNotice
                    })
                }else{
                    alert(message)
                }
            })
        }else{ //공지사항 수정
            callAPI(`lectures/${p}/notice/${this.state.notice_id}`,'PUT', this.getToken(), {
                title : this.state.title,
                contents : this.state.contents,
                week : this.state.week,
                file : this.state.file,
            }).then(res => {
                const {message, data} = res.data;
                if(message === '공지사항을 수정하였습니다.')
                {
                    alert(message);
                    this.setState({
                        listNotice : data,
                        isDisplayWriteNotice : !this.state.isDisplayWriteNotice
                    })
                }else{
                    alert(message)
                }
            })
        }
    }
    //공지사항 수정 이벤트 핸들러
    handleUpdate = (notice , event) => {
        event.preventDefault();
        this.setState({
            isDisplayViewNotice : !this.state.isDisplayViewNotice,
            isDisplayWriteNotice : !this.state.isDisplayWriteNotice,
            title : notice.title,
            content : notice.contents,
            notice_id : notice.id,
            file: '11',
            week: notice.week,
            modify : !this.state.modify
        })
    }
    //공지사항 삭제 이벤트 핸들러
    handleRemove = async (noticeId, event) => {
        event.preventDefault();
        const {p} = qs.parse(this.props.location.search);
        callAPI(`lectures/${p}/notice/${noticeId}`,'DELETE', this.getToken(),null).then(res => {
            alert(res.data.message)
            const filtered = this.state.listNotice.filter(element => element.id !== noticeId);
            this.setState({
                listNotice : filtered,
                isDisplayViewNotice : !this.state.isDisplayViewNotice
            })
        })
    }
    isEnterKeyNotice = false;
    handleFocusSearchNotice = () => {
        this.isEnterKeyNotice = true;
    }
    isEnterKeyHomework = false;
    handleFocusSearchHomework = () => {
        this.isEnterKeyHomework = true
    }
    handleSearchClick(method){
        const {optionSearch, searchTextNotice, optionSearchHomework, searchTextHomework} = this.state
        if(method === 'searchNotice')
        {
            switch (optionSearch) {
                case "제목":
                    if(searchTextNotice){
                        const filtered = this.state.listNotice.filter(element => element.title.includes(searchTextNotice))
                        if(filtered.length !== 0){
                            this.setState({
                                listNotice : filtered
                            })
                        }else{
                            window.location.reload();
                        }
                    }else{
                        window.location.reload();
                    }
                    break;    
                default:
                    if(searchTextNotice){
                        const filtered = this.state.listNotice.find(element => element.writer === (searchTextNotice))
                        if(filtered.length !== 0){
                            this.setState({
                                listNotice : filtered
                            })
                        }else{
                            window.location.reload();
                        }
                    }else{
                        window.location.reload();
                    }
                    break;
            }
        }else{
                switch (optionSearchHomework) {
                    case "제목":
                        if(searchTextHomework){
                            const filtered = this.state.listHomework.filter(element => element.title.includes(searchTextHomework))
                            if(filtered.length !== 0){
                                this.setState({
                                    listHomework : filtered
                                })
                            }else{
                                window.location.reload();
                            }
                        }else{
                            window.location.reload();
                        }
                        break;   
                    default: 
                        //nothing
                        break;
                }
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
                link.setAttribute("donwload", fileName);
                link.setAttribute("target", '_blank');
                document.body.appendChild(link);
                link.click();
            }
        })
        event.stopPropagation();
    }
    //Homework 관리 작업
    render() {
        const { listNotice, isDisplayViewNotice, isDisplayWriteNotice, listHomework} = this.state;
        return (
            <>
            <div className  = "class_board">
                <h2><i className = "icon"> <MdSpeakerNotes /></i>공지사항</h2>
                    <div className = "headding u-mr-bottom-small">
                        <select value = {this.state.optionSearch} name = "optionSearch" onChange = {(event) => {this.handleChangeText(event)}} className = "select_option" required="required">
                            <option value="제목">제목</option>
                            <option value="작성자">작성자</option>
                        </select>
                        <div className = "search_box">
                            <input  className = "search_box-text" type="text" name = "searchTextNotice"  onChange = {(event) => {this.handleChangeText(event)}} onFocus = {() => this.handleFocusSearchNotice()} placeholder="Search.."></input>
                            <button className = "search_box-btn" type="submit"><i className="icon" onClick = {() => this.handleSearch("searchNotice")}><FaSearch/></i></button>
                        </div>
                        <Link className = "btn_write u-mr-bottom-small" to = "#" onClick = {(event)=> this.handleWriteNotice(event)}><i className = "icon"><FaEdit/></i>글쓰기</Link>
                    </div>
                    <div  className = "board_content u-mr-bottom-small">
                    {
                    listNotice.length !== 0 ?
                        <table className="table table-contribution" border = "1">
                            <thead>
                                <tr>
                                    <th width = "5%">번호</th>
                                    <th width = "35%">제목</th>
                                    <th width = "10%">주차</th>
                                    <th width = "10%">파일</th>
                                    <th width = "10%">작성자</th>
                                    <th width = "10%">작성일</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {
                                    listNotice.slice(0).reverse().map((item, index) => (
                                        <tr key = {index}>
                                            <td>{this.state.listNotice.length - index}</td>
                                            <td 
                                            style = {{cursor : 'pointer'}}
                                            onClick = {() => this.detailsNotice(item)}>{item.title}</td>
                                            <td>{item.week}</td>
                                            <td><Link to = '/' onClick = {(event)=> this.downloadFile(event, item.path, item.name)} >{item.name ? <FaFileAlt style = {{fontSize : '15px', position : 'relative', top : '3px'}}/> : ''}</Link></td>
                                            <td>{item.writer}</td>
                                            <td>{moment(item.created).format("YYYY-MM-DD")}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <h2 className = "u-text-center">현재 공지사항이 없습니다.</h2>
                    }
                    {
                        isDisplayViewNotice && 
                        <div className = "form_itemview u-mr-top-small">
                                <div className = "tasks">
                                    <button className = "btn_task" onClick = {(event) => this.handleUpdate(this.state.clickViewItem, event)}><i className = "far fa-edit">&nbsp;</i>수정</button>&nbsp;
                                    <button className = "btn_task" onClick = {(event) => this.handleRemove(this.state.clickViewItem.id, event)}><i className = "fas fa-eraser">&nbsp;</i>삭제</button>&nbsp;
                                    <button className = "btn_task" onClick = {() =>
                                        this.setState({isDisplayViewNotice : !this.state.isDisplayViewNotice})
                                    }>
                                    <i className = "far fa-times-circle">&nbsp;</i>닫기</button>
                                </div>
                                <div className = "form_itemview-information">
                                    <b>제목 : {this.state.clickViewItem.title} &nbsp;&nbsp;&nbsp; </b>
                                    <b>작성일 : {moment(this.state.clickViewItem.created).format("YYYY-MM-DD")}&nbsp;&nbsp;&nbsp; </b>
                                    <div className = "form_itemview-content" dangerouslySetInnerHTML={{__html: this.state.clickViewItem.contents}}/>
                                </div>
                                <div className = "form_itemview-file">
                                        <b>첨부 파일 : </b> <Link to = "#" >{this.state.clickViewItem.name ? this.state.clickViewItem.name : ''}</Link>
                                </div>
                        </div>
                    }
                    </div>
                    <div className = "board_content-view u-mr-bottom-small"  >
                        {
                            isDisplayWriteNotice &&
                            <FormWriteNoticeClass
                                handleChangeText = {this.handleChangeText}
                                handleSubmitNotice = {this.handleSubmitNotice}
                                handleEditorNotice = {this.onEditorChange} 
                                title = {this.state.title}
                                content = {this.state.content}
                                modify = {this.state.modify}
                                week = {this.state.week}
                            />
                        }
                    </div>
            </div>
            <div className  = "class_board u-mr-top-big">
            <h2><i className = "icon"> <MdLibraryBooks /></i>과제 관리</h2>
                <div className = "headding u-mr-bottom-small">
                    <select value = {this.state.optionSearchHomework} name = "optionSearchHomework" onChange = {(event) => {this.handleChangeText(event)}} className = "select_option" required="required">
                        <option value="제목">제목</option>
                    </select>
                    <div className = "search_box">
                        <input  className = "search_box-text" type="text" name = "searchTextHomework"  onChange = {(event) => {this.handleChangeText(event)}} onFocus = {() => {this.handleFocusSearchHomework()}} placeholder="Search.."></input>
                        <button className = "search_box-btn" type="submit"><i className="icon" onClick = {() => this.handleSearch("searchHomework")}><FaSearch/></i></button>
                    </div>
                </div>
                <div  className = "board_content u-mr-bottom-small">
                {
                listHomework.length !== 0 ?
                    <table className="table table-contribution" border = "1">
                        <thead>
                            <tr>
                                <th width = "5%">번호</th>
                                <th width = "35%">제목</th>
                                <th width = "10%">주차</th>
                                <th width = "10%">파일</th>
                                <th width = "10%">작성일</th>
                                <th width = "10%">제출기한</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {
                                listHomework.slice(0).reverse().map((item, index) => (
                                    <tr key = {index}>
                                        <td>{listHomework.length - index}</td>
                                        <td>{item.title}</td>
                                        <td>{item.week}</td>
                                        <td><Link to = '' onClick = {(event)=> this.downloadFile(event, item.path, item.name)}>{item.name ? <FaFileAlt style = {{fontSize : '15px', position : 'relative', top : '3px'}} /> : ''}</Link></td>
                                        <td>{moment(item.updated).format("YYYY-MM-DD")}</td>
                                        <td>{moment(item.limitdate).format("YYYY-MM-DD")}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                :
                <h2 className = "u-text-center">현재 과제가 없습니다.</h2>
                }
            </div>
        </div>
        </>
        )
    }
}
export default ClassNotice;