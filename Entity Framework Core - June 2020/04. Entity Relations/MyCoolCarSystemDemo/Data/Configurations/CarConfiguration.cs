using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MyCoolCarSystem.Data.Configurations
{

    using Data.Models;
    using Microsoft.EntityFrameworkCore;
    
    public class CarConfiguration : IEntityTypeConfiguration<Car>
    {
        public void Configure(EntityTypeBuilder<Car> car)
        {
            car
                .HasIndex(c => c.Vin)
                .IsUnique();

            car
                .HasOne(c => c.Model)
                .WithMany(m => m.Cars)
                .HasForeignKey(c => c.ModelId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
