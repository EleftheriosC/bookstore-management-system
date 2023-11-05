namespace user_service.Services
{
    public class BookService : IBookService
    {
        private readonly BookDbContext _bookContext = new();

        public async Task CreateBookEntry(Book book)
        {
            await _bookContext.AddAsync(new BookEntity
            {
                Title = book.Title,
                Author = book.Author,
                PublicationYear = book.PublicationYear,
                ISBN = book.ISBN
            });
            await _bookContext.SaveChangesAsync();
        }

        public IEnumerable<BookEntity> GetAllBooks()
        {
            return _bookContext.Books.OrderBy(b => b.BookEntityId);
        }

        public IEnumerable<BookEntity> GetBooksByTitleOrAuthor(string? title, string? author)
        {
            var query = _bookContext.Books.AsQueryable();
            var books = new List<BookEntity>();
            if (string.IsNullOrEmpty(title) || string.IsNullOrEmpty(author)) {
            if (!string.IsNullOrEmpty(title))
            {
                query = query.Where(b => b.Title.ToLower().Contains(title.ToLower()));
            }

            if (!string.IsNullOrEmpty(author))
            {
                query = query.Where(b => b.Author.ToLower().Contains(author.ToLower()));
            }

            books = query.ToList();
            
            } else
            {
               books = _bookContext.Books.OrderBy(b => b.BookEntityId).ToList();
            }


            return books;
        }

        public async Task UpdateBook(int bookId, Book updatedBook)
        {
            var book = _bookContext.Books.Find(bookId);
            if (book is not null)
            {
                book.Title = updatedBook.Title == "" ? book.Title : updatedBook.Title;
                book.Author = updatedBook.Author == "" ? book.Author : updatedBook.Author;
                book.PublicationYear = (int)(updatedBook.PublicationYear > 0 ? updatedBook.PublicationYear : book.PublicationYear);
                book.ISBN = updatedBook.ISBN == "" ? book.ISBN : updatedBook.ISBN;
                await _bookContext.SaveChangesAsync();
            }
        }

        public async Task DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);
            if (book is not null)
            {
                _bookContext.Remove(book);
                await _bookContext.SaveChangesAsync();
            }
        }

    }
}
