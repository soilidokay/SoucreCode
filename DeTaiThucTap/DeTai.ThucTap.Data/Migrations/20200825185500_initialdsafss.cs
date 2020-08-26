using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DeTai.ThucTap.Data.Migrations
{
    public partial class initialdsafss : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CalendarReminders_LearningGoals_IdLearningGoal",
                table: "CalendarReminders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CalendarReminders",
                table: "CalendarReminders");

            migrationBuilder.AlterColumn<Guid>(
                name: "IdLearningGoal",
                table: "CalendarReminders",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "CalendarReminders",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CalendarReminders",
                table: "CalendarReminders",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_CalendarReminders_IdLearningGoal",
                table: "CalendarReminders",
                column: "IdLearningGoal",
                unique: true,
                filter: "[IdLearningGoal] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_CalendarReminders_LearningGoals_IdLearningGoal",
                table: "CalendarReminders",
                column: "IdLearningGoal",
                principalTable: "LearningGoals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CalendarReminders_LearningGoals_IdLearningGoal",
                table: "CalendarReminders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CalendarReminders",
                table: "CalendarReminders");

            migrationBuilder.DropIndex(
                name: "IX_CalendarReminders_IdLearningGoal",
                table: "CalendarReminders");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CalendarReminders");

            migrationBuilder.AlterColumn<Guid>(
                name: "IdLearningGoal",
                table: "CalendarReminders",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CalendarReminders",
                table: "CalendarReminders",
                column: "IdLearningGoal");

            migrationBuilder.AddForeignKey(
                name: "FK_CalendarReminders_LearningGoals_IdLearningGoal",
                table: "CalendarReminders",
                column: "IdLearningGoal",
                principalTable: "LearningGoals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
