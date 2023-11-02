import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArr: Task[] = []

  addTaskValue: string = ' '
  editTaskValue: string = ' '

  constructor(private globalService: CrudService) { }

  ngOnInit(): void {
    this.taskObj = new Task();
    this.editTaskValue = '';
    this.addTaskValue = ' '
    this.taskArr = [];
    this.getallTask()
  }

  getallTask() {
    this.globalService.getAllTask().subscribe(res => {
      this.taskArr = res;
    },
      err => {
        alert("unable to get list of task")
      }
    )
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue
    this.globalService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = ' ';
    },
      err => {
        alert("somenthing went wrong")
      }
    )
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue
    this.globalService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    },
      err => {
        alert("failed to update task")
      }
    )
  }

  deleteTask(etask: Task) {
    this.globalService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();

    },

      err => {
        alert("something went wrong")
      }
    )
  }


  callTask(estack: Task) {
    this.taskObj = estack
    this.editTaskValue = estack.task_name
  }

}
