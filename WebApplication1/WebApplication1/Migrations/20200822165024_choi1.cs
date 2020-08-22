using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class choi1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_IssueType",
                table: "IssueType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IssueType",
                table: "IssueType",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_IssueType_IssueId_ContentTypeDetailId",
                table: "IssueType",
                columns: new[] { "IssueId", "ContentTypeDetailId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_IssueType",
                table: "IssueType");

            migrationBuilder.DropIndex(
                name: "IX_IssueType_IssueId_ContentTypeDetailId",
                table: "IssueType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IssueType",
                table: "IssueType",
                columns: new[] { "IssueId", "ContentTypeDetailId" })
                .Annotation("SqlServer:Clustered", true);
        }
    }
}
