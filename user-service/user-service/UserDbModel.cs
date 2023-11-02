using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

public class UserContext : DbContext
{
    public DbSet<UserEntity> Users { get; set; }

    public string DbPath { get; }

    public UserContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "users.db");
    }

    // The following configures EF to create a Sqlite database file in the
    // special "local" folder for your platform.
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}

public class UserEntity
{
    public int UserEntityId { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}