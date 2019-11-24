namespace AnimalCentre.Models.Contracts
{
    using System.Collections.Generic;
    public interface IHotel
    {
        IReadOnlyDictionary<string, IAnimal> Animals { get; }

        void Accomodate(IAnimal animal);

        void Adopt(string animalName, string owner);
    }
}
