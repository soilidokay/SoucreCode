using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DeTai.ThucTap.Data.Migrations
{
    public partial class AdditionEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Vocabularies",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Word = table.Column<string>(nullable: true),
                    WordVN = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vocabularies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VocabularyCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    NameVN = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VocabularyCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Phrases",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Sentence = table.Column<string>(nullable: true),
                    SentenceVN = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    ContentVN = table.Column<string>(nullable: true),
                    VocabularyId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Phrases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Phrases_Vocabularies_VocabularyId",
                        column: x => x.VocabularyId,
                        principalTable: "Vocabularies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pronuciations",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Transcription = table.Column<string>(nullable: true),
                    LinkFile = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    VocabularyId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pronuciations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pronuciations_Vocabularies_VocabularyId",
                        column: x => x.VocabularyId,
                        principalTable: "Vocabularies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Phrases_VocabularyId",
                table: "Phrases",
                column: "VocabularyId");

            migrationBuilder.CreateIndex(
                name: "IX_Pronuciations_VocabularyId",
                table: "Pronuciations",
                column: "VocabularyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Phrases");

            migrationBuilder.DropTable(
                name: "Pronuciations");

            migrationBuilder.DropTable(
                name: "VocabularyCategories");

            migrationBuilder.DropTable(
                name: "Vocabularies");
        }
    }
}
