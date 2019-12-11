using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Heroes
{
    public class HeroRepository
    {
        private readonly List<Hero> heroList;

        public HeroRepository()
        {
            heroList = new List<Hero>();
        }

        public void Add(Hero hero)
        {
            heroList.Add(hero);
        }

        public void Remove(string name)
        {
            foreach (var hero in heroList)
            {
                if (hero.Name == name) 
                {
                    heroList.Remove(hero);
                }
            }
        }

        public Hero GetHeroWithHighestStrength()
        {
            var highestStrength =
                this.heroList
                    .OrderByDescending(x => x.Item.Strength)
                    .First();

            return highestStrength;
        }

        public Hero GetHeroWithHighestAbility()
        {
            var highestAbility =
                this.heroList
                    .OrderByDescending(x => x.Item.Ability)
                    .First();

            return highestAbility;
        }

        public Hero GetHeroWithHighestIntelligence()
        {
            var highestIntelligence =
                this.heroList
                    .OrderByDescending(x => x.Item.Intelligence)
                    .First();

            return highestIntelligence;
        }

        public int Count => this.heroList.Count;

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();

            if (heroList.Count >= 0)
            {
                foreach (var hero in heroList)
                {
                    sb.AppendLine($"{hero}");
                }
            }

            return sb.ToString().TrimEnd();
        }
    }
}
