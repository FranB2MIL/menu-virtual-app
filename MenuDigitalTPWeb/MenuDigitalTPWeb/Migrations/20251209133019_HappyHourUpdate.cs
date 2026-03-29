using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MenuDigitalTPWeb.Migrations
{
    /// <inheritdoc />
    public partial class HappyHourUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HappyHour",
                table: "Users",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "HappyHour",
                value: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HappyHour",
                table: "Users");
        }
    }
}
