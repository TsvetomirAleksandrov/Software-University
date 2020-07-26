using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using PetStore.Common;

namespace PetStore.Data
{
    public class PetStoreDbContext : DbContext
    {
        public PetStoreDbContext()
        {
        }

        public PetStoreDbContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(DbConfiguraton.DefConnectionString);
            }

            base.OnConfiguring(optionsBuilder);
        }
    }
}
