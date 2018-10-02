namespace Task.DataLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ClosedFlagChange : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Task", "IsClosed", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Task", "IsClosed");
        }
    }
}
