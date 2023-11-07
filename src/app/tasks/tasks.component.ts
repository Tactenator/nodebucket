import { Component, OnInit } from '@angular/core';
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
  tasks: Array<Tasks> = []

  currentItem: any;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
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
    const res = await fetch(`http://localhost:3000/api/employees/${this.empId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTaskData)
    });

    const resData = await res.json();

    return resData;

  }

}
