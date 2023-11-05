using user_service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace user_service.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {

        private readonly ILogger<BookController> _logger;
        private readonly IBookService _bookService;

        public BookController(ILogger<BookController> logger, IBookService bookService)
        {
            _logger = logger;
            _bookService = bookService;
        }

        [HttpPost]
        [Route("")]
        public void AddBook(Book book)
        {
            var response =_bookService.CreateBookEntry(book);
        }

        
        [HttpGet]
        [Route("")]
        public IEnumerable<BookEntity> GetBooks()
        {
            return _bookService.GetAllBooks();
        }

        [HttpGet]
        [Route("GetBooksByTitleOrAuthor")]
        public IEnumerable<BookEntity> GetBooksByTitleOrAuthor(string? title, string? author)
        {
            return _bookService.GetBooksByTitleOrAuthor(title, author);
        }
        
        [HttpPut]
        [Route("{bookId}")]
        public void UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            _bookService.UpdateBook(bookId, updatedBook);
        }

        [HttpDelete]
        [Route("{bookId}")]
        public void DeleteBook(int bookId)
        {
            _bookService.DeleteBook(bookId);
        }
    }
}