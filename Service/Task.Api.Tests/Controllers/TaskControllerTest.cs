using NUnit.Framework;
using NUnit.Framework.Internal;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Web.Http.Results;
using Task.Api.Controllers;
using Task.Api.Tests.Utils;
using Task.BusinessLayer;
using Task.DataLayer;
using Task.Entities;
using Task.QualityTools;
using Unity;
using NSubstitute;

namespace Task.Api.Tests.Controllers
{
    [TestFixture]
    public class TaskControllerTest
    {
        private TaskController Controller;
        private UnityContainer container;

        [SetUp]
        public void Setup()
        {
            container = new UnityContainer();
            container.RegisterType<ITaskDbContext, TaskDbContextFake>();
            container.RegisterType<ITaskService, TaskService>();
            var taskService = container.Resolve<ITaskService>();
            Controller = new TaskController(taskService);
        }

        [TestCase]
        public void When_SearchForAllTask_Then_AllTasksReceived()
        {
            // Arrange & Act
            var result = Controller.GetAllTaskModels();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count());
        }

        [TestCase]
        public void When_SearchForAllParentTask_Then_AllParentTasksReceived()
        {
            // Arrange & Act
            var result = Controller.GetAllParentTaskModels();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count());
        }

        [TestCase]
        public void When_SearchByTaskIdAndAvailable_Then_OkReceived()
        {
            // Arrange & Act
            var result = Controller.GetTaskModel(1);
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkNegotiatedContentResult<TaskModel>>(result);
            var castedResult = result as OkNegotiatedContentResult<TaskModel>;
            Assert.AreEqual(1, castedResult.Content.TaskId);
        }

        [TestCase]
        public void When_SearchByTaskIdAndNotAvailable_Then_NotFoundReceived()
        {
            // Arrange & Act
            var result = Controller.GetTaskModel(101);
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [TestCase]
        public void When_DeleteExistingTaskModel_Then_Deleted()
        {
            // Arrange & Act
            var result = Controller.DeleteTaskModel(1);
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkNegotiatedContentResult<TaskModel>>(result);
            var castedResult = result as OkNegotiatedContentResult<TaskModel>;
            Assert.AreEqual(1, castedResult.Content.TaskId);
        }
        [TestCase]
        public void When_DeleteNonExistingTaskModel_Then_Error()
        {
            // Arrange & Act
            var result = Controller.DeleteTaskModel(101);
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<NotFoundResult>(result);

        }

        [TestCase]
        public void When_DeleteTaskAndDBError_Then_Fail()
        {
            // Arrange
            var task = TaskServiceFakeData.TasksData.Task1.Clone();
            task.IsClosed = false;
            var service = Substitute.For<ITaskService>();
            service.GetTaskById(1).Returns(x => { return task; });
            service.DeleteTaks(task).Returns(x => { return false; });
            Controller = new TaskController(service);

            // Arrange 
            var result = Controller.DeleteTaskModel(task.TaskId);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<BadRequestResult>(result);
        }

        [TestCase]
        public void When_Put_Task_WhichIsNotAvailale_Then_Error()
        {
            // Arrange & Act
            var result = Controller.PutTaskModel(1001, TaskServiceFakeData.TasksData.Task1);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<BadRequestResult>(result);
        }

        [TestCase]
        public void When_Put_AnExistingTask_Then_Pass()
        {
            // Arrange & Act
            var task = TaskServiceFakeData.TasksData.Task1.Clone();
            task.IsClosed = false;
            var result = Controller.PutTaskModel(task.TaskId, task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var castedResult = result as StatusCodeResult;

            Assert.AreEqual(HttpStatusCode.OK, castedResult.StatusCode);
        }

        [TestCase]
        public void When_PutTaskWithInvalidModelState_Then_Should_Fail()
        {
            // Arrange
            var task = TaskServiceFakeData.TasksData.Task1.Clone();
            task.TaskDescription = null;
            task.Priority = 35;

            // Act
            Controller.ModelState.AddModelError("Priorty", "Priority is invalid");
            var result = Controller.PutTaskModel(task.TaskId, task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<InvalidModelStateResult>(result);

        }

        [TestCase]
        public void When_Post_AnExistingTask_Then_Fail()
        {
            // Arrange & Act
            var task = TaskServiceFakeData.TasksData.Task1.Clone();
            task.IsClosed = false;
            var result = Controller.PostTaskModel(task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<BadRequestResult>(result);
        }

        [TestCase]
        public void When_Post_AnNewTask_Then_Pass()
        {
            // Arrange
            var task = new TaskModel { EndDate = System.DateTime.Now.AddDays(30), IsClosed = false, ParentTask = null, ParentTaskId = null, Priority = 20, StartDate = System.DateTime.Now, TaskDescription = "Fake Taks", TaskId = 0 };
            // Arrange 
            var result = Controller.PostTaskModel(task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<OkResult>(result);
        }

        [TestCase]
        public void When_Post_AnNewTaskAndDBError_Then_Fail()
        {
            // Arrange
            var task = new TaskModel { EndDate = System.DateTime.Now.AddDays(30), IsClosed = false, ParentTask = null, ParentTaskId = null, Priority = 20, StartDate = System.DateTime.Now, TaskDescription = "Fake Taks", TaskId = 0 };
            var service = Substitute.For<ITaskService>();
            service.AddTask(task).Returns(x => { return null; });
            Controller = new TaskController(service);

            // Arrange 
            var result = Controller.PostTaskModel(task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<BadRequestResult>(result);
        }


        [TestCase]
        public void When_GetTaskModels_Then_MatchingTasksReceived()
        {
            // Arrange & Act
            var result = Controller.GetTaskModels(new TaskQueryModel() { TaskName = "First Task" });
            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count);
        }


        [TestCase]
        public void When_ModelWithInvalidState_Then_ValidationShouldStopFurtherSteps()
        {
            // Arrange & Act
            var task = TaskServiceFakeData.TasksData.Task1.Clone();
            task.TaskDescription = null;
            task.Priority = 35;
            var context = new ValidationContext(task, null, null);
            var valResult = new List<ValidationResult>();
            var modelState = Validator.TryValidateObject(task, context, valResult, true); ;

            // Assert
            Assert.IsNotNull(valResult);
            Assert.True(!modelState);

        }

        [TestCase]
        public void When_CloseTaskWithInvalidModelState_Then_Should_Fail()
        {
            // Arrange
            var task = TaskServiceFakeData.TasksData.Task1.Clone();
            task.TaskDescription = null;
            task.Priority = 35;

            // Act
            Controller.ModelState.AddModelError("Priorty", "Priority is invalid");
            var result = Controller.CloseTask(task.TaskId, task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<InvalidModelStateResult>(result);

        }

        [TestCase]
        public void When_CloseTaskWithIdMismatch_Then_Should_Fail()
        {
            // Arrange
            var task = TaskServiceFakeData.TasksData.Task1.Clone();

            // Act
            var result = Controller.CloseTask(500, task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<BadRequestResult>(result);

        }

        [TestCase]
        public void When_CloseTaskWithValidModelState_Then_Should_Pass()
        {
            // Arrange
            var task = TaskServiceFakeData.TasksData.Task1.Clone();


            // Act
            Controller.ModelState.Clear();
            var result = Controller.CloseTask(task.TaskId, task);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<StatusCodeResult>(result);
            var castedResult = result as StatusCodeResult;
            Assert.AreEqual(HttpStatusCode.OK, castedResult.StatusCode);

        }
    }
}
