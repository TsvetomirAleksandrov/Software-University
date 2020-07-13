using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using P01_HospitalDatabase.Data.Models;

namespace P01_HospitalDatabase.Data.EntityConfiguration
{
    public class DiagnoseConfiguration : IEntityTypeConfiguration<Diagnose>
    {
        public void Configure(EntityTypeBuilder<Diagnose> builder)
        {
            builder.HasKey(d => d.DiagnoseId);

            builder
                .Property(d => d.Name)
                .IsUnicode();

            builder
                .Property(d => d.Comments)
                .IsUnicode();

            builder
                .HasOne(d => d.Patient)
                .WithMany(p => p.Diagnoses)
                .HasForeignKey(d => d.PatientId);
        }
    }
}
