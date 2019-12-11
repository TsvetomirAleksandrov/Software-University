using System;
using System.Collections.Generic;
using System.Text;

namespace Heroes
{
    public class Item
    {
        private int strength;
        private int ability;
        private int intelligence;

        public Item(int strength, int ability, int intelligence)
        {
            Strength = strength;
            Ability = ability;
            Intelligence = intelligence;
        }


        public int Strength { get; set; }
        public int Ability { get; set; }
        public int Intelligence { get; set; }

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendLine("Item:");
            sb.AppendLine($"  * Strength: {this.Strength}");
            sb.AppendLine($"  * Ability: {this.Ability}");
            sb.AppendLine($"  * Intelligence: {this.Intelligence}");

            return sb.ToString().TrimEnd();
        }
    }
}
