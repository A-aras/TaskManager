
import { ParentTaskModel } from "./parentTaskModel"
export interface TaskModel {
    TaskId: number;
    TaskDescription     : string;
    ParentTaskId?: number ;
    ParentTask?: ParentTaskModel ;
    Priority: Number;
    StartDate     : Date|null;
    EndDate     : Date|null;
    IsClosed    : boolean;
}