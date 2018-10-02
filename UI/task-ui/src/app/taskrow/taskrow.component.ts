import { Component, OnInit,EventEmitter } from "@angular/core";
import { TaskModel } from "src/app/model/taskModel";
import { ParentTaskModel } from "src/app/model/parentTaskModel";
import { Input,Output } from "@angular/core";
//import { TaskserviceService } from 'src/app/taskservice.service';
import { ActivatedRoute, Router } from "@angular/router";
import { RouterPreloader } from "@angular/router/src/router_preloader";
import { ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { Subject } from "rxjs";
import { filter, map } from "rxjs/operators";



@Component({
  selector: "[app-taskrow]",
  templateUrl: "./taskrow.component.html",
  styleUrls: ["./taskrow.component.css"]
})
export class TaskrowComponent implements OnInit {
  @Input()
  RowData: TaskModel;

  @ViewChild("deleteTaskModal")
  deleteTaskModal: ModalDirective;


  @ViewChild("endTaskModal")
  endTaskModal: ModalDirective;

  deleteDialogResult: Subject<boolean> = new Subject<boolean>();

  endDialogResult: Subject<boolean> = new Subject<boolean>();

  // @Output()
  // userActionSubject: Subject<[TaskModel, boolean]> = new Subject<
  //   [TaskModel, boolean]
  // >();

  @Output()
  messageEvent=new EventEmitter<[TaskModel, boolean]> ();

  constructor(public router: Router) {}

  ngOnInit() {
    this.deleteDialogResult
      .pipe(filter(x => x))
      .pipe(
        map(x => {
          return x;
        })
      )
      .subscribe(x => {
        
        this.messageEvent.emit([this.RowData, true]);
      });

      this.endDialogResult
      .pipe(filter(x => x))
      .pipe(
        map(x => {
          return x;
        })
      )
      .subscribe(x => {
        this.messageEvent.emit([this.RowData, false]);
      });
  }

  OnEdit() {
    this.router.navigate(["/EditTask", this.RowData.TaskId]);
  }

  OnDelete() {
    this.deleteTaskModal.show();
  }

  OnEndTask() {
    //this.router.navigate(["/EditTask", this.RowData.TaskId]);
    this.endTaskModal.show();
  }

  confirmDelete(): void {
    this.deleteTaskModal.hide();
    this.deleteDialogResult.next(true);
  }

  declineDelete(): void {
    this.deleteTaskModal.hide();
    this.deleteDialogResult.next(false);
  }

  confirmEndTask(): void {
    this.endTaskModal.hide();
    this.endDialogResult.next(true);
  }

  declineEndTask(): void {
    this.endTaskModal.hide();
    this.endDialogResult.next(false);
  }
}
