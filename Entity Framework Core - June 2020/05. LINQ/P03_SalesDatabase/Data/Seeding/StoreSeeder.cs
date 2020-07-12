using System;
using System.Collections.Generic;
using System.Text;
using P03_SalesDatabase.Data.Models;
using P03_SalesDatabase.Data.Seeding.Contracts;

namespace P03_SalesDatabase.Data.Seeding
{
    public class StoreSeeder : ISeeder
    {
        private readonly SalesContext dbContext;

        public StoreSeeder(SalesContext context)
        {
            this.dbContext = context;
        }

        public void Seed()
        {
            Store[] stores = new Store[]
            {
                new Store() {Name = "PcTech Sofia"},
                new Store() {Name = "PcTech Plovdiv"},
                new Store() {Name = "PcTech Varna"},
                new Store() {Name = "InnovativeTech Sofia"},
            };

            this.dbContext
                .Stores
                .AddRange(stores);


            this.dbContext.SaveChanges();

        }
    }
}
