﻿using Microsoft.AspNetCore.Mvc;

namespace BoardGames.Controllers
{
    public class HomeController : Controller
    {
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }
    }
}