import React, { Component } from 'react';
import ListTasks from '../../../components/ListTasks';
import { MdPlaylistAdd } from 'react-icons/md';

var newTaskName;
var newTaskDate;
class ProjectManager extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      tasks : [
        {
          "id" : "1123",
          "name" : "웹 과제",
          "time" : "02/25"
        },
        {
          "id" : "1121",
          "name" : "디비 과제 ",
          "time" : "02/27"
        },
        {
          "id" : "1124",
          "name" : "공개SW 프로젝트",
          "time" : "02/28"
        },
        {
          "id" : "1125",
          "name" : "안드로인드 과제"
          ,"time" : "02/29"
        }
      ],
      isDisplayAddForm : false
    }   
  }
  onChange = (event) =>{
      var target = event.target;
      var name = target.name;
      var value = target.value;
      name === "date" ? (newTaskDate = value) : (newTaskName = value);
  }
  addForm = () => {
    if(this.state.isDisplayAddForm){
      return (
        <div className = "addForm">
          <textarea name = "name " onChange = {this.onChange}/>
          <input type="date" name = "date" onChange = {this.onChange}/> 
        </div>
      )
    }
  }
  displayAddForm = () => {
    this.setState({
      isDisplayAddForm : !this.state.isDisplayAddForm
    })
  }
  addTaskItem = () => {
    var newTask = {
      "id" : "1111",
      "name" : newTaskName,
      "time" : newTaskDate
    }
    var tempTask = this.state.tasks;
    tempTask.push(newTask);
    this.setState({
      tasks : tempTask
    })
  }
  taskAddOption = () => {
    if(!this.state.isDisplayAddForm){
      return (
        <button onClick = {() => this.displayAddForm()}className = "btn_write"><MdPlaylistAdd />추가</button>
      )
    }else{
      return (
        <>
          <button style = {{background : 'orange'}} onClick = {() => this.displayAddForm()}className = "btn__write"><MdPlaylistAdd />X</button>
          <button onClick = {() => this.addTaskItem()}className = "btn_write"><MdPlaylistAdd />추가</button>
        </>
      )
    }
  }
  addTask = () =>{
    alert("aa");
  }
  render(){ 
    return( 
      <div className = "projects_manager">
        <div className = "row">
          <h2 className = "u-text-center">프로젝트 관리</h2>
          <div className = "project project_1">
              <ListTasks listtask = {this.state.tasks}/>  
              {this.addForm()}
              {this.taskAddOption()}
          </div>
          <div className = "addTask">
            <button onClick = {() => this.addTask()}>+</button>
          </div>
        </div>    
      </div>
    )
  };
}
export default ProjectManager;
