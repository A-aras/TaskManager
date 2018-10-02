import { Component, OnInit, ViewChild } from "@angular/core";
import * as TaskConstants from "../Const/taskConstants";
import { ParentTaskModel } from "src/app/model/parentTaskModel";
import { TaskserviceService } from "src/app/Service/taskservice.service";
import {
  FormArray,
  Form,
  FormGroup,
  ReactiveFormsModule
} from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { TaskModel } from "src/app/model/taskModel";
import { Input } from "@angular/core";
import * as Validator from "src/app/validators/";
import { Router, Route, ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { of, Subject } from "rxjs";
import { ITaskService } from "src/app/Service/ITaskService";
import { TaskFromValidator } from "src/app/validators/TaskFromValidator";
import { DatePipe } from "@angular/common";
import { setTheme } from "ngx-bootstrap/utils";
import { TemplateRef } from "@angular/core";
import { BsModalService, ModalDirective } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { filter } from "rxjs/internal/operators/filter";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
//import { ViewChild } from '@angular/core/src/metadata/di';

@Component({
  selector: "app-taskeditor",
  templateUrl: "./taskeditor.component.html",
  styleUrls: ["./taskeditor.component.css"]
})
export class TaskeditorComponent implements OnInit {
  myform: FormGroup;
  taskName: FormControl;
  priority: FormControl;
  parentTask: FormControl;
  dateFormGroup: FormGroup;
  startDate: FormControl;
  endDate: FormControl;

  @ViewChild("alertModal")
  alertModal: ModalDirective;

  model: TaskModel = {
    TaskId: 0,
    TaskDescription: "",
    ParentTaskId: null,
    ParentTask: null,
    Priority: 1,
    StartDate: null,
    EndDate: null,
    IsClosed: false
  };

  DialogResult: Subject<boolean> = new Subject<boolean>();

  readonly priorityMin = TaskConstants.priorityMin;
  readonly priorityMax = TaskConstants.priorityMax;
  btnAction = "Add";
  //modalRef: BsModalRef;

  ParentTasks: ParentTaskModel[];
  constructor(
    private service: ITaskService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: BsModalService
  ) {
    setTheme("bs4");

    

    this.initFormsControl();
    
    
  }

  UpdateValuesFromModelToFormsControls() {
    this.taskName.setValue(this.model.TaskDescription);
    this.parentTask.setValue(this.model.ParentTaskId);
    this.priority.setValue(this.model.Priority);
    this.startDate.patchValue(this.model.StartDate);
    this.endDate.setValue(this.model.EndDate);
  }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  // }

  ngOnInit() {

    this.service.getAllParentTask().subscribe(x => {
      this.ParentTasks = x;
    });

    this.activeRoute.paramMap
      .pipe(debounceTime(500),
        switchMap((parms: ParamMap) => {
          console.log(parms);
          if (parms.has("id")) {
            let id = Number.parseInt(parms.get("id"));
            this.btnAction = "Save";
            return this.service.getTaskById(id);
          }
          this.btnAction = "Add";
          return of(this.model);
        })
      )
      .subscribe(x => {
        this.model = x;
        this.UpdateValuesFromModelToFormsControls();
      });

  

    this.DialogResult.pipe(filter(x => x)).subscribe(x => {
      this.model.TaskDescription = this.taskName.value;
      this.model.Priority = this.priority.value;
      this.model.ParentTask = this.ParentTasks.find(
        x => x.ParentTaskId === this.parentTask.value
      );
      this.model.ParentTaskId = this.parentTask.value;
      this.model.StartDate = this.startDate.value;
      this.model.EndDate = this.endDate.value;
      if (this.btnAction === "Add") {
        this.service.AddTaks(this.model).subscribe(x => {
          console.log("Task Saved...");
          this.router.navigate(["/ViewTask"]);
        });
      } else if (this.btnAction === "Save") {
        this.service.UpdateTaks(this.model).subscribe(x => {
          console.log("Task Saved...");
          this.router.navigate(["/ViewTask"]);
        });
      }
    });
  }

  private initFormsControl() {
    this.taskName = new FormControl(
      this.model.TaskDescription,
      Validators.required
    );
    this.priority = new FormControl(this.model.Priority, [
      Validators.required,
      Validators.min(TaskConstants.priorityMin),
      Validators.max(TaskConstants.priorityMax)
    ]);
    this.parentTask = new FormControl(this.model.ParentTask, [
      Validator.DefaultValueValidator(null)
    ]);

    this.startDate = new FormControl(this.model.StartDate, [
      Validators.required,
      Validator.IsValidDate
    ]);
    this.endDate = new FormControl(this.model.EndDate, [
      Validators.required,
      Validator.IsValidDate
    ]);

    let dateValidator = Validator.DateMustbeGreaterThanValidation(
      "startDate",
      "endDate"
    );
    //this.dateFormGroup=new FormGroup({startDate:this.startDate,endDate:this.endDate},Validators.compose([DateMustbeGreaterThanValidation("startDate","endDate")]));
    this.dateFormGroup = new FormGroup({
      startDate: this.startDate,
      endDate: this.endDate
    });
    this.dateFormGroup.setValidators(dateValidator);

    this.myform = new FormGroup({
      taskName: this.taskName,
      priority: this.priority,
      parentTask: this.parentTask,
      dateGroup: this.dateFormGroup
    });
  }

  OnAddTask() {
    TaskFromValidator.Validate(this.myform);

    if (this.myform.valid) {
      this.ShowAlterModel();
      return;
    }
    alert("Please enter valid inputs to proceed further");
  }

  ShowAlterModel() {
    this.alertModal.show();
  }

  confirm(): void {
    this.alertModal.hide();
    this.DialogResult.next(true);
  }

  decline(): void {
    this.alertModal.hide();
    this.DialogResult.next(false);
  }
}
