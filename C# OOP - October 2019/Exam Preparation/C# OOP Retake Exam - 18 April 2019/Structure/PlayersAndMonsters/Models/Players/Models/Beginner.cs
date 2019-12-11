using System;
using System.Collections.Generic;
using System.Text;
using PlayersAndMonsters.Models.Players.Contracts;
using PlayersAndMonsters.Repositories.Contracts;

namespace PlayersAndMonsters.Models.Players.Models
{
    public class Beginner : Player
    {
        private const int InitialHealthPoints = 50;
        public Beginner(ICardRepository cardRepository, string username) 
            : base(cardRepository, username, InitialHealthPoints)
        {
        }
    }
}