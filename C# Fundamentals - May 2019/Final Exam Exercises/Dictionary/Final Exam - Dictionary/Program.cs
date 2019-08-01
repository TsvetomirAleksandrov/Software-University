using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Final_Exam___Dictionary
{
    class Program
    {
        static void Main()
        {

            var dictionary = new Dictionary<string, List<string>>();
            bool containsWords = false;

            var pairs = Console.ReadLine().Split(" | ").ToArray();
            var wordsToCheck = Console.ReadLine().Split(" | ").ToArray();
            var command = Console.ReadLine();

            for (int i = 0; i < pairs.Length; i++)
            {
                string[] descriptions = pairs[i].Split(": ").ToArray();
                string word = descriptions[0];
                string wordDefinition = descriptions[1];

                if (!dictionary.ContainsKey(word))
                {
                    dictionary.Add(word, new List<string>());
                    dictionary[word].Add(wordDefinition);
                }
                else
                {
                    dictionary[word].Add(wordDefinition);
                }
            }

            for (int i = 0; i < dictionary.Count; i++)
            {
                for (int j = 0; j < wordsToCheck.Length; j++)
                {
                    var currentWord = wordsToCheck[j];
                    if (dictionary.ContainsKey(currentWord))
                    {
                        containsWords = true;
                        break;
                    }
                }
            }

            dictionary = dictionary
               .OrderBy(x => x.Key)
               .ToDictionary(x => x.Key, y => y.Value);

            if (command == "End")
            {
                if (containsWords == true)
                {
                    foreach (var kvp in dictionary)
                    {
                        Console.WriteLine($"{kvp.Key}");
                        foreach (var item in dictionary[kvp.Key])
                        {
                            Console.WriteLine($" -{item}");
                        }
                    }
                    //foreach (var kvp in dictionary.Keys)
                    //{
                    //    Console.WriteLine($"{kvp}");
                    //    foreach (var item in dictionary[kvp])
                    //    {
                    //        Console.WriteLine($" -{item}");
                    //    }
                    //}
                }
            }

            else if (command == "List")
            {
                foreach (var kvp in dictionary.Keys)
                {
                    Console.Write($"{kvp} ");
                }
            }
        }
        
    }
}
