using System;
using System.Collections.Generic;
using Task.BusinessLayer;
using Task.DataLayer;
using Task.Entities;

namespace Task.Api.Tests
{
    public class TaskServiceFake : ITaskService
    {
        private ITaskDbContext dbContext;
        public TaskServiceFake(ITaskDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        
        public TaskModel AddTask(TaskModel task)
        {
            throw new NotImplementedException();
        }

        public TaskModel CloseTask(TaskModel task)
        {
            throw new NotImplementedException();
        }

        public bool DeleteTaks(TaskModel id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public ICollection<ParentTaskModel> GetAllParentTasks()
        {
            throw new NotImplementedException();
        }

        public ICollection<TaskModel> GetAllTasks()
        {
            throw new NotImplementedException();
        }

        public TaskModel GetTaskById(int id)
        {
            throw new NotImplementedException();
        }

        public ICollection<TaskModel> QueryTask(string name, DateTime? startDate, DateTime? endDate, int? priority, string parentTask)
        {
            throw new NotImplementedException();
        }

        public ICollection<TaskModel> QueryTask(TaskQueryModel query)
        {
            throw new NotImplementedException();
        }

        public TaskModel UpdateTaks(TaskModel id)
        {
            throw new NotImplementedException();
        }
    }
}
