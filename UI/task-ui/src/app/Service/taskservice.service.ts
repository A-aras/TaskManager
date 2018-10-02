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
// @Injectable({
//   providedIn: 'root'
// })

@Injectable()
export class TaskserviceService extends ITaskService {

  constructor(private httpService: HttpClient) { 
    super();
    
  }

  // getAllTask(): Observable<any> {
  //   return this.httpService.get("http://localhost:52537/api/task");
  // }

  getAllTask(): Observable<TaskModel[]> {

    //return this.httpService.get<TaskModel[]>( environment.ApiService + "task/GetAllTask");
    //var url=this.location.prepareExternalUrl('${environment.ApiService}task/GetAllTask');
    return this.httpService.get<TaskModel[]>( environment.ApiService+"/task/GetAllTask");

  }

  getTaskById(id:number): Observable<TaskModel> {

    return this.httpService.get<TaskModel>(environment.ApiService + "/task/GetTaskById/"+id);

  }

  queryTasks(query: TaskQueryModel): Observable<TaskModel[]> {
    let header = new HttpHeaders();
    let params=new HttpParams();

    header.append('Contetnt-Type','application/json');
    

    //let params=new URLSearchParams();

    // if(query.PriorityFrom===null || query.PriorityFrom===undefined)
    // {
    //   params=params.append("PriorityFrom",query.PriorityFrom.toString());  
    // }

    if(!(query.PriorityFrom == null || query.PriorityFrom == undefined))
    {
      params=params.set("PriorityFrom", query.PriorityFrom.toString());  
    }

    if(!(query.PriorityTo == null || query.PriorityTo == undefined))
    
    {
      params=params.set("PriorityTo",query.PriorityTo.toString());  
    }

    if(!(query.StartDate == null || query.StartDate == undefined))
    {
      params=params.set("StartDate",query.StartDate.toDateString());  
    }

    if(!(query.EndDate == null || query.EndDate == undefined))
    {
      params=params.set("EndDate",query.EndDate.toDateString());  
    }

    params=params.set("TaskName",query.TaskName);
    if(!(query.ParentTask == null || query.ParentTask == undefined))
    // {
    //   params=params.set("EndDate",query.EndDate.toDateString());  
    // }
    // else
    {
      params=params.set("ParentTask",query.ParentTask);
    }
    
    // params=params.append("PriorityFrom",query.PriorityFrom.toString());
    // params=params.append("PriorityTo",query.PriorityTo.toString());
    // params=params.append("StartDate",query.StartDate.toString());
    // params=params.append("EndDate",query.EndDate.toString());
    //let body=new HttpBody();

    let requestOptions={headers:header,params:params};
    //let url=environment.ApiService+"/task/QueryTaks";
    return this.httpService.get<TaskModel[]>(environment.ApiService+"/task/QueryTaks",requestOptions);

  }

  getAllParentTask(): Observable<ParentTaskModel[]> {

    //return of(this.parentTask);
    // return this.parentTask..    this.parentTask.aso
    return this.httpService.get<ParentTaskModel[]>(environment.ApiService + "/task/GetAllParentTask");

  }

  AddTaks(task: TaskModel) {

    return this.httpService.post(environment.ApiService+"/task", task);
  }

  UpdateTaks(task: TaskModel)  :Observable<any>{

    return this.httpService.put(environment.ApiService+"/task/"+task.TaskId, task);
  }

  DeleteTaks(task: TaskModel)  :Observable<any>{

    return this.httpService.delete(environment.ApiService+"/task/"+task.TaskId);
  }

  CloseTask(task: TaskModel)  :Observable<any>{

    return this.httpService.put(environment.ApiService+"/task/CloseTask/"+task.TaskId,task);
  }


  // private task: TaskModel[] = [
  //   { TaskId: 1, TaskDescription: "Task 1", ParentTaskId: 1, ParentTask: { ParentTaskId: 1, Parent_Task: "Parent Task1", Tasks: null }, Priority: 1, StartDate: new Date(2018, 5, 5), EndDate: new Date(2018, 5, 5),IsClosed:false }
  // ];

  // private parentTask: ParentTaskModel[] = [
  //   { ParentTaskId: 1, Parent_Task: "Parent Task1", Tasks: null }, { ParentTaskId: 2, Parent_Task: "Parent Task2", Tasks: null },
  // ];
}
