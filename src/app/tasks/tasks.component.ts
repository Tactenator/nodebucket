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
    console.log(this.tasks)
  }

}
