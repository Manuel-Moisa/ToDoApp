using api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // Aktiviert die Generierung der JSON-Datei
    app.UseSwagger(); 
    
    // Aktiviert die Webseite (SwaggerUI)
    app.UseSwaggerUI(options =>
    {
        // Dies stellt sicher, dass Swagger die richtige Datei findet
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = "swagger"; // Damit es unter /swagger erreichbar ist
    });
}

app.UseHttpsRedirection(); 

app.Run();