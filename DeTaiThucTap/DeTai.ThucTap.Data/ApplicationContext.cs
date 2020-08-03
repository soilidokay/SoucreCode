using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeTai.ThucTap.Data.CustomEntites;
using DeTai.ThucTap.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DeTai.ThucTap.Data
{
    public class ApplicationContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }
        public DbSet<Phrase> Phrases { get; set; }
        public DbSet<Pronuciation> Pronuciations { get; set; }
        public DbSet<Vocabulary> Vocabularies { get; set; }
        public DbSet<VocabularyCategory> VocabularyCategories { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
