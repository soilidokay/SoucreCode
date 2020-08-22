using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class choi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserRole_RoleId_UserId",
                table: "UserRole");

            migrationBuilder.DropIndex(
                name: "IX_ProjectMember_UserRoleId_ProjectId",
                table: "ProjectMember");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "IssueType",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "ContentTypeDetail",
                nullable: false,
                defaultValueSql: "(newid())",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleId_UserId",
                table: "UserRole",
                columns: new[] { "RoleId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMember_UserRoleId_ProjectId",
                table: "ProjectMember",
                columns: new[] { "UserRoleId", "ProjectId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserRole_RoleId_UserId",
                table: "UserRole");

            migrationBuilder.DropIndex(
                name: "IX_ProjectMember_UserRoleId_ProjectId",
                table: "ProjectMember");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "IssueType");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "ContentTypeDetail",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldDefaultValueSql: "(newid())");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleId_UserId",
                table: "UserRole",
                columns: new[] { "RoleId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMember_UserRoleId_ProjectId",
                table: "ProjectMember",
                columns: new[] { "UserRoleId", "ProjectId" });
        }
    }
}
