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
    public interface ITaskDbContext:IDisposable
    {
        IDbSet<TaskModel> Tasks { get; set; }

        IDbSet<ParentTaskModel> ParentTasks { get; set; }

        int SaveChanges();

        //DbEntityEntry Entry(object value);

        void SetModifield(object value);
    }
}
