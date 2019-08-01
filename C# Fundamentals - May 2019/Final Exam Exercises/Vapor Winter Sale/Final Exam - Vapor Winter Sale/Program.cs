using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Final_Exam___Vapor_Winter_Sale
{
    class Program
    {
        static void Main(string[] args)
        {
            var input = Console.ReadLine().Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries);
            Dictionary<string, double> games = new Dictionary<string, double>();
            Dictionary<string, string> contentToGame = new Dictionary<string, string>();

            for (int i = 0; i < input.Length; i++)
            {
                if (input[i].Contains('-'))
                {
                    string[] splitToString = input[i].Split('-');
                    string game = splitToString[0];
                    double price = double.Parse(splitToString[1]);
                    string pattern = @"^[a-zA-Z0-9 ]+$";
                    if (Regex.IsMatch(game, pattern))
                    {
                        games[game] = price;
                    }
                }
                else if (input[i].Contains(':'))
                {
                    string[] splitToString = input[i].Split(':');
                    string game = splitToString[0];
                    string dlc = splitToString[1];

                    if (games.ContainsKey(game))
                    {
                        contentToGame[game] = dlc;
                        games[game] *= 1.2;
                    }
                }
            }

            Dictionary<string, double> gamesReducedPrice = new Dictionary<string, double>();

            foreach (var game in gamesReducedPrice.OrderBy(x=>x.Value))
            {
                if (contentToGame.ContainsKey(game.Key))
                {
                    Console.WriteLine($"{game.Key} - {contentToGame[game.Key]} - {game.Value:f2}");
                }
            }


            foreach (var game in  gamesReducedPrice.OrderByDescending(x=>x.Value))
            {
                if (!contentToGame.ContainsKey(game.Key))
                {
                    Console.WriteLine($"{game.Key} - {game.Value:f2}");
                }
            }
        }
    }
}
