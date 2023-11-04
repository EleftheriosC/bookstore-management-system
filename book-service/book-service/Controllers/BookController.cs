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

        [HttpPost]
        [Route("")]
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

        
        [HttpGet]
        [Route("")]
        public IEnumerable<BookEntity> GetBooks()
        {
            return (IEnumerable<BookEntity>)_bookContext.Books.OrderBy(b => b.BookEntityId);

        }

        [HttpGet]
        [Route("GetBooksByTitleOrAuthor")]
        public IEnumerable<BookEntity> GetBooksByTitleOrAuthor(string? title, string? author)
        {
            //Make case invariant
            //Fix slection issue
            var books = _bookContext.Books
                .Where(b => b.Title.Contains(title))
                .Where(b => b.Author.Contains(author));

            return books;

        }
        
        [HttpPut]
        [Route("{bookId}")]
        public void UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var book = _bookContext.Books.Find(bookId);
            if (book is not null)
            {
                book.Title = updatedBook.Title is not null ? updatedBook.Title : book.Title;
                book.Author = updatedBook.Author is not null ? updatedBook.Author : book.Author;
                book.PublicationYear = (int)(updatedBook.PublicationYear > 0 ? updatedBook.PublicationYear : book.PublicationYear);
                book.ISBN = updatedBook.ISBN is not null ? updatedBook.ISBN : book.ISBN;
                _bookContext.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("{bookId}")]
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