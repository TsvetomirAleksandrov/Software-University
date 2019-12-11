using System;
using System.Collections.Generic;
using System.Text;
using PlayersAndMonsters.Models.Players.Contracts;
using PlayersAndMonsters.Repositories.Contracts;

namespace PlayersAndMonsters.Models.Players.Models
{
    public class Advanced : Player
    {
        private const int InitialHealthPoints = 250;
        public Advanced(ICardRepository cardRepository, string username) 
            : base(cardRepository, username, InitialHealthPoints)
        {
        }
    }
}
