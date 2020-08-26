using Microsoft.EntityFrameworkCore.Migrations;

namespace DeTai.ThucTap.Data.Migrations
{
    public partial class initialdsafsssads : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "CalendarReminders",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CalendarReminders_UserId",
                table: "CalendarReminders",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CalendarReminders_AspNetUsers_UserId",
                table: "CalendarReminders",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CalendarReminders_AspNetUsers_UserId",
                table: "CalendarReminders");

            migrationBuilder.DropIndex(
                name: "IX_CalendarReminders_UserId",
                table: "CalendarReminders");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "CalendarReminders");
        }
    }
}
