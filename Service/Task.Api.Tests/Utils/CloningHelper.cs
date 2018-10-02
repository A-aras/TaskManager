using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;
using Task.Entities;

namespace Task.Api.Tests.Utils
{
    public static class CloningHelper
    {
        public static TaskModel Clone(this TaskModel source) 
        {
            //var formatter = new BinaryFormatter();
            //var memStream = new System.IO.MemoryStream();
            //formatter.Serialize(memStream, source);
            //memStream.Position = 0;
            //var reulst = formatter.Deserialize(memStream);
            //memStream.Close();
            //return (T)reulst;
            ////var serilizatoin=new System.Security.se
            ////return source;

            var result = new TaskModel();
            result.TaskId = source.TaskId;
            if(source.ParentTask!=null)
            {
                result.ParentTask = source.ParentTask.Clone();
            }
            result.ParentTaskId = source.ParentTaskId;
            result.Priority = source.Priority;
            result.StartDate = source.StartDate;
            result.EndDate = source.EndDate;
            result.TaskDescription = source.TaskDescription;
            result.IsClosed = source.IsClosed;
            return result;
        }

        public static ParentTaskModel Clone(this ParentTaskModel source)
        {
            //var formatter = new BinaryFormatter();
            //var memStream = new System.IO.MemoryStream();
            //formatter.Serialize(memStream, source);
            //memStream.Position = 0;
            //var reulst = formatter.Deserialize(memStream);
            //memStream.Close();
            //return (T)reulst;
            ////var serilizatoin=new System.Security.se
            ////return source;

            var result = new ParentTaskModel();
            result.ParentTaskId = source.ParentTaskId;
            result.Parent_Task = source.Parent_Task;
            if(result.Tasks!=null)
            {
                foreach(var item in source.Tasks)
                {
                    result.Tasks.Add(item.Clone());
                }
            }
            return result;
        }
    }
}
