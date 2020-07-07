using System;
using System.Collections.Generic;
using System.Text;
using Demo.Models;
using Microsoft.EntityFrameworkCore;

namespace Demo
{
    public class CatsDbContext : DbContext
    {

        public DbSet<Cat> Cats { get; set; }

        public DbSet<Owner> Owners { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer("Server=.\\SQLEXPRESS;Database=NewDb;Inntegrated Security = true;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Cat>()
                .HasOne(c => c.Owner)
                .WithMany(o => o.Cats)
                .HasForeignKey(c => c.OwnerId);
        }

    }
}
