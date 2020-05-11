import React, { Component } from 'react'
import CKEditor from 'ckeditor4-react';
export default class FormWriteNoticeClass extends Component {
    render() {
        const {handleChangeText, handleSubmitNotice, handleEditorNotice, title, content, modify} = this.props;
        return (
        <div className = "form_write">
            <form action="" method="POST" onSubmit = {handleSubmitNotice}>
                <legend>공지사항 작성</legend>
                <div className="form-group">
                    <div className = "form_title">
                        <b>&nbsp;제목 : </b>
                        <input type="text"  name = "title" value = {title} onChange = {handleChangeText}/>
                    </div>
                    <div className = "form_content">
                        <b>&nbsp;내용 :</b><br/>
                        <CKEditor
                            data= {content}
                            onChange = {handleEditorNotice}
                        />
                    </div>
                    <div className = "form_file">
                        <b>첨부 파일 : </b>  <input className = "file_update" type = "file"/>                  
                    </div>
                    <div className = "u-text-center">
                        {
                            modify ? <button type="submit" className="btn_primary">저장</button> : 
                            <button type="submit" className="btn_primary">공지 등록</button>
                        }
                    </div>
                </div>  
            </form>
        </div>
        )
    }
}
