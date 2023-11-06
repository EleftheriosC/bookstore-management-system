namespace user_service.Services
{
    public class BookService : IBookService
    {
        private readonly BookDbContext _bookContext = new();
        private readonly ILogger<BookService> _logger;

        public BookService(ILogger<BookService> logger)
        {
            _logger = logger;
        }

        public async Task CreateBookEntry(Book book)
        {
            _logger.LogInformation("Attempting to add new book entry");

            await _bookContext.AddAsync(new BookEntity
            {
                Title = book.Title,
                Author = book.Author,
                PublicationYear = book.PublicationYear,
                ISBN = book.ISBN
            });
            await _bookContext.SaveChangesAsync();
            _logger.LogInformation($"Book added");
        }

        public IEnumerable<BookEntity> GetAllBooks()
        {
            _logger.LogInformation("Retrieving all books");

            return _bookContext.Books.OrderBy(b => b.BookEntityId);
        }

        public IEnumerable<BookEntity> GetBooksByTitleOrAuthor(string? title, string? author)
        {
            _logger.LogInformation($"Retrieving books with title {title} and author {author}");

            var query = _bookContext.Books.AsQueryable();
            var books = new List<BookEntity>();

            if (!string.IsNullOrEmpty(title) && !string.IsNullOrEmpty(author))
            {
                query = query.Where(b => b.Title.ToLower().Contains(title.ToLower()) && b.Author.ToLower().Contains(author.ToLower()));
            }
            else if (!string.IsNullOrEmpty(title))
            {
                query = query.Where(b => b.Title.ToLower().Contains(title.ToLower()));
            }
            else if (!string.IsNullOrEmpty(author))
            {
                query = query.Where(b => b.Author.ToLower().Contains(author.ToLower()));
            }
            else
            {
                books = _bookContext.Books.OrderBy(b => b.BookEntityId).ToList();
            }

            return books;
        }

        public async Task UpdateBook(int bookId, Book updatedBook)
        {
            _logger.LogInformation($"Attempting to update book with Id {bookId}");

            var book = _bookContext.Books.Find(bookId);
            if (book is not null)
            {
                book.Title = updatedBook.Title == "" ? book.Title : updatedBook.Title;
                book.Author = updatedBook.Author == "" ? book.Author : updatedBook.Author;
                book.PublicationYear = (int)(updatedBook.PublicationYear > 0 ? updatedBook.PublicationYear : book.PublicationYear);
                book.ISBN = updatedBook.ISBN == "" ? book.ISBN : updatedBook.ISBN;
                await _bookContext.SaveChangesAsync();
                _logger.LogInformation($"Book with Id {bookId} updated");
            }
            else
            {
                _logger.LogError($"Book with id {bookId} not found");
                throw new ArgumentException($"Book with id {bookId} not found");
            }
        }

        public async Task DeleteBook(int bookId)
        {
            _logger.LogInformation($"Attempting to delete book with Id {bookId}");

            var book = _bookContext.Books.Find(bookId);
            if (book is not null)
            {
                _bookContext.Remove(book);
                await _bookContext.SaveChangesAsync();
                _logger.LogInformation($"Book with Id {bookId} deleted");

            }
            else
            {
                _logger.LogError($"Book with id {bookId} not found");
                throw new ArgumentException($"Book with id {bookId} not found");
            }
        }

    }
}
