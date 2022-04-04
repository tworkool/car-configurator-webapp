using Microsoft.EntityFrameworkCore;
using CarConfiguratorWebAPICore6.DatabaseContext;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    @"Data Source=DESKTOP-UTMP8OH\SQLEXPRESSOLIVER;Initial Catalog=CarConfiguratorDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

//var contextOptions = new DbContextOptionsBuilder<CarConfiguratorDatabaseContext>()
//    .UseSqlServer(connectionString)
//    .Options;

//using var context = new CarConfiguratorDatabaseContext(contextOptions);

builder.Services.AddDbContext<CarConfiguratorDatabaseContext>(opt => { opt.UseSqlServer(connectionString).EnableDetailedErrors(); });

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//https://docs.microsoft.com/en-us/aspnet/core/security/cors?msclkid=b736fedab42011ecbaf2e34a1bc5f91e&view=aspnetcore-6.0
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

//app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.Run();
