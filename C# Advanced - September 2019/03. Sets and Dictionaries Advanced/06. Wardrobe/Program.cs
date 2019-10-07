using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace _06._Wardrobe
{
    class Program
    {
        static void Main(string[] args)
        {
            int count = int.Parse(Console.ReadLine());
            var wardrobe = new Dictionary<string, List<ClotheItem>>();
            ReceivingClothes(count, wardrobe);

            string[] clotheToFind = Console.ReadLine()
                .Split(" ", StringSplitOptions.RemoveEmptyEntries)
                .ToArray();

            Printing(wardrobe, clotheToFind);
        }

        private static void ReceivingClothes(int count, Dictionary<string, List<ClotheItem>> wardrobe)
        {
            for (int i = 0; i < count; i++)
            {
                string[] input = Regex.Split(Console.ReadLine(), @"\s+->\s+|\s*,\s*");
                string color = input[0];
                string[] clothes = input.Where(x => x != color).ToArray();

                if (!wardrobe.ContainsKey(color))
                {
                    wardrobe.Add(color, new List<ClotheItem>());
                }

                foreach (var clothe in clothes)
                {
                    if (!wardrobe[color].Any(x=> x.Name == clothe))
                    {
                        ClotheItem newItem = new ClotheItem(clothe, 0);
                        wardrobe[color].Add(newItem);
                    }


                    ClotheItem addClotheCount = wardrobe[color].Find(x => x.Name == clothe);
                    addClotheCount.Count++;
                }
            }
        }

        private static void Printing(Dictionary<string, List<ClotheItem>> wardrobe, string[] clotheToFind)
        {
            foreach (var color in wardrobe)
            {
                Console.WriteLine($"{color.Key} clothes:");

                foreach (var cloth in color.Value)
                {
                    if (color.Key == clotheToFind[0] && cloth.Name == clotheToFind[1])
                    {
                        Console.WriteLine($"* {cloth.Name} - {cloth.Count} (found!)");
                        continue;
                    }

                    Console.WriteLine($"* {cloth.Name} - {cloth.Count}");
                }
            }
        }
    }

    class ClotheItem
    {
        public ClotheItem(string name, int count)
        {
            Name = name;
            Count = count;
        }
        public string Name { get; set; }
        public int Count { get; set; }
    }
}
