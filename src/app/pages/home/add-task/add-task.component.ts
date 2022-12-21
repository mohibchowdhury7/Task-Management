import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
name?: string;
task?: Task;
tasks?: Task[] = [];

subTasksArray?: FormArray;

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
    this.name = param.get('name');
    console.log('name', this.name);


    if (this.name) {
      this.getTaskByName();
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
      title: [null, Validators.required, , Validators.maxLength(100)],
      description: [null, Validators.required, , Validators.maxLength(150)],
      priority: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      status: [null, Validators.required],
      person: [null, Validators.required],
      subTasks: this.fb.array([]),
    });

    this.subTasksArray = this.dataForm.get('subTasks') as FormArray;
  }

  private setFormValue() {
    this.dataForm.patchValue({...this.task});
  }

  onSubmit() {

    console.log('dataform', this.dataForm.value);

      this.tasks.push(this.dataForm.value)
      console.log('tasks', this.tasks);

      this.addTask();


  }



  /**
   * HTTP REQ HANDLE
   * getTaskById
   * addTask
   * updateTaskById
   */
  private getTaskByName() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  private addTask() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
    // this.formElement.resetForm();
  }


  /**
   * removeFormArrayField()
   * onAddNewSubTasks()
   */

  removeFormArrayField(formControl: string, index: number) {
    let formDataArray: FormArray;
    switch (formControl) {
      case 'subTasks': {
        formDataArray = this.subTasksArray;
        break;
      }
      default: {
        formDataArray = null;
        break;
      }
    }
    formDataArray?.removeAt(index);
  }

  onAddNewSubTasks() {
    const f = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required]
    });
    (this.dataForm?.get('subTasks') as FormArray).push(f);
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
