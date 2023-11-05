using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

public class BookDbContext : DbContext
{
    public DbSet<BookEntity> Books { get; set; }

    public string DbPath { get; }

    public BookDbContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "books.db");
    }

    // The following configures EF to create a Sqlite database file in the
    // special "local" folder for your platform.
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}

public class BookEntity
{
    public int BookEntityId { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }

    public int PublicationYear { get; set; }
    public string ISBN { get; set; }
}