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
		public DbSet<ContentTypeDetail> ContentTypeDetail { get; set; }
		public DbSet<Issue> Issue { get; set; }
		public DbSet<Project> Project { get; set; }
		public DbSet<ProjectMember> ProjectMember { get; set; }
		public DbSet<Role> Role { get; set; }
		public DbSet<Sprint> Sprint { get; set; }
		public DbSet<User> User { get; set; }
		public DbSet<UserRole> UserRole { get; set; }
		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			builder.Entity<Role>()
				.HasIndex(x => x.Name)
				.IsUnique();

			builder.Entity<Role>()
				.Property(x => x.Id)
				.HasDefaultValueSql("(newid())");

			builder.Entity<User>()
				.HasIndex(x => x.UserName)
				.IsUnique();

			builder.Entity<User>()
				.Property(x => x.Id)
				.HasDefaultValueSql("(newid())");

			builder.Entity<UserRole>()
				.Property(x => x.Id)
				.HasDefaultValueSql("(newid())");

			builder.Entity<Sprint>()
				.Property(x => x.Id)
				.HasDefaultValueSql("(newid())");

			builder.Entity<Project>()
				.Property(x => x.Id)
				.HasDefaultValueSql("(newid())");

			builder.Entity<Issue>()
				.Property(x => x.Id)
				.HasDefaultValueSql("(newid())");

			builder.Entity<ProjectMember>()
				.Property(x => x.Id)
				.HasDefaultValueSql("(newid())");

			builder.Entity<ContentType>()
				.Property(x => x.Id)
				.HasDefaultValueSql("(newid())");

			builder.Entity<ProjectMember>()
				.Property(x => x.Id)
				.HasDefaultValueSql("(newid())");


			builder.Entity<ContentTypeDetail>()
				.Property(x => x.Id)
				.HasDefaultValueSql("(newid())");


			builder.Entity<CategoryType>()
				.Property(x => x.Id)
				.HasDefaultValueSql("(newid())");

			builder.Entity<Project>()
				.Property(x => x.CreatedAt)
				.HasDefaultValueSql("(getdate())");

			builder.Entity<Project>()
				.Property(x => x.UpdatedAt)
				.HasDefaultValueSql("(getdate())");

			builder.Entity<Issue>()
				.Property(x => x.CreatedAt)
				.HasDefaultValueSql("(getdate())");

			builder.Entity<Issue>()
				.Property(x => x.UpdatedAt)
				.HasDefaultValueSql("(getdate())");


			builder.Entity<ContentTypeDetail>()
				.HasIndex(x => new { x.ContentTypeId, x.ProjectId })
				.IsUnique();

			builder.Entity<UserRole>()
				.HasIndex(x => new { x.RoleId, x.UserId })
				.IsUnique();

			builder.Entity<ProjectMember>()
				.HasIndex(x => new { x.UserRoleId, x.ProjectId })
				.IsUnique();

			builder.Entity<Issue>()
				.HasOne(x => x.Assignee)
				.WithMany().OnDelete(DeleteBehavior.NoAction)
				.HasForeignKey(x => x.AssigneeId);

			builder.Entity<Issue>()
				.HasOne(x => x.Assignee)
				.WithMany().OnDelete(DeleteBehavior.NoAction)
				.HasForeignKey(x => x.UserCreatedId);

			builder.Entity<Issue>()
				.HasOne(x => x.Project)
				.WithMany().OnDelete(DeleteBehavior.Cascade)
				.HasForeignKey(x => x.ProjectId);

			builder.Entity<ProjectMember>()
				.HasOne(x => x.UserRole).WithMany()
				.OnDelete(DeleteBehavior.NoAction);

			builder.Entity<IssueType>()
				.HasIndex(x => new { x.IssueId, x.ContentTypeDetailId }).IsUnique();

			builder.Entity<IssueType>()
				.HasOne(x => x.ContentTypeDetail).WithMany()
				.OnDelete(DeleteBehavior.NoAction);

			// Customize the ASP.NET Identity model and override the defaults if needed.
			// For example, you can rename the ASP.NET Identity table names and more.
			// Add your customizations after calling base.OnModelCreating(builder);
		}
	}
}
