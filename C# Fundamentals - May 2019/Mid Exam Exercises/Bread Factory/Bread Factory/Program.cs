using System;
using System.Collections.Generic;
using System.Linq;

namespace ConsoleApp2
{
    class Program
    {
        static void Main(string[] args)
        {
            List<int> bestBatch = new List<int>();
            string command;
            int quality = -1000000;

            while ((command = Console.ReadLine()) != "Bake It!")
            {
                List<int> currentBatch = command.Split("#").Select(int.Parse).ToList();


                if (quality < currentBatch.Sum())
                {
                    quality = currentBatch.Sum();
                    bestBatch = currentBatch;
                }
                else if (quality == currentBatch.Sum())
                {
                    double averageForCurrentBestBatch = quality / bestBatch.Count;
                    double averageForThisBatch = currentBatch.Sum() / currentBatch.Count;
                    if (averageForThisBatch > averageForCurrentBestBatch)
                    {

                        bestBatch = currentBatch;
                    }
                    if (averageForCurrentBestBatch == averageForThisBatch)
                    {
                        if (currentBatch.Count < bestBatch.Count)
                        {
                            bestBatch = currentBatch;
                        }
                    }
                }
            }
            Console.WriteLine($"Best Batch quality: {quality}");
            Console.WriteLine(string.Join(' ', bestBatch));

        }
    }
}