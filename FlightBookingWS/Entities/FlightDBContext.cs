using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace FlightDup.Entities
{
    public partial class FlightDBContext : DbContext
    {
        public FlightDBContext()
        {
        }

        public FlightDBContext(DbContextOptions<FlightDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<FlightAvailabilityDates> FlightAvailabilityDates { get; set; }
        public virtual DbSet<FlightDetails> FlightDetails { get; set; }
        public virtual DbSet<FlightTicketDetails> FlightTicketDetails { get; set; }
        public virtual DbSet<FlightUsers> FlightUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var builder = new ConfigurationBuilder().
                    SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
                var configuration = builder.Build();
                optionsBuilder.UseSqlServer(configuration["ConnectionStrings:DefaultConnection"]);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FlightAvailabilityDates>(entity =>
            {
                entity.HasKey(e => e.FlightAvailabilityId)
                    .HasName("PK__FlightAv__B7B5CDD2499E1E2E");

                entity.Property(e => e.FlightAvailabilityDate)
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<FlightDetails>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.FlightCostBusiness)
                    .HasColumnName("FLightCostBusiness")
                    .HasColumnType("decimal(18, 0)");

                entity.Property(e => e.FlightCostEconomy).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.FlightDestination)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FlightNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FlightSource)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.FlightAvailability)
                    .WithMany()
                    .HasForeignKey(d => d.FlightAvailabilityId)
                    .HasConstraintName("FK__FlightDet__Fligh__2E1BDC42");
            });

            modelBuilder.Entity<FlightTicketDetails>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.FlightClassType)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.FlightDestination)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FlightNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.FlightSource)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PassengerName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TicketNumber)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.TravelDate)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<FlightUsers>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("PK__FlightUs__536C85E5EB4C062F");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DateOfBirth)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
