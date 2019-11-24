using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AnimalCentre.Core.Contracts;

namespace AnimalCentre.Core
{
    public class Engine : IEngine
    {
        private AnimalCentre animalCentre;

        public Engine()
        {
            this.animalCentre = new AnimalCentre();
        }


        public void Run()
        {
            string input = Console.ReadLine();

            while (input != "End")
            {
                try
                {
                    string[] inputArgs = input
                        .Split(new char[] {' '}, StringSplitOptions.RemoveEmptyEntries);

                    string command = inputArgs[0];
                    string[] args = inputArgs.Skip(1).ToArray();

                    string result = ReadCommand(command, args);

                }
                catch (InvalidOperationException iox)
                {
                    Console.WriteLine("InvalidOperationException: " + iox.Message);
                }
                catch (ArgumentException ax)
                {
                    Console.WriteLine("ArgumentException: " + ax.Message);
                }

                input = Console.ReadLine();
            }

            string adoptedAnimals = this.animalCentre.AllAdoptedAnimals();
            Console.WriteLine(adoptedAnimals);

        }

        private string ReadCommand(string command, string[] args)
        {
            string result = string.Empty;
            string name = string.Empty;
            int procedureTime = 0;


            switch (command)
            {
                case "RegisterAnimal":
                    string type = args[0];
                    name = args[1];
                    int energy = int.Parse(args[2]);
                    int happiness = int.Parse(args[3]);
                    procedureTime = int.Parse(args[4]);

                    result = this.animalCentre.RegisterAnimal(type, name, energy, happiness, procedureTime);
                    
                    break;
                case "Chip":
                    name = args[0];
                    procedureTime = int.Parse(args[1]);

                    result = this.animalCentre.Chip(name, procedureTime);
                    break;
                case "Vaccinate":
                    name = args[0];
                    procedureTime = int.Parse(args[1]);

                    result = this.animalCentre.Vaccinate(name, procedureTime);
                    break;
                case "Fitness":
                    name = args[0];
                    procedureTime = int.Parse(args[1]);

                    result = this.animalCentre.Fitness(name, procedureTime);
                    break;
                case "Play":
                    name = args[0];
                    procedureTime = int.Parse(args[1]);

                    result = this.animalCentre.Play(name, procedureTime);
                    break;
                case "DentalCare":
                    name = args[0];
                    procedureTime = int.Parse(args[1]);

                    result = this.animalCentre.DentalCare(name, procedureTime);
                    break;
                case "NailTrim":
                    name = args[0];
                    procedureTime = int.Parse(args[1]);

                    result = this.animalCentre.NailTrim(name, procedureTime);
                    break;
                case "Adopt":
                    name = args[0];
                    string owner = args[1];

                    result = this.animalCentre.Adopt(name, owner);
                    break;
                case "History":
                    name = args[0];

                    result = this.animalCentre.History(name);
                    break;
            }

            return result;
        }
    }
}
