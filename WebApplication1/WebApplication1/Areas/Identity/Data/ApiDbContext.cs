using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Areas.Identity.Data
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options)
         : base(options)
        {
        }
        public DbSet<CategoryType> CategoryType { get; set; }
        public DbSet<ContentType> ContentType { get; set; }
        public DbSet<ContentTypeDetail> contentTypeDetail { get; set; }
        public DbSet<Issue> Issue { get; set; }
        public DbSet<IssueType> IssueType { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<ProjectMember> ProjectMember { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Sprint> Sprint { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ContentTypeDetail>()
                .HasIndex(x => new {x.ContentTypeId,x.ProjectId })
                .IsUnique();
            builder.Entity<IssueType>()
                .HasKey(x =>new {x.ContentTypeDetailId,x.IssueId })
                .IsClustered();
            builder.Entity<UserRole>()
                .HasKey(x => new { x.RoleId, x.UserId })
                .IsClustered();
            builder.Entity<ProjectMember>()
                .HasKey(x => new { x.UserId, x.ProjectId })
                .IsClustered();
            builder.Entity<Issue>()
                .HasOne(x => x.Assignee)
                .WithMany().OnDelete(DeleteBehavior.NoAction)
                .HasForeignKey(x => x.AssigneeId);
            builder.Entity<Issue>()
                .HasOne(x => x.UserCreated)
                .WithMany().OnDelete(DeleteBehavior.NoAction)
                .HasForeignKey(x => x.UserCreatedId);

            builder.Entity<Issue>()
                .HasOne(x => x.Project)
                .WithMany().OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey(x => x.ProjectId);

            builder.Entity<ProjectMember>()
                .HasOne(x => x.User).WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<IssueType>()
                .HasOne(x => x.Issue)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
