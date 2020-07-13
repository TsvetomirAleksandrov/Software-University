using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using P01_HospitalDatabase.Data.EntityConfiguration;
using P01_HospitalDatabase.Data.Models;
using P01_HospitalDatabase.Data;

namespace P01_HospitalDatabase.Data
{
    public class HospitalDbContext : DbContext
    {
        public HospitalDbContext()
        {
            
        }

        public HospitalDbContext(DbContextOptions options)
        : base(options)
        {
            
        }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<Visitation> Visitations { get; set; }

        public DbSet<Diagnose> Diagnoses { get; set; }

        public DbSet<Medicament> Medicaments { get; set; }

        public DbSet<PatientMedicament> PatientsMedicaments { get; set; }

        public DbSet<Doctor> Doctors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Configuration.ConnectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new PatientConfiguration());

            builder.ApplyConfiguration(new VisitationConfiguration());

            builder.ApplyConfiguration(new DiagnoseConfiguration());

            builder.ApplyConfiguration(new MedicamentConfiguration());

            builder.ApplyConfiguration(new PatientMedicamentConfiguration());

            builder.ApplyConfiguration(new DoctorConfiguration());
        }
    }
}
