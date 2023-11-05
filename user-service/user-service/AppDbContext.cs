using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace user_service;

    public class AppDbContext : IdentityDbContext<UserIdentity>
    {
    public string DbPath { get; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = Path.Join(path, "usersIdentity.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    => options.UseSqlite($"Data Source={DbPath}");
}
