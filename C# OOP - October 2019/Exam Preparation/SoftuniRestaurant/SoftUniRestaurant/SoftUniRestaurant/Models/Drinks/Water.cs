using System;
using System.Collections.Generic;
using System.Text;

namespace SoftUniRestaurant.Models.Drinks
{
    public class Water : Drink
    {
        private const decimal WaterPrice = 1.5m;
        public Water(string name, int servingSize, string brand) : base(name, servingSize, WaterPrice, brand)
        {
        }
    }
}
