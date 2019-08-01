using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Extract_Emails
{
    class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            string pattern = @"^n:(?<animalname>[^;]+);t:(?<animalkind>[^;]+);c--(?<animalcountry>[A-Za-z\s]+)$";
            Regex regex = new Regex(pattern);
            int weight = 0;
            for (int i = 0; i < n; i++)
            {
                string line = Console.ReadLine();
                Match match = regex.Match(line);
                if (match.Success)
                {
                    string animalName = match.Groups["animalname"].Value;
                    string animalKind = match.Groups["animalkind"].Value;
                    string animalCountry = match.Groups["animalcountry"].Value;
                    string newAnimalName = string.Empty;
                    string newAnimalKind = string.Empty;
                    for (int j = 0; j < animalName.Length; j++)
                    {
                        char animalNameChar = animalName[j];
                        if (char.IsLetter(animalNameChar) || animalNameChar == ' ')
                        {
                            newAnimalName += animalNameChar;
                        }

                        if (char.IsDigit(animalNameChar))
                        {
                            weight += int.Parse(animalNameChar.ToString());
                        }
                    }

                    for (int j = 0; j < animalKind.Length; j++)
                    {
                        char animalKindChar = animalKind[j];
                        if (char.IsLetter(animalKindChar) || animalKindChar == ' ')
                        {
                            newAnimalKind += animalKindChar;
                        }

                        if (char.IsDigit(animalKindChar))
                        {
                            weight += int.Parse(animalKindChar.ToString());
                        }
                    }

                    Console.WriteLine($"{newAnimalName} is a {newAnimalKind} from {animalCountry}");
                }
            }

            Console.WriteLine($"Total weight of animals: {weight}KG");
        }
    }
}