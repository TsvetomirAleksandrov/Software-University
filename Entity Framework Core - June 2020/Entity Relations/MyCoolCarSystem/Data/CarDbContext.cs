using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using MyCoolCarSystem.Data.Configurations;
using MyCoolCarSystem.Data.Models;

namespace MyCoolCarSystem.Data
{
    public class CarDbContext : DbContext
    {
        public DbSet<Car> Cars { get; set; }

        public DbSet<Make> Makes { get; set; }

        public DbSet<Model> Models { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<CarPurchase> Purchases { get; set; }

        public DbSet<Address> Addresses { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            if (!builder.IsConfigured)
            {
                builder.UseSqlServer(DataSettings.DefaultConnecton);
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .ApplyConfiguration(new MakeConfiguration());


            builder
                .ApplyConfiguration(new CarConfiguration());


            builder.Entity<CarPurchase>(purchase =>
            {
                purchase.HasKey(p => new {p.CustomerId, p.CarId});

                purchase
                    .HasOne(p => p.Customer)
                    .WithMany(c => c.Purchases)
                    .HasForeignKey(p => p.CustomerId)
                    .OnDelete(DeleteBehavior.Restrict);

                purchase
                    .HasOne(p => p.Car)
                    .WithMany(c => c.Owners)
                    .HasForeignKey(p => p.CarId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            builder.Entity<Customer>(customer =>
            {
                customer
                    .HasOne(c => c.Address)
                    .WithOne(a => a.Customer)
                    .HasForeignKey<Address>(a => a.CustomerId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
