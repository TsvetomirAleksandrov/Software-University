using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Word_Count
{
    class Program
    {
        static void Main(string[] args)
        {
            var matchedWords = new Dictionary<string, int>();

            string filePathWord = Path.Combine("Resources", "words.txt");
            string filePathText = Path.Combine("Resources", "text.txt");

            string[] wordArr = File.ReadAllLines(filePathWord);
            string text = File.ReadAllText(filePathText);

            string clearedText = ExtractingLettersOnly(text);

            string[] clearedTextArr = clearedText
                .Split(" ", StringSplitOptions.RemoveEmptyEntries).ToArray();

            CompareingWordsAndCounting(matchedWords, wordArr, clearedTextArr);

            CreatingOutpuAndCompare(matchedWords);
        }

        private static void CreatingOutpuAndCompare(Dictionary<string, int> matchedWords)
        {
            using (var writer = new StreamWriter("output.txt"))
            {
                foreach (var item in matchedWords.OrderByDescending(x => x.Value))
                {
                    writer.WriteLine($"{item.Key} - {item.Value}");
                }
            }


            string[] output = File.ReadAllLines("output.txt");
            string[] expectedResults = File.ReadAllLines(Path.Combine("Resources", "expectedResult.txt"));

            bool equal = true;
            for (int i = 0; i < output.Length; i++)
            {
                if (output[i] != expectedResults[i])
                {
                    equal = false;
                }
            }

            Console.WriteLine(equal);
        }

        private static void CompareingWordsAndCounting(Dictionary<string, int> matchedWords, string[] wordArr, string[] clearedTextArr)
        {
            for (int i = 0; i < wordArr.Length; i++)
            {
                for (int t = 0; t < clearedTextArr.Length; t++)
                {
                    if (wordArr[i].ToLower() == clearedTextArr[t])
                    {
                        if (!matchedWords.ContainsKey(wordArr[i]))
                        {
                            matchedWords.Add(wordArr[i], 0);
                        }
                        matchedWords[wordArr[i]]++;
                    }
                }
            }
        }

        private static string ExtractingLettersOnly(string text)
        {
            string clearedText = string.Empty;

            for (int i = 0; i < text.Length; i++)
            {
                if (!char.IsLetter(text[i]))
                {
                    clearedText += ' ';
                }
                else
                {
                    clearedText += text[i];
                }
            }

            clearedText = clearedText.ToLower();
            return clearedText;
        }
    }
}