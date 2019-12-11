using System;
using System.Collections.Generic;
using System.Text;

namespace Heroes
{
    public class Hero
    {
        private string name;
        private int level;
        private Item item;

        public Hero(string name, int level, Item item)
        {
            Name = name;
            Level = level;
            Item = item;
        }

        public string Name { get; set; }
        public int Level { get; set; }
        public Item Item { get; set; }

        public override string ToString()
        {

            StringBuilder sb = new StringBuilder();

            sb.AppendLine($"Hero: {this.Name} – {this.Level}lvl");
            sb.AppendLine($"{Item}");

            return sb.ToString().TrimEnd();
        }
    }
}
