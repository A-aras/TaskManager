import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TaskModel } from 'src/app/model/taskModel';
import { Input } from '@angular/core';
import { TaskserviceService } from 'src/app/Service/taskservice.service';
import { TaskqueryComponent } from 'src/app/taskquery/taskquery.component';
import { ViewChild } from '@angular/core';
import { ITaskService } from 'src/app/Service/ITaskService';
import {Inject } from '@angular/core';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-taskblotter',
  templateUrl: './taskblotter.component.html',
  styleUrls: ['./taskblotter.component.css']
})
export class TaskblotterComponent implements OnInit, AfterViewInit {

  @Input()
  Tasks: TaskModel[];

  @ViewChild("taskQuery")
  private taskQuery: TaskqueryComponent;



  constructor( private service: ITaskService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Todo hide result panel when validation results was fail from the tuple input

    this.taskQuery.SearchObservable.pipe(filter(x=>x[1]===true), mergeMap(x=>{
      return this.service.queryTasks(x[0]);

    })).subscribe(x=>{
      this.Tasks=x;
    });;

    // this.taskQuery.SearchObservable.subscribe(x => {
    //    this.service.queryTasks(x[0]).subscribe(x=>{
    //      this.Tasks=x;},);
    // });
  }

  HandleUserAction(userActionOject:[TaskModel,boolean])
  {
    if(userActionOject[1]===true)
    {
      //It's delete operation 
      this.service.DeleteTaks(userActionOject[0]).pipe(mergeMap(x=>{
        return this.service.queryTasks(this.taskQuery.Model);

      })).subscribe(x=>{
        this.Tasks=x;
      });;

    }
    else{
      let model=userActionOject[0];
      model.IsClosed=true;
      this.service.CloseTask(userActionOject[0]).pipe(mergeMap(x=>{
        return this.service.queryTasks(this.taskQuery.Model);

      })).subscribe(x=>{
        this.Tasks=x;
      });;
    }
  }

}
