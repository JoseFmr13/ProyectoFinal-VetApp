using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VetApp.Migrations
{
    /// <inheritdoc />
    public partial class AgregarDataSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Mascotas",
                columns: new[] { "Id", "Especie", "Nombre", "NombreDueno", "Raza" },
                values: new object[,]
                {
                    { 1, "Perro", "Max", "Juan García", "Labrador" },
                    { 2, "Gato", "Luna", "María López", "Siamés" },
                    { 3, "Perro", "Rocky", "Carlos Torres", "Bulldog" }
                });

            migrationBuilder.InsertData(
                table: "Veterinarios",
                columns: new[] { "Id", "Especialidad", "Nombre", "Telefono" },
                values: new object[,]
                {
                    { 1, "Cirugía", "Dr. Carlos Ramírez", "6641234567" },
                    { 2, "Dermatología", "Dra. Laura Méndez", "6649876543" },
                    { 3, "Nutrición", "Dr. Pedro Soto", "6645554433" }
                });

            migrationBuilder.InsertData(
                table: "Citas",
                columns: new[] { "Id", "Fecha", "MascotaId", "Motivo", "VeterinarioId" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 5, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "Revisión general", 1 },
                    { 2, new DateTime(2026, 5, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "Vacunación anual", 2 },
                    { 3, new DateTime(2026, 5, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "Control de peso", 3 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Citas",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Citas",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Citas",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Mascotas",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Mascotas",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Mascotas",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Veterinarios",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Veterinarios",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Veterinarios",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
