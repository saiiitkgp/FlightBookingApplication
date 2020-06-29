using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace FlightDup.Models
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

        public virtual DbSet<FlightDetails> FlightDetails { get; set; }
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
            modelBuilder.Entity<FlightDetails>(entity =>
            {
                entity.HasKey(e => e.FlightNumber)
                    .HasName("PK__FlightDe__2EAE6F51909D2FDC");

                entity.Property(e => e.FlightDestination)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FlightSource)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TicketDetails)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<FlightUsers>(entity =>
            {
                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
