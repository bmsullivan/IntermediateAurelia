using System.Collections.Generic;
using System.Linq;
using BoardGames.Models;
using Microsoft.AspNetCore.Mvc;

namespace BoardGames.Controllers
{
    [Route("api/[controller]")]
    public class BoardGamesController : Controller
    {
        private readonly BoardGamesDbContext _context;

        public BoardGamesController(BoardGamesDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<BoardGame> Get()
        {
            return _context.BoardGames.ToList();
        }
    }
}