import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskdashboardComponent } from './taskdashboard.component';

import { TaskblotterComponent } from './../taskblotter/taskblotter.component';
import { TaskqueryComponent } from './../taskquery/taskquery.component';
import { TaskrowComponent } from './../taskrow/taskrow.component';
import { TaskeditorComponent } from './../taskeditor/taskeditor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import  { DatepickerModule,BsDatepickerModule,ModalModule} from 'ngx-bootstrap'

describe('TaskdashboardComponent', () => {
  let component: TaskdashboardComponent;
  let fixture: ComponentFixture<TaskdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskdashboardComponent,TaskblotterComponent,TaskqueryComponent,TaskrowComponent,TaskeditorComponent ],
      imports:[RouterTestingModule,ReactiveFormsModule,FormsModule ,
        DatepickerModule,BsDatepickerModule,ModalModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
