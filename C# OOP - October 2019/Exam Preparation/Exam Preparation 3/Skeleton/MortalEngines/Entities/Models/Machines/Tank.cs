using System;
using System.Collections.Generic;
using System.Text;
using MortalEngines.Entities.Contracts;

namespace MortalEngines.Entities.Models.Machines
{
    public class Tank : BaseMachine, ITank
    {
        private const int InitialHealthPoints = 100;
        public Tank(string name, double attackPoints, double defensePoints)
            : base(name, attackPoints - 40, defensePoints + 30, InitialHealthPoints)
        {
            DefenseMode = true;
        }

        public bool DefenseMode { get; private set; }
        public void ToggleDefenseMode()
        {
            if (DefenseMode == false)
            {
                this.DefenseMode = true;
                this.AttackPoints -= 40;
                this.DefensePoints += 30;
            }
            else
            {
                this.DefenseMode = false;
                this.AttackPoints += 40;
                this.DefensePoints -= 30;
            }
        }

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendLine(base.ToString());
            sb.AppendLine($" *Defense: {(this.DefenseMode == true ? "ON" : "OFF")}");

            return sb.ToString().TrimEnd();
        }
    }
}
