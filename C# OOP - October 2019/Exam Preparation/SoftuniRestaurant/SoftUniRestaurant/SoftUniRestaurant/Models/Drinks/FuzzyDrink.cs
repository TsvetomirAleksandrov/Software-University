using System;
using System.Collections.Generic;
using System.Text;

namespace SoftUniRestaurant.Models.Drinks
{
   public class FuzzyDrink : Drink
   {
       private const decimal FuzzyDrinkPrice = 2.5m;
        public FuzzyDrink(string name, int servingSize, string brand) : base(name, servingSize, FuzzyDrinkPrice, brand)
        {
        }
    }
}
