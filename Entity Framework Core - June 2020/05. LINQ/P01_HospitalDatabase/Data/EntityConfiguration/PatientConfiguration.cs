using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using P01_HospitalDatabase.Data.Models;

namespace P01_HospitalDatabase.Data.EntityConfiguration
{
    public class PatientConfiguration : IEntityTypeConfiguration<Patient>
    {
        public void Configure(EntityTypeBuilder<Patient> builder)
        {
            builder.HasKey(p => p.PatientId);

            builder
                .Property(p => p.FirstName)
                .IsUnicode();

            builder
                .Property(p => p.LastName)
                .IsUnicode();

            builder
                .Property(p => p.Address)
                .IsUnicode();

            builder
                .Property(p => p.Email)
                .IsUnicode(false);

            builder
                .Property(p => p.HasInsurance)
                .HasDefaultValue(true);
        }
    }
}
