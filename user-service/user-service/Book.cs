namespace user_service
{
    public class Book
    {
        public Book(string title, string author, int publicationYear, string isbn)
        {
            Title = title;
            Author = author;
            PublicationYear = publicationYear;
            ISBN = isbn;
        }

        public string Title { get; set; }

        public string Author { get; set; }

        public int PublicationYear { get; set; }

        public string ISBN { get; set; }
    }
}