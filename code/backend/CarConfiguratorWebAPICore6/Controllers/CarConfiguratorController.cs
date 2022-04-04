#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarConfiguratorWebAPICore6.DatabaseContext;
using CarConfiguratorWebAPICore6.Models;
using System.Net.Mime;
using Newtonsoft.Json.Linq;
using System.Collections.ObjectModel;

namespace CarConfiguratorWebAPICore6.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/carconfigurator")]
    [ApiController()]
    public class CarConfiguratorController : ControllerBase
    {
        private readonly CarConfiguratorDatabaseContext _context;
        private readonly ILogger<CarConfiguratorController> _logger;

        public CarConfiguratorController(ILogger<CarConfiguratorController> logger, CarConfiguratorDatabaseContext context)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("configtypes")]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> GetCarConfigOptionsById(int id)
        {
            DBTableAusstattungstypen typ = await _context.Ausstattungstypen.SingleOrDefaultAsync(e => e.id == id);

            return typ == null ? NotFound() : Ok(typ);
        }

        [HttpGet("configtypes/{name}")]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> GetCarConfigOptionsByName(string name)
        {
            DBTableAusstattungstypen typ = await _context.Ausstattungstypen.SingleOrDefaultAsync(e => e.name == name);

            return typ == null ? NotFound() : Ok(typ);
        }

        [HttpGet("configtypes/all")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CarConfiguratorOption>))]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> GetCarConfigOptionsAll()
        {
            // get info and value for specific Ausstattung...
            // ... Felgen
            var felgenTypeInfo = await _context.Ausstattungstypen.SingleOrDefaultAsync(e => "Felgen" == e.name);
            var felgenTypeValue = await _context.Felgen.ToListAsync();
            CarConfiguratorOption felgenOption = new CarConfiguratorOption
            {
                typeInfo = felgenTypeInfo,
                typeValue = felgenTypeValue
            };

            // ...Lackierung
            var LackierungTypeInfo = await _context.Ausstattungstypen.SingleOrDefaultAsync(e => "Lackierung" == e.name);
            var LackierungTypeValue = await _context.Lackierung.ToListAsync();
            CarConfiguratorOption LackierungOption = new CarConfiguratorOption
            {
                typeInfo = LackierungTypeInfo,
                typeValue = LackierungTypeValue
            };

            // ...Motorleistung
            var MotorleistungTypeInfo = await _context.Ausstattungstypen.SingleOrDefaultAsync(e => "Motorleistung" == e.name);
            var MotorleistungTypeValue = await _context.Motorleistung.ToListAsync();
            CarConfiguratorOption MotorleistungOption = new CarConfiguratorOption
            {
                typeInfo = MotorleistungTypeInfo,
                typeValue = MotorleistungTypeValue
            };

            var options = new CarConfiguratorOption[3] {
                felgenOption,
                LackierungOption,
                MotorleistungOption
            };

            return Ok(options);
        }

        // GET      /bestellung/{id}?more={more}
        // get bestellung by id. If more=TRUE, also return full KFZKonfiguration otherwise only bestellung
        [HttpGet("bestellung/{bestellnummer}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> GetBestellungByBestellnummer(int bestellnummer, bool more = true)
        {
            //TODO: implement more Parameter
            var bestellungFull = await _context.Bestellungen.SingleOrDefaultAsync(e => bestellnummer == e.bestellnummer);

            if (bestellungFull == null)
            {
                return NotFound();
            }

            var bestellung = new DBTableBestellungenLight()
            {
                kfzkonfiguration_id = bestellungFull.kfzkonfiguration_id,
                kundenname = bestellungFull.kundenname,
                bestellnummer = bestellungFull.bestellnummer,
                bestelluhrzeit = bestellungFull.bestelluhrzeit,
                bestellsumme = bestellungFull.bestellsumme,
            };

            //var kfzKonfigurationen = await _context.KFZKonfiguration.ToListAsync();

            //DBTableKFZKonfigurationLight kfzKonfiguration = null;

            //for (var i = 0; i < kfzKonfigurationen.Count; i++)
            //{
            //    if (kfzKonfigurationen[i].id == bestellung.kfzkonfiguration_id)
            //    {
            //        kfzKonfiguration = new DBTableKFZKonfigurationLight()
            //        {
            //            kfz_id = kfzKonfigurationen[i].kfz_id,
            //            motorleistung_id = kfzKonfigurationen[i].motorleistung_id,
            //            felgen_id = kfzKonfigurationen[i].felgen_id,
            //            lackierung_id = kfzKonfigurationen[i].lackierung_id
            //        };
            //        break;
            //    }
            //}

            //if (kfzKonfiguration == null)
            //{
            //    return NotFound();
            //}

            var kfzKonfigurationFull = await _context.KFZKonfiguration.SingleOrDefaultAsync(e => bestellung.kfzkonfiguration_id == e.id);

            if (kfzKonfigurationFull == null)
            {
                return NotFound();
            }

            var kfzKonfiguration = new DBTableKFZKonfigurationLight()
            {
                kfz_id = kfzKonfigurationFull.kfz_id,
                motorleistung_id = kfzKonfigurationFull.motorleistung_id,
                felgen_id = kfzKonfigurationFull.felgen_id,
                lackierung_id = kfzKonfigurationFull.lackierung_id
            };

            var returnObject = new
            {
                bestellung = bestellung,
                kfzKonfiguration = kfzKonfiguration,
            };

            return Ok(returnObject);
        }

        // TODO: put Light models into extra class files!
        public class DBTableKFZKonfigurationLight
        {
            public Nullable<int> kfz_id { get; set; }
            public Nullable<int> motorleistung_id { get; set; }
            public Nullable<int> felgen_id { get; set; }
            public Nullable<int> lackierung_id { get; set; }
        }

        public class DBTableBestellungenLight
        {
            public Nullable<int> kfzkonfiguration_id { get; set; }
            public string kundenname { get; set; }
            public int bestellnummer { get; set; }
            public System.DateTime? bestelluhrzeit { get; set; }
            public decimal bestellsumme { get; set; }
        }

        public class PostBestellungBody
        {
            public DBTableKFZKonfigurationLight KFZKonfiguration { get; set; }
            public int bestellnummer { get; set; }
            public string kundenname { get; set; }
        }

        // POST     /bestellung/[FROMBODY]
        [HttpPost("bestellung")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> PostBestellung([FromBody] PostBestellungBody data)
        {
            var rnd = new Random();
            var kfzKonfigurationsId = rnd.Next();

            //_b.kFZKonfiguration = kfzKonfigurationsId;

            DBTableKFZKonfiguration KFZKonfiguration = new DBTableKFZKonfiguration()
            {
                id = kfzKonfigurationsId,
                kfz_id = data.KFZKonfiguration.kfz_id,
                motorleistung_id = data.KFZKonfiguration.motorleistung_id,
                felgen_id = data.KFZKonfiguration.felgen_id,
                lackierung_id = data.KFZKonfiguration.lackierung_id
            };

            var motorleistungObject = await _context.Motorleistung.SingleOrDefaultAsync(e => data.KFZKonfiguration.motorleistung_id == e.id);
            var felgenObject = await _context.Felgen.SingleOrDefaultAsync(e => data.KFZKonfiguration.felgen_id == e.id);
            var lackierungObject = await _context.Lackierung.SingleOrDefaultAsync(e => data.KFZKonfiguration.lackierung_id == e.id);
            var kfzObject = await _context.Kraftfahrzeuge.SingleOrDefaultAsync(e => data.KFZKonfiguration.kfz_id == e.id);

            if (motorleistungObject == null || felgenObject == null || lackierungObject == null || kfzObject == null)
            {
                return NotFound();
            }

            KFZKonfiguration.Motorleistung = motorleistungObject;
            KFZKonfiguration.Felgen = felgenObject;
            KFZKonfiguration.Lackierung = lackierungObject;

            decimal sum = kfzObject.grundpreis + motorleistungObject.preis + felgenObject.preis + lackierungObject.preis;

            DBTableBestellungen bestellung = new DBTableBestellungen
            {
                id = rnd.Next(),
                bestellnummer = data.bestellnummer,
                kundenname = data.kundenname,
                kfzkonfiguration_id = kfzKonfigurationsId,
                KFZKonfiguration = KFZKonfiguration,
                bestelluhrzeit = null, // weird datetime to datetime2 conversion error here so stays null for now
                bestellsumme = sum
            };

            if (KFZKonfiguration.Bestellungen == null)
            {
                KFZKonfiguration.Bestellungen = new Collection<DBTableBestellungen>();
            }
            KFZKonfiguration.Bestellungen.Add(bestellung);

            await _context.KFZKonfiguration.AddAsync(KFZKonfiguration);
            await _context.Bestellungen.AddAsync(bestellung);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetBestellungByBestellnummer", new {})
            return Ok();
        }

        // DELETE   /bestellung/{id}
        // deletes bestellung and all asociated table contents
        [HttpDelete("bestellung/{bestellnummer}")]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> DeleteBestellung(int bestellnummer)
        {
            var bestellung = await _context.Bestellungen.SingleOrDefaultAsync(e => bestellnummer == e.bestellnummer);
            if (bestellung == null)
            {
                return NotFound();
            }

            var KFZKonfiguration = await _context.KFZKonfiguration.SingleOrDefaultAsync(e => bestellung.kfzkonfiguration_id == e.id);
            if (KFZKonfiguration == null)
            {
                return NotFound();
            }

            _context.KFZKonfiguration.Remove(KFZKonfiguration);
            _context.Bestellungen.Remove(bestellung);

            await _context.SaveChangesAsync();

            return Ok();
        }

        // GET      /cars/all
        [HttpGet("cars/all")]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> GetCars()
        {
            var cars = await _context.Kraftfahrzeuge.ToListAsync();
            if (cars == null)
            {
                return NotFound();
            }

            return Ok(cars);
        }

        private async Task<bool> AusstattungstypenExists(int id)
        {
            return await _context.Ausstattungstypen.AnyAsync(e => e.id == id);
        }
    }
}
