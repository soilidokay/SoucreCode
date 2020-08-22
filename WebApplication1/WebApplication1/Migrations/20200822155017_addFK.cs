using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class addFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CategoryTypeId",
                table: "ContentType",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ContentType_CategoryTypeId",
                table: "ContentType",
                column: "CategoryTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ContentType_CategoryType_CategoryTypeId",
                table: "ContentType",
                column: "CategoryTypeId",
                principalTable: "CategoryType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentType_CategoryType_CategoryTypeId",
                table: "ContentType");

            migrationBuilder.DropIndex(
                name: "IX_ContentType_CategoryTypeId",
                table: "ContentType");

            migrationBuilder.DropColumn(
                name: "CategoryTypeId",
                table: "ContentType");
        }
    }
}
