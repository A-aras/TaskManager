import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location,APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskServiceMockData } from 'src/app/Service/taskservice.service.mock';
import { RoteConfiguration } from 'src/app/route/app.route.module';
import { TaskblotterComponent } from 'src/app/taskblotter/taskblotter.component';
import { TaskeditorComponent } from 'src/app/taskeditor/taskeditor.component';
import { TaskdetailsComponent } from 'src/app/taskdetails/taskdetails.component';
import { TaskqueryComponent } from 'src/app/taskquery/taskquery.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { tick } from '@angular/core/testing';
import { ITaskService } from 'src/app/Service/ITaskService';
import { TaskserviceServiceFake } from 'src/app/Service/task.service.fake';
import { TaskrowComponent } from 'src/app/taskrow/taskrow.component';
import  { DatepickerModule,BsDatepickerModule,ModalModule} from 'ngx-bootstrap'
import { AppModule } from 'src/app/app.module';

describe('TaskblotterComponent', () => {
  let component: TaskblotterComponent;
  let fixture: ComponentFixture<TaskblotterComponent>;
  let location: Location;
  let routerSpy: Router;
  let service: ITaskService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [TaskeditorComponent, TaskblotterComponent, TaskqueryComponent, TaskrowComponent],
      imports: [AppModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule.withRoutes(RoteConfiguration),
        DatepickerModule,BsDatepickerModule,ModalModule],
      providers: [{ provide: ITaskService, useClass: TaskserviceServiceFake },{provide:APP_BASE_HREF, useValue:'/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    routerSpy = TestBed.get(Router);
    location = TestBed.get(Location);
    service = TestBed.get(ITaskService);
    fixture = TestBed.createComponent(TaskblotterComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
