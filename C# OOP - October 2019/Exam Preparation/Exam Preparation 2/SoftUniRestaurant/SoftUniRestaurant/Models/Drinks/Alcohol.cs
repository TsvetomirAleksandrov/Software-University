using System;
using System.Collections.Generic;
using System.Text;

namespace SoftUniRestaurant.Models.Drinks
{
    public class Alcohol : Drink
    {
        private const decimal AlcoholPrice = 3.5m;
        public Alcohol(string name, int servingSize, string brand) : base(name, servingSize, AlcoholPrice, brand)
        {
        }
    }
}
