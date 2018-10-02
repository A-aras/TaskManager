using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task.Entities;

namespace Task.DataLayer
{
    public class TaskDbContext : DbContext, ITaskDbContext
    {
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

        public TaskDbContext():base("name=taskDbSource")
        {
            //ParentTasks = this.Set<ParentTaskModel>();
            Tasks = this.Set<TaskModel>();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            var taskMap = modelBuilder.Entity<TaskModel>();
            taskMap.HasKey(x => x.TaskId);
            taskMap.Property(x => x.TaskId).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity).HasColumnName("Task_Id");
            taskMap.Property(x => x.TaskDescription).HasColumnName("Task");
            taskMap.Property(x => x.StartDate).HasColumnName("StartDate");
            taskMap.Property(x => x.EndDate).HasColumnName("EndDate");
            taskMap.Property(x => x.IsClosed).HasColumnName("IsClosed");
            taskMap.Property(x => x.Priority);
            taskMap.Property(x => x.ParentTaskId).HasColumnName("ParentTask_ParentTaskId");
            taskMap.HasOptional(x => x.ParentTask).WithMany(x=>x.Tasks).HasForeignKey(x=>x.ParentTaskId);//.WithOptionalPrincipal(x=>x.);


            taskMap.ToTable("Task");
            //taskMap.Map(config => {
            //    config.ToTable("Task");
            //    config.Property(x => x.TaskId).HasColumnName("Task_Id");
            //    config.Property(x => x.TaskDescription).HasColumnName("Task)
            //    config.Property(x => x.StartDate).HasColumnName("StartDate");
            //    config.Property(x => x.EndDate).HasColumnName("EndDate");
            //    config.Property(x => x.Priority);
            //});



            var parentTaskMap = modelBuilder.Entity<ParentTaskModel>();
            parentTaskMap.HasKey(x => x.ParentTaskId).Property(x => x.ParentTaskId).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity).HasColumnName("Parent_Id");
            parentTaskMap.ToTable("ParentTask");
            parentTaskMap.Property(x => x.Parent_Task).HasColumnName("Parent_Task");
            //parentTaskMap.HasOptional(x=>x.Tasks).WithMany
            //parentTaskMap.HasOptional(x => x.Tasks).WithOptionalPrincipal().Map(x=> {
            //    x.MapKey("Task_Id");
            //});
            //parentTaskMap.Property(x => x.Tasks);

            //parentTaskMap.Map(config =>
            //{
            //    config.ToTable("ParentTask");
            //    config.Property(x => x.ParentTaskId).HasColumnName("Parent_Id");
            //    config.Property(x => x.Parent_Task).HasColumnName("Parent_Task");

            //});

            base.OnModelCreating(modelBuilder);
        }

        public void SetModifield(object value)
        {
            Entry(value).State = EntityState.Modified;
        }

        //DbEntityEntry  ITaskDbContext.Entry(object value)
        //{
        //    return Entry(value);
        //}


    }
}
