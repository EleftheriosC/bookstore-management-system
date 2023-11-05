namespace user_service.Services
{
    public interface IBookService
    {

        public void CreateBookEntry(Book book);

        public IEnumerable<BookEntity> GetAllBooks();

        public IEnumerable<BookEntity> GetBooksByTitleOrAuthor(string? title, string? author);

        public void UpdateBook(int bookId, Book updatedBook);

        public void DeleteBook(int bookId);

    }
}
