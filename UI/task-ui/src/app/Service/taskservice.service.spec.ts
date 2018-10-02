import { TestBed, getTestBed, inject } from '@angular/core/testing';

import { TaskserviceService } from './taskservice.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskServiceMockData } from 'src/app/Service/taskservice.service.mock';
import { environment } from 'src/environments/environment';
import { TaskQueryModel } from 'src/app/model/taskQueryModel';

describe('TaskserviceService', () => {
  let injector = TestBed;
  let service: TaskserviceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskserviceService],
      imports: [HttpClientTestingModule]
    });
    injector = TestBed;
    service = TestBed.get(TaskserviceService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    //To check there is no outstanding outbound call after each test
    httpMock.verify();
  });

  // it('Injector should resolve TaskService Instance', 
  // inject([HttpTestingController,TaskserviceService],(httpMock:HttpTestingController, service:TaskserviceService) => {
  //   expect(service).toBeTruthy();
  //   this.httpMock.verify();
  // }));


  it('When Task Service Instance Required Then Injector Provides',
    () => {
      expect(service).toBeTruthy();
      httpMock.verify();
    });

  it('When Search All Tasks Then getAllTask() Should Return All Tasks', () => {
    service.getAllTask().subscribe(x => {
      expect(x.length).toBe(3);
      expect(x).toBe(TaskServiceMockData.Tasks);
    });
    var request = httpMock.expectOne(environment.ApiService + "/task/GetAllTask");
    expect(request.request.method).toBe('GET');
    request.flush(TaskServiceMockData.Tasks);

  });

  it('When Search Existing Task Then getTaskById() Should Return Task', () => {
    service.getTaskById(1).subscribe(x => {
      expect(x).not.toBe(null);
      expect(x).toBe(TaskServiceMockData.Task1);
    });
    var request = httpMock.expectOne(environment.ApiService + "/task/GetTaskById/1");
    expect(request.request.method).toBe('GET');
    request.flush(TaskServiceMockData.Task1);

  });

  it('When Search Non-Existing Task Then getTaskById() Should Return NULL', () => {
    service.getTaskById(4).subscribe(x => {
      expect(x).toBe(null);
    });
    var request = httpMock.expectOne(environment.ApiService + "/task/GetTaskById/4");
    expect(request.request.method).toBe('GET');
    request.flush(null);

  });

  it('When Search All Tasks Then getAllParentTask() Should Return All Parent Tasks', () => {
    service.getAllParentTask().subscribe(x => {
      expect(x.length).toBe(2);
      expect(x).toBe(TaskServiceMockData.ParentTasks);
    });
    var request = httpMock.expectOne(environment.ApiService + "/task/GetAllParentTask");
    expect(request.request.method).toBe('GET');
    request.flush(TaskServiceMockData.ParentTasks);

  });

  it('When Query Tasks Then queryTasks(TaskQueryModel) Should Return All Matching Tasks', () => {
    var queryTasks: TaskQueryModel = { TaskName: 'Task 1', EndDate: null, ParentTask: null, PriorityFrom: null, PriorityTo: null, StartDate: null };
    service.queryTasks(queryTasks).subscribe(x => {
      expect(x.length).toBe(1);
      expect(x[0]).toBe(TaskServiceMockData.Task1);
    });
    var request = httpMock.expectOne(req => req.method === 'GET' && req.url === (environment.ApiService + "/task/QueryTaks"));
        expect(request.request.params.getAll.length).toBe(1);
    expect(request.request.params.has('TaskName')).toBeTruthy();
    expect(request.request.params.get('TaskName')).toBe('Task 1');
    request.flush(TaskServiceMockData.Tasks.filter(x=>x.TaskDescription=='Task 1'));

  });

  it('When Add Task Then AddTaks(TaskQueryModel) Should Make Post Call', () => {
    service.AddTaks(TaskServiceMockData.Task1).subscribe(x => {
    });
    var request = httpMock.expectOne(req => req.method === 'POST' && req.url === (environment.ApiService + "/task"));
    expect(request.request.body).not.toBeNull();
    expect(request.request.body).toBe(TaskServiceMockData.Task1);
    request.flush(TaskServiceMockData.Task1);
  });


  it('When Update Task Then UpdateTaks(TaskQueryModel) Should Make {PUT} Call', () => {
    service.UpdateTaks(TaskServiceMockData.Task1).subscribe(x => {
    });
    var request = httpMock.expectOne(req => req.method === 'PUT' && req.url === (environment.ApiService + "/task/"+TaskServiceMockData.Task1.TaskId));
    expect(request.request.body).not.toBeNull();
    expect(request.request.body).toBe(TaskServiceMockData.Task1);
    request.flush(TaskServiceMockData.Task1);
  });



  // it('When Add Task Then UpdateTaks(TaskQueryModel) Should Make {PUT} Call', () => {
  //   service.AddTaks(TaskServiceMockData.Task1).subscribe(x => {
  //   });
  //   var request = httpMock.expectOne(req => req.method === 'PUT' && req.url === (environment.ApiService + "/task"));
  //   expect(request.request.body).not.toBeNull();
  //   expect(request.request.body).toBe(TaskServiceMockData.Task1);
  //   request.flush(TaskServiceMockData.Task1);
  // });

  // it('should get all tasks', inject([TaskserviceService], (service: TaskserviceService) => {
  //   expect(service).toBeTruthy();
  // }));


});
