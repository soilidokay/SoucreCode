using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DeTai.ThucTap.Data.Migrations
{
    public partial class UpdatedFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "VocabularyCategoryId",
                table: "Vocabularies",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Vocabularies_VocabularyCategoryId",
                table: "Vocabularies",
                column: "VocabularyCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vocabularies_VocabularyCategories_VocabularyCategoryId",
                table: "Vocabularies",
                column: "VocabularyCategoryId",
                principalTable: "VocabularyCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vocabularies_VocabularyCategories_VocabularyCategoryId",
                table: "Vocabularies");

            migrationBuilder.DropIndex(
                name: "IX_Vocabularies_VocabularyCategoryId",
                table: "Vocabularies");

            migrationBuilder.DropColumn(
                name: "VocabularyCategoryId",
                table: "Vocabularies");
        }
    }
}
