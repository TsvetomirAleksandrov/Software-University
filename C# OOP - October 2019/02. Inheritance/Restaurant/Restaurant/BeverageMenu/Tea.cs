using System;
using System.Collections.Generic;
using System.Text;

namespace Restaurant.BeverageMenu
{
    public class Tea : HotBeverage
    {
        public Tea(string name, decimal price, double milliliters)
             : base(name, price, milliliters)
        {
        }
    }
}