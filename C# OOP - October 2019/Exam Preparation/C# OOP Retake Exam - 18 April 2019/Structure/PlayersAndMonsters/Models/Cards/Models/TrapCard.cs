using System;
using System.Collections.Generic;
using System.Text;
using PlayersAndMonsters.Models.Cards.Contracts;

namespace PlayersAndMonsters.Models.Cards.Models
{
    public class TrapCard : Card
    {
        private const int InitialDamagePoints = 120;
        private const int InitialHealthPoints = 5;

        public TrapCard(string name)
            : base(name, InitialDamagePoints, InitialHealthPoints)
        {
        }
    }
}
