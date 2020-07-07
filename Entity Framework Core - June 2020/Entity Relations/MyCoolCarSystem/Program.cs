using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using MyCoolCarSystem.Data;
using MyCoolCarSystem.Data.Models;



namespace MyCoolCarSystem
{
    public class Program
    {
        static void Main(string[] args)
        {
            using var db = new CarDbContext();

            db.Database.Migrate();

            var opelMake = db.Makes.FirstOrDefault(m => m.Name == "Opel");

            opelMake.Models.Add(new Model
            {
                Name = "Astra",
                Year = 2017,
                Modification = "OPC",
            });

            opelMake.Models.Add(new Model
            {
                Name = "Insignia",
                Year = 2019,
                Modification = "2.2 TDI",
            });

            db.SaveChanges();
        }
    }
}
