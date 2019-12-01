using System;
using System.Collections.Generic;
using System.Text;
using MortalEngines.Entities.Contracts;

namespace MortalEngines.Entities.Models.Machines
{
    public class Fighter : BaseMachine, IFighter
    {
        private const int InitialHealthPoints = 200;
        public Fighter(string name, double attackPoints, double defensePoints) 
            : base(name, attackPoints + 50, defensePoints - 25, InitialHealthPoints)
        {
            this.AggressiveMode = true;
        }

        public bool AggressiveMode { get; private set; }
        public void ToggleAggressiveMode()
        {
            if (this.AggressiveMode == false)
            {
                this.AggressiveMode = true;
                this.AttackPoints += 50;
                this.DefensePoints -= 25;
            }
            else
            {
                this.AggressiveMode = false;
                this.AttackPoints -= 50;
                this.DefensePoints += 25;
            }
        }

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendLine(base.ToString());
            sb.AppendLine($" *Aggressive: {(this.AggressiveMode == true ? "ON" : "OFF")}");

            return sb.ToString().TrimEnd();

        }
    }
}
