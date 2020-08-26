using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DeTai.ThucTap.Data.Migrations
{
    public partial class initialdsaf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LearningGoalDetails_Vocabularies_VocabilaryId",
                table: "LearningGoalDetails");

            migrationBuilder.DropIndex(
                name: "IX_LearningGoalDetails_VocabilaryId",
                table: "LearningGoalDetails");

            migrationBuilder.DropColumn(
                name: "VocabilaryId",
                table: "LearningGoalDetails");

            migrationBuilder.CreateIndex(
                name: "IX_LearningGoalDetails_VocabularyId",
                table: "LearningGoalDetails",
                column: "VocabularyId");

            migrationBuilder.AddForeignKey(
                name: "FK_LearningGoalDetails_Vocabularies_VocabularyId",
                table: "LearningGoalDetails",
                column: "VocabularyId",
                principalTable: "Vocabularies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LearningGoalDetails_Vocabularies_VocabularyId",
                table: "LearningGoalDetails");

            migrationBuilder.DropIndex(
                name: "IX_LearningGoalDetails_VocabularyId",
                table: "LearningGoalDetails");

            migrationBuilder.AddColumn<Guid>(
                name: "VocabilaryId",
                table: "LearningGoalDetails",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LearningGoalDetails_VocabilaryId",
                table: "LearningGoalDetails",
                column: "VocabilaryId");

            migrationBuilder.AddForeignKey(
                name: "FK_LearningGoalDetails_Vocabularies_VocabilaryId",
                table: "LearningGoalDetails",
                column: "VocabilaryId",
                principalTable: "Vocabularies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
