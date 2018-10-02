using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task.DataLayer;
using Task.Entities;

namespace Task.BusinessLayer
{
    public class TaskService : ITaskService
    {
        private ITaskDbContext dbContext;
        public TaskService(ITaskDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public bool DeleteTaks(TaskModel id)
        {
            dbContext.Tasks.Remove(id);
            return dbContext.SaveChanges() == 1;
        }


        public TaskModel CloseTask(TaskModel task)
        {
            var tasks = GetTaskById(task.TaskId);
            if (tasks != null)
            {
                tasks.IsClosed = true;
                return SaveTask(tasks,true);
            }
            throw new Exception("Task not found");
        }

        public ICollection<ParentTaskModel> GetAllParentTasks()
        {
            return dbContext.ParentTasks.ToList();
        }

        public ICollection<TaskModel> GetAllTasks()
        {
            return dbContext.Tasks.Include(x => x.ParentTask).ToList();
        }

        public TaskModel GetTaskById(int id)
        {
            return dbContext.Tasks.Include(x => x.ParentTask).FirstOrDefault(x => x.TaskId == id);
        }

        //public ICollection<TaskModel> QueryTask(string name, DateTime? startDate, DateTime? endDate, int? priority, string parentTask)
        //{

        //    return dbContext.Tasks.Where(x => (string.IsNullOrEmpty(name) || name == x.TaskDescription)
        //    && (startDate == null || x.StartDate >= startDate)
        //    && (endDate == null || x.EndDate >= endDate)
        //    && (priority == null || x.Priority == priority)
        //    //&& (string.IsNullOrEmpty(parentTask) || parentTask == x.ParentTask.Parent_Task)
        //    ).ToList();
        //}


        public ICollection<TaskModel> QueryTask(TaskQueryModel query)
        {

            return FilterTasks(dbContext.Tasks.Include(x => x.ParentTask), query).ToList();
        }


        private IQueryable<TaskModel> FilterTasks(IQueryable<TaskModel> tasks, TaskQueryModel query)
        {
            if (!string.IsNullOrEmpty(query.TaskName))
            {
                tasks = tasks.Where(x => x.TaskDescription.StartsWith(query.TaskName));
            }

            if (!string.IsNullOrEmpty(query.ParentTask))
            {
                tasks = tasks.Where(x => x.ParentTask.Parent_Task == query.ParentTask);
            }

            if (query.PriorityFrom.HasValue)
            {
                tasks = tasks.Where(x => x.Priority >= query.PriorityFrom.Value);
            }

            if (query.PriorityTo.HasValue)
            {
                tasks = tasks.Where(x => x.Priority <= query.PriorityTo.Value);
            }

            if (query.StartDate.HasValue)
            {
                tasks = tasks.Where(x => x.StartDate >= query.StartDate);
            }

            if (query.EndDate.HasValue)
            {
                tasks = tasks.Where(x => x.EndDate >= query.EndDate);
            }
            return tasks;
        }

        private bool Matches(TaskQueryModel query, TaskModel task)
        {
            var result = true;
            if (!string.IsNullOrEmpty(query.TaskName))
            {
                result = task.TaskDescription.StartsWith(query.TaskName);
            }
            if (!result && !string.IsNullOrEmpty(query.ParentTask))
            {
                result = task.ParentTask.Parent_Task == query.ParentTask;
            }
            if (!result && query.PriorityFrom.HasValue)
            {
                result = task.Priority >= query.PriorityFrom;
            }
            if (!result && query.PriorityTo.HasValue)
            {
                result = task.Priority <= query.PriorityTo;
            }
            if (!result && query.StartDate.HasValue)
            {
                result = task.StartDate >= query.StartDate;
            }
            if (!result && query.EndDate.HasValue)
            {
                result = task.EndDate <= query.EndDate;
            }
            return result;
        }

        private TaskModel SaveTask(TaskModel id, bool ignoreClosedCheck = false)
        {
            if (id.IsClosed && !ignoreClosedCheck)
            {
                throw new Exception("You cannot update an closed task");
            }
            dbContext.Tasks.Attach(id);
            dbContext.SetModifield(id);
            //dbContext.Entry(id).State = System.Data.Entity.EntityState.Modified;
            if (dbContext.SaveChanges() >= 0)
            {
                return dbContext.Tasks.Find(id.TaskId);
            }
            else { return null; }
        }

        public void Dispose()
        {
            dbContext.Dispose();
        }

        public TaskModel AddTask(TaskModel task)
        {
            dbContext.Tasks.Add(task);
            if (dbContext.SaveChanges() >= 0)
            {
                return task;
            }
            else { return null; }
        }

        public TaskModel UpdateTaks(TaskModel id)
        {
            return SaveTask(id);
        }
    }
}
