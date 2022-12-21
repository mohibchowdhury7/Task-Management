import { AddTaskComponent } from 'src/app/shared/dialog-view/add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { TaskDetailsComponent } from 'src/app/shared/dialog-view/task-details/task-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllTasks()
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent,{
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openTaskDetailsDialog(data) {
    const dialogRef = this.dialog.open(TaskDetailsComponent,{
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getAllTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    this.toDoTasks = tasks.filter(f => f.status === 'to-do')
    this.inProgressTasks = tasks.filter(f => f.status === 'in-progress')
    this.doneTasks = tasks.filter(f => f.status === 'done')
    console.log('this.alltakss', this.toDoTasks);
    console.log('this.alltakss', this.inProgressTasks);
    console.log('this.alltakss', this.doneTasks);

  }

}
