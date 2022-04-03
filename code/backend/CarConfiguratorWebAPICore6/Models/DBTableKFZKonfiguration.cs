using System.ComponentModel.DataAnnotations.Schema;

namespace CarConfiguratorWebAPICore6.Models
{
    public partial class DBTableKFZKonfiguration
    {
        public int id { get; set; }
        public Nullable<int> kfz_id { get; set; }
        public Nullable<int> motorleistung_id { get; set; }
        public Nullable<int> felgen_id { get; set; }
        public Nullable<int> lackierung_id { get; set; }

        [ForeignKey("felgen_id")]
        public virtual DBTableFelgen Felgen { get; set; }
        [ForeignKey("kfz_id")]
        public virtual DBTableKraftfahrzeuge Kraftfahrzeuge { get; set; }
        [ForeignKey("lackierung_id")]
        public virtual DBTableLackierung Lackierung { get; set; }
        [ForeignKey("motorleistung_id")]
        public virtual DBTableMotorleistung Motorleistung { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DBTableBestellungen> Bestellungen { get; set; }
    }
}
