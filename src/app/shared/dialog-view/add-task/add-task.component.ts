import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  persons = [
    'Person 1', 'Person 2', 'Person 3', 'Person 4', 'Person 5'
  ]
// Data Form
@ViewChild('formElement') formElement: NgForm;
dataForm: FormGroup;

// Store Data
id?: string;
task?: Task;
tasks?: Task[] = [];


// Subscriptions
private subDataOne: Subscription;
private subDataTwo: Subscription;
private subDataThree: Subscription;

constructor(
  private fb: FormBuilder,
  private activatedRoute: ActivatedRoute,
  // private taskService: TaskService,
  private dialog: MatDialog,
) {
}

ngOnInit(): void {
  // Init Data Form
  this.initDataForm();

  // GET ID FORM PARAM
  this.activatedRoute.paramMap.subscribe((param) => {
    this.id = param.get('id');

    if (this.id) {
      this.getTaskById();
    }
  });
}

 /**
   * FORMS METHODS
   * initDataForm()
   * setFormValue()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      priority: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      status: [null, Validators.required],
      person: [null, Validators.required],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue({...this.task});
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      // this.uiService.warn('Please filed all the required field');
      return;
    }
    console.log('dataform', this.dataForm.value);


    if (this.task) {
      this.updateTaskById();
    } else {
      this.tasks.push(this.dataForm.value)
      console.log('tasks', this.tasks);

      this.addTask();
    }

  }


  /**
   * HTTP REQ HANDLE
   * getTaskById
   * addTask
   * updateTaskById
   */
  private getTaskById() {
    // const select = 'name email username phoneNo gender role permissions hasAccess'

  }

  private addTask() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
    this.formElement.resetForm();
  }

  private updateTaskById() {

  }


   /**
   * ON DESTROY
   */
    ngOnDestroy() {
      if (this.subDataOne) {
        this.subDataOne.unsubscribe();
      }
      if (this.subDataTwo) {
        this.subDataTwo.unsubscribe();
      }
      if (this.subDataThree) {
        this.subDataThree.unsubscribe();
      }
    }

}
