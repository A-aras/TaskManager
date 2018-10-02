namespace Task.DataLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ParentTask",
                c => new
                    {
                        Parent_Id = c.Int(nullable: false, identity: true),
                        Parent_Task = c.String(),
                    })
                .PrimaryKey(t => t.Parent_Id);
            
            CreateTable(
                "dbo.Task",
                c => new
                    {
                        Task_Id = c.Int(nullable: false, identity: true),
                        Task = c.String(),
                        StartDate = c.DateTime(),
                        EndDate = c.DateTime(),
                        Priority = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Task_Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Task");
            DropTable("dbo.ParentTask");
        }
    }
}
