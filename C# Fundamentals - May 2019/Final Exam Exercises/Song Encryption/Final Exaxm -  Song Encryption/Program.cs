using System;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Numerics;
using System.Text;
using System.Globalization;

namespace Final_Exaxm____Song_Encryption
{
    class Program
    {
        static void Main(string[] args)
        {
            string input = Console.ReadLine();

            while (input != "end")
            {
                string artist = input.Substring(0, input.IndexOf(":"));
                string song = input.Substring(input.IndexOf(":") + 1);

                if (ValidateArtist(artist) && ValidateSong(song))
                {
                    int length = artist.Length;

                    StringBuilder sb = new StringBuilder();

                    for (int i = 0; i < input.Length; i++)
                    {
                        if (input[i] == ':')
                        {
                            sb.Append('@');
                        }
                        else if (input[i] == ' ' || input[i] == '\'')
                        {
                            sb.Append(input[i]);
                        }
                        else
                        {
                            char symbol = (char)(input[i] + length);

                            if (char.IsUpper(input[i]) && symbol > 'Z')
                            {
                                symbol = (char)(symbol - 26);
                            }

                            else if (char.IsLower(input[i]) && symbol > 'z')
                            {
                                symbol = (char)(symbol - 26);
                            }

                            sb.Append(symbol);
                        }
                    }

                    Console.WriteLine($"Successful encryption: {sb.ToString()}");
                }

                else
                {
                    Console.WriteLine("Invalid input!");
                }

                input = Console.ReadLine();
            }
        }


        public static bool ValidateSong(string song)
        {
            bool isValid = true;

            for (int i = 0; i < song.Length; i++)
            {
                if (!char.IsUpper(song[i]) && song[i] != ' ')
                {
                    isValid = false;
                    break;
                }
            }
            return isValid;
        }

        public static bool ValidateArtist(string artist)
        {
            bool isValid = true;

            if (!char.IsUpper(artist[0]))
            {
                isValid = false;
            }

            for (int i = 1; i < artist.Length; i++)
            {
                if (!char.IsLower(artist[i]) && artist[i] != '\'' && artist[i] != ' ')
                {
                    isValid = false;
                    break;
                }
            }

            return isValid;
        }
    }
}
