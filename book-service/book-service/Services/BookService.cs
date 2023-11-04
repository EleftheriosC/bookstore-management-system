namespace book_service.Services
{
    public class BookService : IBookService
    {
        private readonly BookContext _bookContext = new();

        public void CreateBookEntry(Book book)
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

        public IEnumerable<BookEntity> GetAllBooks()
        {
            return (IEnumerable<BookEntity>)_bookContext.Books.OrderBy(b => b.BookEntityId);
        }

        public IEnumerable<BookEntity> GetBooksByTitleOrAuthor(string? title, string? author)
        {
            //Make case invariant
            //Fix slection issue
            var books = _bookContext.Books
                .Where(b => b.Title.ToLower().Contains(title.ToLower()))
                .Where(b => b.Author.ToLower().Contains(author.ToLower()));

            return books;
        }

        public void UpdateBook(int bookId, Book updatedBook)
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

        public void DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);
            if (book is not null)
            {
                _bookContext.Remove(book);
                _bookContext.SaveChanges();
            }
        }

    }
}
