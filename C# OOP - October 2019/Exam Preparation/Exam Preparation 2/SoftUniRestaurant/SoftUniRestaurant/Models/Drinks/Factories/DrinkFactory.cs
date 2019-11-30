using System.Linq;
using System.Reflection;
using SoftUniRestaurant.Models.Drinks.Contracts;


namespace SoftUniRestaurant.Models.Drinks.Factories
{
   public class DrinkFactory
   {
       public IDrink CreateDrink(string type, string name, int servingSize, string brand)
       {
           return (IDrink)Assembly.GetCallingAssembly()
               .GetTypes()
               .FirstOrDefault(x => x.Name == type)
               .GetConstructors()
               .FirstOrDefault()
               .Invoke(new object[] {name, servingSize, brand});
       }
    }
}
