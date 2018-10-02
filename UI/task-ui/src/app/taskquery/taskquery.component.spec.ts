import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskqueryComponent } from './taskquery.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {
  DatepickerModule,
  BsDatepickerModule,
  ModalModule
} from "ngx-bootstrap";
import { AppModule } from 'src/app/app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RoteConfiguration } from 'src/app/route/app.route.module';
import { TaskServiceMockData } from 'src/app/Service/taskservice.service.mock';
import { delay } from 'q';
import { filter } from 'rxjs/internal/operators/filter';
//import { HttpClientModule } from '@angular/common/http';
//import { RouterTestingModule } from '@angular/router/testing';

describe('TaskqueryComponent', () => {
  let component: TaskqueryComponent;
  let fixture: ComponentFixture<TaskqueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      //declarations: [ TaskqueryComponent ],
      imports:[AppModule, ReactiveFormsModule,FormsModule,
        RouterTestingModule.withRoutes(RoteConfiguration),
        DatepickerModule,
        BsDatepickerModule,
        ModalModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskqueryComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    component.ngOnInit();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when some value changed in task name then search should should trigger', () => {
    expect(component).toBeTruthy();
    component.SearchObservable.subscribe(x=>{
      expect(x[0].TaskName).toBe(TaskServiceMockData.Task1.TaskDescription);
      expect(x[1]).toBe(true);
    });
    component.taskName.setValue(TaskServiceMockData.Task1.TaskDescription);
  });

  it('when parent task selected then search should should trigger', () => {
    expect(component).toBeTruthy();
    component.SearchObservable.subscribe(x=>{
      let parentTask=Number.parseInt(x[0].ParentTask);
      expect(parentTask).toBe(TaskServiceMockData.Task1.ParentTaskId);
      expect(x[1]).toBe(true);
    });
    component.parentTask.setValue(TaskServiceMockData.Task1.ParentTaskId);
  });

  it('when priority from alone set then search should trigger', () => {
    expect(component).toBeTruthy();
    component.SearchObservable.subscribe(x=>{
      expect(x[0].PriorityFrom).toBe(5);
      expect(x[0].PriorityTo).toBe(null);
      expect(x[1]).toBe(true);
    });
    component.priorityFrom.setValue(5);
  });

  it('when priority to alone set then search should trigger', () => {
    expect(component).toBeTruthy();
    component.SearchObservable.subscribe(x=>{
      expect(x[0].PriorityFrom).toBe(null);
      expect(x[0].PriorityTo).toBe(30);
      expect(x[1]).toBe(true);
    });
    component.priorityTo.setValue(30);
  });

  it('when priority from less than priority to then search should trigger', () => {
    let changeDetectoinTrigger=false;
    expect(component).toBeTruthy();
    component.SearchObservable.pipe(filter(x=>{ return changeDetectoinTrigger===true;})).subscribe(x=>{
      //fixture.detectChanges();
      expect(x[0].PriorityFrom).toBe(1);
      expect(x[0].PriorityTo).toBe(30);
      expect(x[1]).toBe(true);
    });
    component.priorityFrom.setValue(1);
    component.priorityTo.setValue(30);
    fixture.detectChanges();
    changeDetectoinTrigger=true;
  });

  it('when priority from greater than priority to then search should not trigger', () => {
    let changeDetectoinTrigger=false;
    expect(component).toBeTruthy();
    component.SearchObservable.pipe(filter(x=>{ return changeDetectoinTrigger===true;})).subscribe(x=>{
      
      expect(x[0].PriorityFrom).toBe(30);
      expect(x[0].PriorityTo).toBe(1);
      expect(x[1]).toBe(false);
    });
    component.priorityFrom.setValue(30);
    component.priorityTo.setValue(1);
    fixture.detectChanges();
    changeDetectoinTrigger=true;
  });

});
