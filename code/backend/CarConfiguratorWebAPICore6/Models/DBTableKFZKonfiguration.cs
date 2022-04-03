namespace CarConfiguratorWebAPICore6.Models
{
    public partial class DBTableKFZKonfiguration
    {
        public int id { get; set; }
        public Nullable<int> kfz_id { get; set; }
        public Nullable<int> motorleistung_id { get; set; }
        public Nullable<int> felgen_id { get; set; }
        public Nullable<int> lackierung_id { get; set; }

        public virtual DBTableFelgen DBTableFelgen { get; set; }
        public virtual DBTableKraftfahrzeuge DBTableKraftfahrzeuge { get; set; }
        public virtual DBTableLackierung DBTableLackierung { get; set; }
        public virtual DBTableMotorleistung DBTableMotorleistung { get; set; }
    }
}
