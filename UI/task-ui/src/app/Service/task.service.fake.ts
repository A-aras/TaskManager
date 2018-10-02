import { Injectable } from '@angular/core';
import { TaskModel } from 'src/app/model/taskModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ParentTaskModel } from 'src/app/model/parentTaskModel';
import { of } from 'rxjs';
import { TaskQueryModel } from 'src/app/model/taskQueryModel';
import { HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from 'url';
import { HttpParams } from '@angular/common/http';
import {environment} from 'src/environments/environment';
// import {Location} from '@angular/common';
import {ITaskService} from 'src/app/Service/ITaskService';
import { TaskServiceMockData } from 'src/app/Service/taskservice.service.mock';
import { TaskserviceService } from 'src/app/Service/taskservice.service';
// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class TaskserviceServiceFake extends ITaskService {

  CloseTask(task: TaskModel): Observable<any> {
    return of(true);
    //throw new Error("Method not implemented.");
  }

  DeleteTaks(task: TaskModel): Observable<any> {
    //throw new Error("Method not implemented.");
    return of(true);
  }

  constructor() { 
      super();
    
  }

  // getAllTask(): Observable<any> {
  //   return this.httpService.get("http://localhost:52537/api/task");
  // }

  getAllTask(): Observable<TaskModel[]> {

    return of(TaskServiceMockData.Tasks);
    
  }

  getTaskById(id:number): Observable<TaskModel> {

    return of(TaskServiceMockData.Tasks.find(x=>x.TaskId===id));
  }

  queryTasks(query: TaskQueryModel): Observable<TaskModel[]> {
    return of(TaskServiceMockData.Tasks.filter(x=>{

        return x.TaskDescription.startsWith(query.TaskName);}));

  }

  getAllParentTask(): Observable<ParentTaskModel[]> {

    return of(TaskServiceMockData.ParentTasks);


  }

  AddTaks(task: TaskModel) {

    return of(TaskServiceMockData.Task1);
  }

  UpdateTaks(task: TaskModel) {

    return of(TaskServiceMockData.Task1);
  }
  
}
