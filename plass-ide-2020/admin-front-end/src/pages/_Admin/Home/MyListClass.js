import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import callAPI from '../../../_utils/apiCaller';
class MyListCoures extends Component {
	constructor(props, context) {
		super(props, context)
		this.state ={
			listMyClass : []
		}
	}
	getToken = () => {
		const token = localStorage.getItem('token')
		return {
			auth_token : token
		}
	}
	componentDidMount(){
		callAPI('lectures/register','GET',this.getToken(),null).then(res => {
				try {
					this.setState({
						listMyClass : res.data.data
					})
				} catch (error) {
					alert("사용하려면 다시 로그인을 하세요")
					this.props.history.push(`/`);	
				}
        })
	}
	render(){ 
    return(	
		<div className = "mylist_class">
		{
			this.state.listMyClass.length !== 0 ?
			<table border="1" className="table table-contribution">
				<thead>
					<tr>
						<th width = "5%">번호</th>
						<th width = "20%">과목 코드</th>
						<th width = "20%">과목명</th>
						<th width = "20%">담당 교수</th>
						<th width = "5%">수정</th>
					</tr>
				</thead>
				<tbody>
				{
					this.state.listMyClass.map((item, index) => (
					<tr key = {index}>
						<td>{index + 1}</td>
						<td>{item.lecture_name}</td>
						<td><Link to = {`/main/class/notice?p=${item.id}`} >{item.title}_{item.lecture_number}</Link></td>
						<td>{item.professor}</td>
						<td><Link to = {`/main/home/classmodify/${item.id}`} className = "btn_classtask">Edit</Link></td>
					</tr>
					))
				}
				</tbody>
			</table>
			:
			<h2 className = "u-text-center">개설된 강좌가 없습니다</h2>
		}
		</div>
		)
	};
}
export default MyListCoures
