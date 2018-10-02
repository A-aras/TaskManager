namespace Task.DataLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Task", "ParentTask_ParentTaskId", c => c.Int());
            CreateIndex("dbo.Task", "ParentTask_ParentTaskId");
            AddForeignKey("dbo.Task", "ParentTask_ParentTaskId", "dbo.ParentTask", "Parent_Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Task", "ParentTask_ParentTaskId", "dbo.ParentTask");
            DropIndex("dbo.Task", new[] { "ParentTask_ParentTaskId" });
            DropColumn("dbo.Task", "ParentTask_ParentTaskId");
        }
    }
}
