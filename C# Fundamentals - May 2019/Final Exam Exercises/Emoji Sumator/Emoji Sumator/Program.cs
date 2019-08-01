using System;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Numerics;
using System.Text;
using System.Globalization;

namespace Emoji_Sumator
{
    public class EntryPoint
    {
        public static void Main()
        {
            string givenMessage = Console.ReadLine();
            int[] emojiCodeArray = Console.ReadLine()
                .Split(new[] { ':' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(int.Parse)
                .ToArray();

            Regex regex = new Regex(@"(?<=[\s])(?<emoji>:[a-z]{4,}:)(?=[\s,.!?])");
            IList<Match> matchCollection = regex
                .Matches(givenMessage)
                .ToList();

            int totalPower = 0;
            foreach (var match in matchCollection)
            {
                string calcMatch = match.Value;
                for (int i = 1; i < calcMatch.Length - 1; i++)
                {
                    totalPower += calcMatch[i];
                }
            }

            string emojiName = GetEmojiName(emojiCodeArray);
            string matchesConcatenated = string.Join(string.Empty, matchCollection);

            if (matchesConcatenated.Contains(emojiName))
            {
                totalPower *= 2;
            }

            if (matchCollection.Count > 0)
            {
                Console.WriteLine($"Emojis found: {string.Join(", ", matchCollection)}");
            }

            Console.WriteLine($"Total Emoji Power: {totalPower}");
        }

        private static string GetEmojiName(IEnumerable<int> inputArray)
        {
            if (inputArray == null)
            {
                throw new ArgumentNullException(nameof(inputArray));
            }

            var stringBuilder = new StringBuilder(inputArray.Count());
            stringBuilder.Append(':');

            foreach (var number in inputArray)
            {
                stringBuilder.Append((char)number);
            }

            stringBuilder.Append(':');
            return stringBuilder.ToString().TrimEnd();
        }
    }
}