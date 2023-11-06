using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BookStoreService.Tests
{
    public class BookServiceTests
    {
        public BookDbContext _dbContext;

        public BookServiceTests()
        {

            DbContextOptions<BookDbContext> options = new DbContextOptionsBuilder<BookDbContext>()
                .UseInMemoryDatabase("BookServiceTests")
                .Options;
            _dbContext = new BookDbContext(options);

        }

        [Fact]
        public void Test1()
        {

        }
    }
}