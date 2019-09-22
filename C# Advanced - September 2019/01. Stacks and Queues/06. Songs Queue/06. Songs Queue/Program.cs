using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _06._Songs_Queue
{
    class Program
    {
        static void Main(string[] args)
        {
            var inputSong = Console.ReadLine()
                 .Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries)
                 .ToArray();
            var songQueue = new Queue<string>(inputSong);

            while (songQueue.Count > 0)
            {
                var command = Console.ReadLine().Split(new char[] { ' ' }, 2).ToArray();


                if (command[0] == "Play")
                {
                    songQueue.Dequeue();
                }

                else if (command[0] == "Add")
                {
                    if (songQueue.Contains(command[1]))
                    {
                        Console.WriteLine($"{command[1]} is already contained!");
                    }
                    else
                    {
                        songQueue.Enqueue(command[1]);
                    }
                }
                else if (command[0] == "Show")
                {
                    Console.WriteLine(String.Join(", ", songQueue));
                }
            }
            Console.WriteLine("No more songs!");
        }
    }
}
