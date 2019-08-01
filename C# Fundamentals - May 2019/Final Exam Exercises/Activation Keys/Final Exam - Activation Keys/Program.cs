using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Final_Exam___Activation_Keys
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] input = Console.ReadLine().Split("&");
            List<string> keys = new List<string>();

            for (int i = 0; i < input.Length; i++)
            {
                StringBuilder sb = new StringBuilder();

                var regex = Regex.Matches(input[i], @"[A-Za-z0-9]+[]?:(^A-Za-z0-9)]");

                foreach (Match key in regex)
                {
                    if (key.Length == 16)
                    {
                        for (int j = 0; j < key.Length; j++)
                        {
                            char keyToAdd = key.ToString().ToUpper()[j];

                            if (j != 0 && j % 4 == 0)
                            {
                                sb.Append("-");
                            }
                            if (char.IsDigit(keyToAdd))
                            {
                                int a = int.Parse(keyToAdd.ToString());
                                int newKeys = 9 - a;
                                sb.Append(newKeys);
                            }
                            else
                            {
                                sb.Append(keyToAdd);
                            }
                        }
                        keys.Add(sb.ToString());
                    }
                    else if (key.Length == 25)
                    {
                        for (int j = 0; j < key.Length; j++)
                        {
                            char keyToAdd = key.ToString().ToUpper()[j];
                            if (j != 0 && j % 5 == 0)
                            {
                                sb.Append("-");
                            }
                            if (char.IsDigit(keyToAdd))
                            {
                                int a = int.Parse(keyToAdd.ToString());
                                int newKeys = 9 - a;
                                sb.Append(newKeys);
                            }
                            else
                            {
                                sb.Append(keyToAdd);
                            }
                        }
                        keys.Add(sb.ToString());
                    }
                }
            }
            Console.WriteLine(String.Join(", ", keys));
        }
    }
}
