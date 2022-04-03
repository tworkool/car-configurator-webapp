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
        public async Task<IActionResult> GetById(int id)
        {
            DBTableAusstattungstypen typ = await _context.Ausstattungstypen.SingleOrDefaultAsync(e => e.id == id);

            return typ == null ? NotFound() : Ok(typ);
        }

        [HttpGet("configtypes/{name}")]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> GetByName(string name)
        {
            DBTableAusstattungstypen typ = await _context.Ausstattungstypen.SingleOrDefaultAsync(e => e.name == name);

            return typ == null ? NotFound() : Ok(typ);
        }

        //[HttpGet("configtypes/all")]
        //[Produces(MediaTypeNames.Application.Json)]
        //public async Task<ActionResult<IEnumerable<DBTableAusstattungstypen>>> GetAll()
        //{
        //    return Ok(await _context.Ausstattungstypen.ToListAsync());
        //}

        [HttpGet("configtypes/all")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CarConfiguratorOption>))]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> GetAll()
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

        // POST     /bestellung/[FROMBODY]

        // DELETE   /bestellung/{id}
        // deletes bestellung and all asociated table contents

        // GET      /cars/all

        private async Task<bool> AusstattungstypenExists(int id)
        {
            return await _context.Ausstattungstypen.AnyAsync(e => e.id == id);
        }
    }
}
