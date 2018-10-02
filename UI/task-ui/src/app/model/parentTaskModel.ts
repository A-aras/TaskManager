
import {TaskModel} from "./taskModel"
export interface ParentTaskModel{
    ParentTaskId:number;
    Parent_Task:string;
    Tasks:TaskModel[]|null;
}