namespace CarConfiguratorWebAPICore6.Models
{
    public partial class DBTableFelgen
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DBTableFelgen()
        {
            this.KFZKonfiguration = new HashSet<DBTableKFZKonfiguration>();
        }

        public int id { get; set; }
        public string name { get; set; }
        public string beschreibung { get; set; }
        public decimal preis { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DBTableKFZKonfiguration> KFZKonfiguration { get; set; }
    }

    public partial class DBTableFelgenLight
    {
        public int id { get; set; }
        public string name { get; set; }
        public string beschreibung { get; set; }
        public decimal preis { get; set; }
    }
}
