namespace user_service.Services
{
    public interface IBookService
    {

        public Task CreateBookEntry(Book book);

        public IEnumerable<BookEntity> GetAllBooks();

        public IEnumerable<BookEntity> GetBooksByTitleOrAuthor(string? title, string? author);

        public Task UpdateBook(int bookId, Book updatedBook);

        public Task DeleteBook(int bookId);

    }
}
