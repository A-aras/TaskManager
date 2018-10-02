using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
//using Task.Api.Models;
using Task.BusinessLayer;
using Task.DataLayer;
using Task.Entities;



namespace Task.Api.Controllers
{

    //[EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class TaskController : ApiController
    {
        private ITaskService taskService;

        public TaskController(ITaskService taskService)
        {
            this.taskService = taskService;
        }


        // GET: api/Task
        [Route("api/Task/GetAllTask")]
        [HttpGet]
        public ICollection<TaskModel> GetAllTaskModels()
        {
            var taskResulst = taskService.GetAllTasks();
            Console.WriteLine(taskResulst.ToString());
            return taskResulst;
        }

        // GET: api/Task
        [Route("api/Task/GetAllParentTask")]
        [HttpGet]
        public ICollection<ParentTaskModel> GetAllParentTaskModels()
        {
            var taskResulst = taskService.GetAllParentTasks();
            Console.WriteLine(taskResulst.ToString());
            return taskResulst;
        }

        // GET: api/Task/5
        [ResponseType(typeof(TaskModel))]
        [Route("api/Task/GetTaskById/{id:int}")]
        [HttpGet]
        public IHttpActionResult GetTaskModel(int id)

        {
            TaskModel taskModel = taskService.GetTaskById(id);
            if (taskModel == null)
            {
                return NotFound();
            }

            return Ok(taskModel);
        }

        // GET: api/Task
        [Route("api/Task/QueryTaks")]
        [HttpGet]
        public ICollection<TaskModel> GetTaskModels([FromUri]TaskQueryModel query)
        {

            //var taskResulst = db.Tasks.Include(x => x.ParentTask).Where(x => Matches(query, x));

            //var taskResulst = db.Tasks.Include(x => x.ParentTask).Where(x => x.TaskDescription.StartsWith(query.TaskName));
            //Console.WriteLine(taskResulst.ToString());
            var taskResults = taskService.QueryTask(query);

            return taskResults;
        }


        //private IQueryable<TaskModel> FilterTasks(IQueryable<TaskModel> tasks, TaskQueryModel query)
        //{
        //    if (!string.IsNullOrEmpty(query.TaskName))
        //    {
        //        tasks = tasks.Where(x => x.TaskDescription.StartsWith(query.TaskName));
        //    }

        //    if (!string.IsNullOrEmpty(query.ParentTask))
        //    {
        //        tasks = tasks.Where(x => x.ParentTask.Parent_Task == query.ParentTask);
        //    }

        //    if (query.PriorityFrom.HasValue)
        //    {
        //        tasks = tasks.Where(x => x.Priority >= query.PriorityFrom.Value);
        //    }

        //    if (query.PriorityTo.HasValue)
        //    {
        //        tasks = tasks.Where(x => x.Priority <= query.PriorityTo.Value);
        //    }

        //    if (query.StartDate.HasValue)
        //    {
        //        tasks = tasks.Where(x => x.StartDate >= query.StartDate);
        //    }

        //    if (query.EndDate.HasValue)
        //    {
        //        tasks = tasks.Where(x => x.EndDate >= query.EndDate);
        //    }


        //    return tasks;
        //}

        //private bool Matches(TaskQueryModel query, TaskModel task)
        //{
        //    var result = true;
        //    if (!string.IsNullOrEmpty(query.TaskName))
        //    {
        //        result = task.TaskDescription.StartsWith(query.TaskName);
        //    }
        //    if (!result && !string.IsNullOrEmpty(query.ParentTask))
        //    {
        //        result = task.ParentTask.Parent_Task == query.ParentTask;
        //    }
        //    if (!result && query.PriorityFrom.HasValue)
        //    {
        //        result = task.Priority >= query.PriorityFrom;
        //    }
        //    if (!result && query.PriorityTo.HasValue)
        //    {
        //        result = task.Priority <= query.PriorityTo;
        //    }
        //    if (!result && query.StartDate.HasValue)
        //    {
        //        result = task.StartDate >= query.StartDate;
        //    }
        //    if (!result && query.EndDate.HasValue)
        //    {
        //        result = task.EndDate <= query.EndDate;
        //    }
        //    return result;
        //}

        [HttpPut]
        [ResponseType(typeof(void))]
        [Route("api/Task/CloseTask/{id:int}")]
        public IHttpActionResult CloseTask(int id, TaskModel taskModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != taskModel.TaskId)
            {
                return BadRequest();
            }

            taskService.CloseTask(taskModel);
            //db.Entry(taskModel).State = EntityState.Modified;

            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!TaskModelExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return StatusCode(HttpStatusCode.OK);
        }


        // PUT: api/Task/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTaskModel(int id, TaskModel taskModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != taskModel.TaskId)
            {
                return BadRequest();
            }

            taskService.UpdateTaks(taskModel);
            //db.Entry(taskModel).State = EntityState.Modified;

            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!TaskModelExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return StatusCode(HttpStatusCode.OK);
        }

        // POST: api/Task
        [ResponseType(typeof(TaskModel))]
        public IHttpActionResult PostTaskModel(TaskModel taskModel)
        {
            TaskModel taskModel1 = taskService.GetTaskById(taskModel.TaskId);
            if (taskModel1 != null)
            {
                return BadRequest();
            }

            var result = taskService.AddTask(taskModel);
            if (result != null)
            {
                return Ok();
            }

            return BadRequest();


        }

        // DELETE: api/Task/5
        [ResponseType(typeof(TaskModel))]
        public IHttpActionResult DeleteTaskModel(int id)
        {

            TaskModel taskModel = taskService.GetTaskById(id);
            if (taskModel == null)
            {
                return NotFound();
            }

            var result = taskService.DeleteTaks(taskModel);
            if (result)
            {
                return Ok(taskModel);
            }

            return BadRequest();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                taskService.Dispose();
            }
            base.Dispose(disposing);
        }

        //private bool TaskModelExists(int id)
        //{
        //    return taskService.GetTaskById(id) != null;
        //}
    }

}