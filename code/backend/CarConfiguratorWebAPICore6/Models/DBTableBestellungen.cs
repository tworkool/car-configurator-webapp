using System.ComponentModel.DataAnnotations.Schema;

namespace CarConfiguratorWebAPICore6.Models
{
    public partial class DBTableBestellungen
    {
        public int id { get; set; }
        public Nullable<int> kfzkonfiguration_id { get; set; }
        public string kundenname { get; set; }
        public int bestellnummer { get; set; }
        public System.DateTime? bestelluhrzeit { get; set; }
        public decimal bestellsumme { get; set; }

        [ForeignKey("kfzkonfiguration_id")]
        public virtual DBTableKFZKonfiguration KFZKonfiguration { get; set; }
    }
}
