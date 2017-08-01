using Microsoft.EntityFrameworkCore;

namespace BoardGames.Models
{
    public class BoardGamesDbContext : DbContext
    {
        public BoardGamesDbContext(DbContextOptions<BoardGamesDbContext> options) : base(options)
        {
            
        }

        public DbSet<BoardGame> BoardGames { get; set; }
    }

    public class BoardGame
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SuggestedPlayers { get; set; }
    }
}