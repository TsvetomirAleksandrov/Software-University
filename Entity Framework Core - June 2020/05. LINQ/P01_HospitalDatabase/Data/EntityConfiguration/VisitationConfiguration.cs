using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using P01_HospitalDatabase.Data.Models;

namespace P01_HospitalDatabase.Data.EntityConfiguration
{
    public class VisitationConfiguration : IEntityTypeConfiguration<Visitation>
    {
        public void Configure(EntityTypeBuilder<Visitation> builder)
        {
            builder.HasKey(v => v.VisitationId);

            builder
                .Property(v => v.Comments)
                .IsUnicode();

            builder
                .HasOne(v => v.Patient)
                .WithMany(p => p.Visitations)
                .HasForeignKey(v => v.PatientId);

            builder
                .Property(v => v.DoctorId)
                .IsRequired(false);

            builder
                .HasOne(v => v.Doctor)
                .WithMany(d => d.Visitations)
                .HasForeignKey(v => v.DoctorId);
        }
    }
}
