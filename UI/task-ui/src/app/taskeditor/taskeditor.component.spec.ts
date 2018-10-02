import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync
} from "@angular/core/testing";

import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { TaskServiceMockData } from "src/app/Service/taskservice.service.mock";
import { RoteConfiguration } from "src/app/route/app.route.module";
import { TaskblotterComponent } from "src/app/taskblotter/taskblotter.component";
import { TaskeditorComponent } from "src/app/taskeditor/taskeditor.component";
import { TaskdetailsComponent } from "src/app/taskdetails/taskdetails.component";
import { TaskqueryComponent } from "src/app/taskquery/taskquery.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { tick } from "@angular/core/testing";
import { ITaskService } from "src/app/Service/ITaskService";
import { TaskserviceServiceFake } from "src/app/Service/task.service.fake";
import { TaskrowComponent } from "src/app/taskrow/taskrow.component";
import { AppModule } from "src/app/app.module";
import { inject } from "@angular/core/testing";
import { expand } from "rxjs/internal/operators/expand";
import { fail } from "assert";
import {
  DatepickerModule,
  BsDatepickerModule,
  ModalModule
} from "ngx-bootstrap";
import { priorityMin, priorityMax } from "src/app/Const/taskConstants";

describe("TaskeditorComponent", () => {
  let component: TaskeditorComponent;
  let fixture: ComponentFixture<TaskeditorComponent>;
  //let routerMock:any;
  let location: Location;
  let routerSpy: Router;
  let service: ITaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ITaskService, useClass: TaskserviceServiceFake }],
      //,{provide:Router,useValue:routerMock}
      //]
      imports: [
        AppModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(RoteConfiguration),
        DatepickerModule,
        BsDatepickerModule,
        ModalModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    //routerMock={navigate: jasmine.createSpy('navigate')};
    //router.initialNavigation();
    //routerSpy = TestBed.get(Router);

    location = TestBed.get(Location);

    service = TestBed.get(ITaskService);
    fixture = TestBed.createComponent(TaskeditorComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    //fixture.detectChanges();
  });

  it("When Task Editor Component Created Injector Injects all required Inputs", () => {
    expect(component).toBeTruthy();
  });

  it("When No Values filled form should be invalid", () => {
    expect(component).toBeTruthy();
    expect(component.myform.valid).toBe(false);
  });

  it("When Task Value given then Task mandatory validator should pass", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.taskName.valid).toBe(true);
    expect(component.myform.valid).toBe(false);
  });

  it("When Priority less than min should fail for priorty", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.model.Priority = priorityMin - 10;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.priority.valid).toBe(false);
    expect(component.myform.valid).toBe(false);
  });

  it("When Priority greater than max should fail for priorty", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.model.Priority = priorityMax + 10;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.priority.valid).toBe(false);
    expect(component.myform.valid).toBe(false);
  });

  it("When Priority between min and max then should not fail for priorty", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.model.Priority =
      Math.floor(Math.random() * (priorityMax + 1)) + 1;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.priority.valid).toBe(true);
    expect(component.myform.valid).toBe(false);
  });

  it("When parent task not selected should fail for parent task", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.model.Priority =
      Math.floor(Math.random() * (priorityMax + 1)) + 1;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.parentTask.valid).toBe(false);
    expect(component.myform.valid).toBe(false);
  });

  it("When parent task not selected should fail for parent task", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.model.Priority =
      Math.floor(Math.random() * (priorityMax + 1)) + 1;
    //component.model.ParentTaskId=TaskServiceMockData.Task1.ParentTaskId;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.parentTask.valid).toBe(false);
    expect(component.myform.valid).toBe(false);
  });

  it("When parent task selected should pass for parent task", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.model.Priority =
      Math.floor(Math.random() * (priorityMax + 1)) + 1;
    component.model.ParentTaskId = TaskServiceMockData.Task1.ParentTaskId;
    //component.model.ParentTask=TaskServiceMockData.Task1.ParentTask;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.parentTask.valid).toBe(true);
    expect(component.myform.valid).toBe(false);
  });

  it("When start date not given should faild for start date", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.model.Priority =
      Math.floor(Math.random() * (priorityMax + 1)) + 1;
    component.model.ParentTaskId = TaskServiceMockData.Task1.ParentTaskId;
    //component.model.StartDate=new Date(2018,5,15);
    //component.model.ParentTask=TaskServiceMockData.Task1.ParentTask;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.startDate.valid).toBe(false);
    expect(component.myform.valid).toBe(false);
  });

  it("When start date not given should faild for start date", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.model.Priority =
      Math.floor(Math.random() * (priorityMax + 1)) + 1;
    component.model.ParentTaskId = TaskServiceMockData.Task1.ParentTaskId;
    component.model.StartDate = new Date(2018, 5, 15);
    //component.model.ParentTask=TaskServiceMockData.Task1.ParentTask;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.startDate.valid).toBe(true);
    expect(component.myform.valid).toBe(false);
  });

  it("When end date not given should faild for end date", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.model.Priority =
      Math.floor(Math.random() * (priorityMax + 1)) + 1;
    component.model.ParentTaskId = TaskServiceMockData.Task1.ParentTaskId;
    //component.model.StartDate=new Date(2018,5,15);
    //component.model.ParentTask=TaskServiceMockData.Task1.ParentTask;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.endDate.valid).toBe(false);
    expect(component.myform.valid).toBe(false);
  });

  it("When end date not given should faild for start date", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.model.Priority =
      Math.floor(Math.random() * (priorityMax + 1)) + 1;
    component.model.ParentTaskId = TaskServiceMockData.Task1.ParentTaskId;
    component.model.EndDate = new Date(2018, 6, 15);
    //component.model.ParentTask=TaskServiceMockData.Task1.ParentTask;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.endDate.valid).toBe(true);
    expect(component.myform.valid).toBe(false);
  });

  it("When start date is greater than end date then date validation should faild", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.model.Priority =
      Math.floor(Math.random() * (priorityMax + 1)) + 1;

      console.log(component.model.Priority );
      
    component.model.ParentTaskId = TaskServiceMockData.Task1.ParentTaskId;
    component.model.EndDate = new Date(2018, 6, 15);
    component.model.StartDate = new Date(2018, 7, 15);
    //component.model.ParentTask=TaskServiceMockData.Task1.ParentTask;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.endDate.valid).toBe(true);
    expect(component.startDate.valid).toBe(true);
    expect(component.dateFormGroup.valid).toBe(false);
    expect(component.myform.valid).toBe(false);
  });

  it("When start date is less than end date then date validation should pass", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.model.Priority =
      Math.floor(Math.random() * (priorityMax + 1)) + 1;
console.log(component.model.Priority );

    component.model.ParentTaskId = TaskServiceMockData.Task1.ParentTaskId;
    component.model.StartDate = new Date(2018, 5, 15);
    component.model.EndDate = new Date(2018, 6, 15);

    //component.model.ParentTask=TaskServiceMockData.Task1.ParentTask;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.endDate.valid).toBe(true);
    expect(component.startDate.valid).toBe(true);
    expect(component.dateFormGroup.valid).toBe(true);
    //expect(component.myform.valid).toBe(false);
  });

  it("When allf fields are filled then form validation shold pass", () => {
    expect(component).toBeTruthy();
    component.model.TaskDescription = TaskServiceMockData.Task1.TaskDescription;
    component.model.Priority =
      Math.floor(Math.random() * (priorityMax + 1)) + 1;

      console.log(component.model.Priority );

    component.model.ParentTaskId = TaskServiceMockData.Task1.ParentTaskId;
    component.model.StartDate = new Date(2018, 5, 15);
    component.model.EndDate = new Date(2018, 6, 15);

    //component.model.ParentTask=TaskServiceMockData.Task1.ParentTask;
    component.UpdateValuesFromModelToFormsControls();
    expect(component.endDate.valid).toBe(true);
    expect(component.startDate.valid).toBe(true);
    expect(component.dateFormGroup.valid).toBe(true);
    expect(component.myform.valid).toBe(true);
  });
});
