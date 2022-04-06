namespace CarConfiguratorWebAPICore6.Models
{
    public partial class DBTableKraftfahrzeuge
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DBTableKraftfahrzeuge()
        {
            this.KFZKonfiguration = new HashSet<DBTableKFZKonfiguration>();
        }

        public int id { get; set; }
        public string name { get; set; }
        public string klasse { get; set; }
        public string hersteller { get; set; }
        public decimal grundpreis { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DBTableKFZKonfiguration> KFZKonfiguration { get; set; }
    }

    public partial class DBTableKraftfahrzeugeLight
    {
        public int id { get; set; }
        public string name { get; set; }
        public string klasse { get; set; }
        public string hersteller { get; set; }
        public decimal grundpreis { get; set; }
    }
}
