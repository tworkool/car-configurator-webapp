namespace CarConfiguratorWebAPICore6.DatabaseContext
{
    using Microsoft.EntityFrameworkCore;
    using CarConfiguratorWebAPICore6.Models;

    public class CarConfiguratorDatabaseContext : DbContext
    {
        public CarConfiguratorDatabaseContext(DbContextOptions<CarConfiguratorDatabaseContext> options) : base(options)
        {
        }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        //    //throw new UnintentionalCodeFirstException();
        //}

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(
        //        @"Server=(localdb)\mssqllocaldb;Database=Blogging;Trusted_Connection=True");
        //}

        public DbSet<DBTableAusstattungstypen> Ausstattungstypen { get; set; }
        public DbSet<DBTableBestellungen> Bestellungen { get; set; }
        public DbSet<DBTableFelgen> Felgen { get; set; }
        public DbSet<DBTableKFZKonfiguration> KFZKonfiguration { get; set; }
        public DbSet<DBTableKraftfahrzeuge> Kraftfahrzeuge { get; set; }
        public DbSet<DBTableLackierung> Lackierung { get; set; }
        public DbSet<DBTableMotorleistung> Motorleistung { get; set; }
        public DbSet<DBTableSonderausstattung> Sonderausstattung { get; set; }
    }
}
