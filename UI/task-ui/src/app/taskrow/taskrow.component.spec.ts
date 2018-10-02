import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { TaskrowComponent } from './taskrow.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskServiceMockData } from 'src/app/Service/taskservice.service.mock';
import { RoteConfiguration } from 'src/app/route/app.route.module';
import { TaskblotterComponent } from 'src/app/taskblotter/taskblotter.component';
import { TaskeditorComponent } from 'src/app/taskeditor/taskeditor.component';
import { TaskdetailsComponent } from 'src/app/taskdetails/taskdetails.component';
import { TaskqueryComponent } from 'src/app/taskquery/taskquery.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { tick } from '@angular/core/testing';
import { TaskserviceService } from 'src/app/Service/taskservice.service';
import { TaskserviceServiceFake } from 'src/app/Service/task.service.fake';
import  { DatepickerModule,BsDatepickerModule,ModalModule} from 'ngx-bootstrap'

describe('TaskrowComponent', () => {
  let component: TaskrowComponent;
  let fixture: ComponentFixture<TaskrowComponent>;
  let routerMock:any;
  let location:Location;
  let routerSpy:Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskrowComponent,TaskblotterComponent,TaskeditorComponent,TaskqueryComponent ],
      imports:[FormsModule,ReactiveFormsModule,HttpClientModule,RouterTestingModule.withRoutes(RoteConfiguration),
        DatepickerModule,BsDatepickerModule,ModalModule],
      providers:[{provide:TaskserviceService, useclass:TaskserviceServiceFake}
        ,{provide:Router,useValue:routerMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    routerMock={navigate: jasmine.createSpy('navigate')};
    //router.initialNavigation();
    routerSpy=TestBed.get(Router);
    location=TestBed.get(Location);
    fixture = TestBed.createComponent(TaskrowComponent);
    component = fixture.componentInstance;
    component.RowData=TaskServiceMockData.Task1;
    fixture.detectChanges();
    
  });

  it('When TaksRow Component Created Injector Injects router instacnce', () => {
    expect(component).toBeTruthy();
    //expect(component.router).toBeTruthy();
  });

  it('When Clikc on Edit Task Then Navigate Edit Page', fakeAsync(() => {
    expect(component).toBeTruthy();
    expect(component.router).toBeTruthy();
     component.OnEdit();
     tick();
     //expect(routerSpy.navigate).toHaveBeenCalledWith(['/EditTask',1]);
     expect(routerSpy.navigate).toHaveBeenCalledWith(['/EditTask',1]);
  }));

  it('When Clikc on Delete Task Then Navigate To Delete Page', fakeAsync(() => {
    expect(component).toBeTruthy();
    expect(component.router).toBeTruthy();
     component.OnDelete();
     tick();
     //expect(routerSpy.navigate).toHaveBeenCalledWith(['/EditTask',1]);
     expect(routerSpy.navigate).toHaveBeenCalledWith(['/DeleteTask',1]);
  }));
  

});
