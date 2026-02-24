using api.Data;
using Microsoft.EntityFrameworkCore;
using api.Repository;
using api.Interfaces;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ITodoRepository, TodoRepository>();

builder.Services.AddCors(option =>
{
    option.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .WithExposedHeaders("Location");
    });
});
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

app.UseCors();

app.MapControllers();

app.Run();