/**
 * Title: tasks.component.ts
 * Author: Trevor McLaurine
 * Date: 11/13/2023
 * Description: Task Component
 */

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
  taskToDelete: String
  newTaskForm: FormGroup;

  tasks: Array<Tasks> = []

  currentItem: any;

  constructor(private cookieService: CookieService, private fb: FormBuilder) {}

  ngOnInit(): void {
    //initializes the form group and provides validators
    this.newTaskForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      status: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      importance: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      description: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      taskId: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });
    //fetches task of logged in employee
    this.fetchTasks()
  }

  //uses fetch API to fetch tasks and place them in the tasks array
  async fetchTasks() {
    this.empId = this.cookieService.get('empId')
    const res = await fetch(`https://nodebucket-api.onrender.com/api/employees/${this.empId}`)
    const data = await res.json()
    const newTasks = data.tasks;
    newTasks.forEach((task) => {
      this.tasks.push(task)
    })
  }

  //filters each tasks based on the status of the task. Allows each task to be placed in it's appropriate place
  filterTasks(status: string) {
    return this.tasks.filter(x => x.status == status)
  }

  //ensures that the current item is always registered on drag.
  onDragStart(item: any) {
    this.currentItem = item;
  }

  //updates the status of the task based on where it is dropped.
  onDrop(e: any, status: string) {
    e.preventDefault()
    const record = this.tasks.find(x => x.taskId == this.currentItem.taskId)
    if(record != undefined){
      record.status = status;
      //calls to update task in database based on status change
      this.updateTask(record.name, record.date, record.description, record.importance, record.status, record.taskId )
    }
    this.currentItem = null ;
  }

  //essentially stops the page from halting dragging. The default is to reload, which this will prevent.
  onDragOver(e: any) {
    e.preventDefault()
  }

  //updates the task based on the new status where it was dragged to.
  async updateTask(name: String, date: String, description: String, importance: String, status: String, taskId: String) {
    const newTaskData = {
      name: name,
      date: date,
      description: description,
      importance: importance,
      status: status,
      taskId: taskId
    }
    const res = await fetch(`https://nodebucket-api.onrender.com/api/employees/${this.empId}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTaskData)
    });

    const resData = await res.json();

    return resData;

  }

  //deletes a task in the database.
  async deleteTask(taskId: String) {
    if(this.taskToDelete != ''){
      const res = await fetch(`https://nodebucket-api.onrender.com/api/employees/${this.empId}/tasks/${taskId}`,  {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });

      const resData = 'Task deleted successfully'

      //location.reload is to reload the page and show the new list of tasks.
      location.reload()
      this.taskToDelete = ''
      return resData;
    }
    else {
      return ''
    }

  }

  //changes classlist of new task modal and allows it to be seen.
  showCreateTaskModal() {
    const modal = document.querySelector('.create-task-modal')
    modal.classList.remove('hidden')
  }

  //hides the task modal after user clicks the X in the corner.
  hideCreateTaskModal() {
    const modal = document.querySelector('.create-task-modal')
    modal.classList.add('hidden')
  }

  showDeleteTaskModal(taskId: String) {
    this.taskToDelete = taskId
    const modal = document.querySelector('.delete-task-modal')
    modal.classList.remove('hidden')
  }

  //hides the task modal after user clicks the X in the corner.
  closeDeleteTaskModal() {
    const modal = document.querySelector('.delete-task-modal')
    modal.classList.add('hidden')
  }

  //adds a new task to the database.
  async addNewTask( ) {
    const formValues = this.newTaskForm.value;
    const newTask = {
      name: formValues.name,
      description: formValues.description,
      status: formValues.status,
      importance: formValues.importance,
      taskId: formValues.taskId
    }

    const res = await fetch(`https://nodebucket-api.onrender.com/api/employees/${this.empId}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })

    const resData = await res.json();

    const modal = document.querySelector('.create-task-modal')
    modal.classList.add('hidden')
    location.reload()
    return resData;
  }



}
