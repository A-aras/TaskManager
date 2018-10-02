

export interface TaskQueryModel {

     TaskName:string;
     PriorityFrom?:number;
     PriorityTo?:number;
     StartDate?:Date;
     EndDate?:Date;
     ParentTask:string;
}