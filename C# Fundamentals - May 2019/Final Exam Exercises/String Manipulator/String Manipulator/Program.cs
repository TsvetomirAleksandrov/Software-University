using System;
using System.Linq;
using System.Text;
using System.Collections.Generic;

namespace String_Manipulator
{
    class Program
    {
        static void Main(string[] args)
        {
            string currentString = string.Empty;

            while (true)
            {
               string command = Console.ReadLine();

                if(command == "End")
                {
                    break;
                }

                string[] tokens = command.Split().ToArray();
               
                if (tokens[0] == "Add")
                {
                    currentString += tokens[1];
                }

                else if (tokens[0] == "Upgrade")
                {
                    char chr = char.Parse(tokens[1]);
                    StringBuilder builder = new StringBuilder();

                    for (int i = 0; i < currentString.Length; i++)
                    {
                        builder.Append(currentString[i]);
                    }

                    char replacingChar = (char)(chr + 1);
                    builder.Replace(chr, replacingChar);
                    currentString = string.Empty;
                    currentString += builder;
                }

                else if (tokens[0] == "Print")
                {
                    Console.WriteLine(currentString);
                }

                else if (tokens[0] == "Index")
                {
                    char chr = char.Parse(tokens[1]);
                    if (currentString.Contains(chr.ToString()))
                    {
                        string val = string.Empty;

                        for (int i = 0; i < currentString.Length; i++)
                        {
                            if (currentString[i] == chr)
                            {
                                val = val + i.ToString() + " ";
                            }
                        }
                        Console.WriteLine(val);
                    }
                    else
                    {
                        Console.WriteLine("None");
                    }
                }

                else if (tokens[0] == "Remove")
                {
                    string toRemove = tokens[1];
                    StringBuilder build = new StringBuilder();
                    for (int i = 0; i < currentString.Length; i++)
                    {
                        build.Append(currentString[i]);
                    }
                    if (currentString.Contains(toRemove))
                    {
                        build.Replace(toRemove, "");
                    }
                    currentString = string.Empty;
                    currentString += build;
                }
            }
        }
    }
}
