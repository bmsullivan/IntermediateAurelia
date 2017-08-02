using System.Collections.Generic;
using System.Linq;
using BoardGames.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("{id}")]
        public BoardGame Get(int id)
        {
            return _context.BoardGames.Find(id);
        }

        [HttpPut]
        public BoardGame Put([FromBody] BoardGame boardGame)
        {
            _context.BoardGames.Attach(boardGame).State = EntityState.Modified;
            _context.SaveChanges();
            return boardGame;
        }
    }
}