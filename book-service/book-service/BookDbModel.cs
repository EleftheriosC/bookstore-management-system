using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

public class BookContext : DbContext
{
    public DbSet<Book> Books { get; set; }

    public string DbPath { get; }

    public BookContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "book.db");
    }

    // The following configures EF to create a Sqlite database file in the
    // special "local" folder for your platform.
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}

public class Book
{
    public int BookId { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }

    public int PublicationYear { get; set; }
    public string ISBN { get; set; }
}