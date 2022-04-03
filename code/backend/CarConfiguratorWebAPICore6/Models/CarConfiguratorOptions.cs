using System.Collections;

namespace CarConfiguratorWebAPICore6.Models
{
    public partial class CarConfiguratorOption
    {
        public DBTableAusstattungstypen? typeInfo { get; set; }
        public object? typeValue { get; set; }
    }

    public partial class CarConfiguratorOptions
    {
        public IEnumerable<CarConfiguratorOption>? options { get; set; }
    }
}
