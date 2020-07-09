namespace P01_StudentSystem.Data.EntityConfiguration
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using Models;
    public class CourseConfiguration : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.HasKey(c => c.CourseId);

            builder
                .Property(c => c.Name)
                .IsRequired()
                .IsUnicode()
                .HasMaxLength(80);

            builder
                .Property(c => c.Description)
                .IsRequired()
                .IsUnicode();

            builder
                .Property(c => c.StartDate)
                .IsRequired();

            builder
                .Property(c => c.EndDate)
                .IsRequired();

            builder
                .Property(c => c.Price)
                .IsRequired();
        }
    }
}
