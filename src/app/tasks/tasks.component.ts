import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Tasks } from '../tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {

  empId: string
  name: string
  newTaskForm: FormGroup;

  tasks: Array<Tasks> = []

  currentItem: any;

  constructor(private cookieService: CookieService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.newTaskForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      status: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      importance: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      description: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      taskId: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });
    this.fetchTasks()
  }

  async fetchTasks() {
    this.empId = this.cookieService.get('empId')
    const res = await fetch(`http://localhost:3000/api/employees/${this.empId}`)
    const data = await res.json()
    const newTasks = data.tasks;
    newTasks.forEach((task) => {
      this.tasks.push(task)
    })
  }

  filterTasks(status: string) {
    return this.tasks.filter(x => x.status == status)
  }

  onDragStart(item: any) {

    this.currentItem = item;
  }

  onDrop(e: any, status: string) {

    e.preventDefault()
    const record = this.tasks.find(x => x.taskId == this.currentItem.taskId)
    if(record != undefined){
      record.status = status;
      this.updateTask(record.name, record.date, record.description, record.importance, record.status, record.taskId )
    }
    this.currentItem = null ;
  }

  onDragOver(e: any) {
    e.preventDefault()
  }

  async updateTask(name: String, date: String, description: String, importance: String, status: String, taskId: String) {
    const newTaskData = {
      name: name,
      date: date,
      description: description,
      importance: importance,
      status: status,
      taskId: taskId
    }
    const res = await fetch(`http://localhost:3000/api/employees/${this.empId}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTaskData)
    });

    const resData = await res.json();

    return resData;

  }

  async deleteTask(taskId: String) {
    const res = await fetch(`http://localhost:3000/api/employees/${this.empId}/tasks/${taskId}`,  {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });

    const resData = 'Task deleted successfully'

    console.log(resData)
    return resData;
  }

  showCreateTaskModal() {
    
  }

  addNewTask( ) {
    const name = document.getElementById('name')
    console.log(name.innerHTML)
  }

}
