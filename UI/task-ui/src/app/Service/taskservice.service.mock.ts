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
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { ITaskService } from 'src/app/Service/ITaskService';

export class TaskServiceMockData {

    public static ParentTask1: ParentTaskModel = { ParentTaskId: 1, Parent_Task: "Parent Task1", Tasks: null };

    public static ParentTask2: ParentTaskModel = { ParentTaskId: 2, Parent_Task: "Parent Task2", Tasks: null };

    public static Task1: TaskModel = {
        TaskId: 1, TaskDescription: "Task 1", ParentTaskId: 1, ParentTask: TaskServiceMockData.ParentTask1
        , Priority: 1, StartDate: new Date(2018, 5, 5), EndDate: new Date(2018, 5, 5), IsClosed: false
    };

    public static Task2: TaskModel = {
        TaskId: 2, TaskDescription: "Task 2", ParentTaskId: 2, ParentTask: TaskServiceMockData.ParentTask2
        , Priority: 10, StartDate: new Date(2018, 5, 5), EndDate: new Date(2018, 5, 5), IsClosed: false
    };

    public static Task3: TaskModel = {
        TaskId: 3, TaskDescription: "Task 3", ParentTaskId: 0, ParentTask: null
        , Priority: 10, StartDate: new Date(2018, 5, 5), EndDate: new Date(2018, 5, 5), IsClosed: false
    };

    public static Tasks: TaskModel[] = [
        TaskServiceMockData.Task1, TaskServiceMockData.Task2, TaskServiceMockData.Task3
    ];


    public static ParentTasks: ParentTaskModel[] = [
        TaskServiceMockData.ParentTask1, TaskServiceMockData.ParentTask2
    ];
}
// @Injectable({
//   providedIn: 'root'
// })
// export class TaskserviceServiceFake implements ITaskService {

//   constructor(private httpService: HttpClient,private location:Location) { 

//   }

//   // getAllTask(): Observable<any> {
//   //   return this.httpService.get("http://localhost:52537/api/task");
//   // }

//   getAllTask(): Observable<TaskModel[]> {

//     //return this.httpService.get<TaskModel[]>( environment.ApiService + "task/GetAllTask");
//     //var url=this.location.prepareExternalUrl('${environment.ApiService}task/GetAllTask');
//     return this.httpService.get<TaskModel[]>( environment.ApiService+"/task/GetAllTask");

//   }

//   getTaskById(id:number): Observable<TaskModel> {

//     return this.httpService.get<TaskModel>(environment.ApiService + "/task/GetTaskById/"+id);

//   }

//   queryTasks(query: TaskQueryModel): Observable<TaskModel[]> {
//     let header = new HttpHeaders();
//     let params=new HttpParams();
//     params=params.append("TaskName",query.TaskName);

//     //let body=new HttpBody();

//     let requestOptions={headers:header,params:params};
//     //let url=environment.ApiService+"/task/QueryTaks";
//     return this.httpService.get<TaskModel[]>(environment.ApiService+"/task/QueryTaks",requestOptions);

//   }

//   getAllParentTask(): Observable<ParentTaskModel[]> {

//     //return of(this.parentTask);
//     // return this.parentTask..    this.parentTask.aso
//     return this.httpService.get<ParentTaskModel[]>(environment.ApiService + "/task/GetAllParentTask");

//   }

//   AddTaks(task: TaskModel) {

//     return this.httpService.post(environment.ApiService+"/task", task);
//   }

//   UpdateTaks(task: TaskModel) {

//     return this.httpService.put(environment.ApiService+"/task", task);
//   }

//   private task: TaskModel[] = [
//     { TaskId: 1, TaskDescription: "Task 1", ParentTaskId: 1, ParentTask: { ParentTaskId: 1, Parent_Task: "Parent Task1", Tasks: null }, Priority: 1, StartDate: new Date(2018, 5, 5), EndDate: new Date(2018, 5, 5),IsClosed:false }
//   ];

//   private parentTask: ParentTaskModel[] = [
//     { ParentTaskId: 1, Parent_Task: "Parent Task1", Tasks: null }, { ParentTaskId: 2, Parent_Task: "Parent Task2", Tasks: null },
//   ];
// }
