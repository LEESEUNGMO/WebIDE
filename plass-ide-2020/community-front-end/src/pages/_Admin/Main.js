import React, { Component } from 'react';
import { 
} from 'react-bootstrap';
import Home from './Home/Home';
import ProjectManager from './ProjectManage.js/ProjectManage';
import ProblemBank from './ProblemsBack/ProblemsBank';
import Header from '../../components/Header/Header';
import Class from './Class/Class';
import {connect} from 'react-redux';
import { userActions} from '../../_action';
import { Route} from 'react-router';
class Main extends Component {
    componentDidMount() {
        //사용자부터 정보과 자기 신청한 과목 API 보냄
        this.props.getUser();
    }
    render(){ 
        return(
        <>
            <Header
                id = {this.props.userData.userid}
                userSeq = {this.props.userData.id}
                userName = {this.props.userData.name}
            />
            <div className = "content">
                <Route exact path = {`${this.props.match.path}`} component = {Home}/>
                <Route  path = {`${this.props.match.path}/home`} component = {Home}/>
                <Route  path = {`${this.props.match.path}/class`} component = {Class}/>
                <Route exact path = {`${this.props.match.path}/problems/:slug`} component = {ProblemBank}/>
                <Route exact path = {`${this.props.match.path}/project`} component = {ProjectManager}/>
            </div>
        </>
    )
    };
}
const mapStateToProps = (state, ownProps) => {
    const{user} = state
    return {
        userData: user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getUser: () => {
                dispatch(userActions.getUser());
            }
        }
};
export default connect(mapStateToProps,mapDispatchToProps)(Main);
