using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using AnimalCentre.Models.Contracts;

namespace AnimalCentre.Core.AnimalFactory
{
    public class AnimalFactory : IAnimalFactory
    {
        public IAnimal CreateAnimal(string type, string name, int energy, int happiness, int procedureTime)
        {
            var animalType = Assembly
                .GetCallingAssembly()
                .GetTypes()
                .FirstOrDefault(x => x.Name == type);

            var animal = (IAnimal) Activator.CreateInstance(animalType, name, energy, happiness, procedureTime);

            return animal;
        }
    }
}
