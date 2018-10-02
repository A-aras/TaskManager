import { TaskModel } from 'src/app/model/taskModel';
import { Observable } from 'rxjs/internal/Observable';
import { ParentTaskModel } from 'src/app/model/parentTaskModel';
import { TaskQueryModel } from 'src/app/model/taskQueryModel';

export abstract class ITaskService {
    abstract getAllTask(): Observable<TaskModel[]>;
    abstract getTaskById(id: number): Observable<TaskModel>;
    abstract queryTasks(query: TaskQueryModel): Observable<TaskModel[]>;
    abstract getAllParentTask(): Observable<ParentTaskModel[]>;
    abstract AddTaks(task: TaskModel);
    abstract UpdateTaks(task: TaskModel):Observable<any>;
    abstract DeleteTaks(task: TaskModel):Observable<any>;
    abstract CloseTask(task: TaskModel):Observable<any>;
}