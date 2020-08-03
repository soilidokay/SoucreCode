using Microsoft.EntityFrameworkCore.Migrations;

namespace DeTai.ThucTap.Data.Migrations
{
    public partial class AddShare : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsShare",
                table: "VocabularyCategories",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "VocabularyCategories",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsShare",
                table: "Vocabularies",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_VocabularyCategories_UserId",
                table: "VocabularyCategories",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_VocabularyCategories_AspNetUsers_UserId",
                table: "VocabularyCategories",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VocabularyCategories_AspNetUsers_UserId",
                table: "VocabularyCategories");

            migrationBuilder.DropIndex(
                name: "IX_VocabularyCategories_UserId",
                table: "VocabularyCategories");

            migrationBuilder.DropColumn(
                name: "IsShare",
                table: "VocabularyCategories");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "VocabularyCategories");

            migrationBuilder.DropColumn(
                name: "IsShare",
                table: "Vocabularies");
        }
    }
}
