var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

// app.UseHttpsRedirection(); // Falls du die Warnung von vorhin noch hast, lass das erst mal weg

app.Run();
