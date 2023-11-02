using Microsoft.AspNetCore.Mvc;

namespace book_service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {

        private readonly ILogger<BookController> _logger;
        private readonly BookContext _bookContext = new BookContext();

        public BookController(ILogger<BookController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "AddBook")]
        public void AddBook(Book book)
        {

            _bookContext.Add(new BookEntity
           {
               Title = book.Title,
               Author = book.Author,
               PublicationYear = book.PublicationYear,
               ISBN = book.ISBN
           });
            _bookContext.SaveChanges();
        }

        [HttpGet(Name = "GetBooks")]
        public IEnumerable<BookEntity> GetBooks()
        {
            return (IEnumerable<BookEntity>)_bookContext.Books.OrderBy(b => b.BookEntityId);

        }

        [HttpPut(Name = "UpdateBook")]
        public void UpdateBook(int bookId, string? title, string? author, int? publicationYear, string? isbn)
        {
            var book = _bookContext.Books.Find(bookId);
            if (book is not null)
            {
                book.Title = title is not null ? title : book.Title;
                book.Author = author is not null ? author : book.Author;
                book.PublicationYear = (int)(publicationYear is not null ? publicationYear : book.PublicationYear);
                book.ISBN = isbn is not null ? isbn : book.ISBN;
                _bookContext.SaveChanges();
            }
        }

        [HttpDelete(Name = "DeleteBook")]
        public void DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);
            if ( book is not null) {
                _bookContext.Remove(book);
                _bookContext.SaveChanges();
            }
        }
    }
}