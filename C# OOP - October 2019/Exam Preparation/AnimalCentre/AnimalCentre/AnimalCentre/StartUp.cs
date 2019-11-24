using System;
using AnimalCentre.Core;
using AnimalCentre.Core.Contracts;

namespace AnimalCentre
{
    class StartUp
    {
        static void Main(string[] args)
        {
            IEngine engine = new Engine();
            engine.Run();
        }
    }
}
