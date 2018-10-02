using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task.Entities;

namespace Task.BusinessLayer
{
    public interface ITaskService:IDisposable
    {
        
        TaskModel GetTaskById(int id);
        TaskModel UpdateTaks(TaskModel id);

        TaskModel AddTask(TaskModel task);

        bool DeleteTaks(TaskModel id);

        ICollection<TaskModel> GetAllTasks();

        //ICollection<TaskModel> QueryTask(string name,DateTime? startDate,DateTime? endDate,int? priority, string parentTask);

        ICollection<TaskModel> QueryTask(TaskQueryModel query);

        ICollection<ParentTaskModel> GetAllParentTasks();

        TaskModel CloseTask(TaskModel task);
    }
}
