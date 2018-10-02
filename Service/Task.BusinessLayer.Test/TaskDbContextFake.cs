using NSubstitute;
using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using Task.DataLayer;
using Task.Entities;

namespace Task.Api.Tests
{
    public class TaskDbContextFake : DataLayer.ITaskDbContext
    {
        public bool ThrowErrorOnNextMethod { get; set; }
        private IDbSet<TaskModel> tasks;

        public IDbSet<TaskModel> Tasks
        {
            get { return tasks; }
            set { tasks = value; }
        }


        private IDbSet<ParentTaskModel> parentTasks;

        public IDbSet<ParentTaskModel> ParentTasks
        {
            get { return parentTasks; }
            set { parentTasks = value; }
        }

        public TaskDbContextFake()
        {
            IDbSet<TaskModel> task = NSubstitute.Substitute.For<IDbSet<TaskModel>, IQueryable<TaskModel>>();
            //tasks.Provider = TasksData.AllTaks.Provider;
            task.Provider.Returns(TaskServiceFakeData.TasksData.AllTaks.Provider);
            task.Expression.Returns(TaskServiceFakeData.TasksData.AllTaks.Expression);
            task.ElementType.Returns(TaskServiceFakeData.TasksData.AllTaks.ElementType);
            task.GetEnumerator().Returns(TaskServiceFakeData.TasksData.AllTaks.GetEnumerator());
            this.Tasks = task;


            IDbSet<ParentTaskModel> parentTask = NSubstitute.Substitute.For<IDbSet<ParentTaskModel>>();
            parentTask.Provider.Returns(TaskServiceFakeData.ParentTasksData.AllParentTaks.Provider);
            parentTask.Expression.Returns(TaskServiceFakeData.ParentTasksData.AllParentTaks.Expression);
            parentTask.ElementType.Returns(TaskServiceFakeData.ParentTasksData.AllParentTaks.ElementType);
            parentTask.GetEnumerator().Returns(TaskServiceFakeData.ParentTasksData.AllParentTaks.GetEnumerator());
            this.ParentTasks = parentTask;

        }

        public int SaveChanges()
        {
            if (ThrowErrorOnNextMethod)
                throw new Exception("Error");
            return 1;
        }

        public DbEntityEntry Entry(object value)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
