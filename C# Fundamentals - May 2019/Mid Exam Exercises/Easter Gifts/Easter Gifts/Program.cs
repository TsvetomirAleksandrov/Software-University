using System;
using System.Linq;

namespace Easter_Gifts
{
    class Program
    {
        static void Main(string[] args)
        {
            var gifts = Console.ReadLine().Split().ToList();

            while (true)
            {
                string command = Console.ReadLine();

                if (command == "No Money")
                {
                    break;
                }

                string[] tokens = command.Split().ToArray();

                if (tokens[0] == "OutOfStock")
                {
                    if (tokens.Count() == 2)
                    {
                        for (int i = 0; i < gifts.Count; i++)
                        {
                            if (gifts[i].Contains(tokens[1])) 
                            {
                                int index = gifts.IndexOf(tokens[1]);                            
                                gifts.Remove(tokens[1]);
                                gifts.Insert(index, "None");
                            }
                        }
                    }
                }
                else if (tokens[0] == "Required")
                {
                    if (tokens.Count() == 3)
                    {
                        string gift = tokens[1];
                        int index = int.Parse(tokens[2]);
                        if (index >= 0 && index < gifts.Count)
                        {
                            gifts.RemoveAt(index);
                            gifts.Insert(index, gift);
                        }
                    }
                }
                else if (tokens[0] == "JustInCase")
                {
                    if (tokens.Count() == 2)
                    {
                        int indexOfLastGift = gifts.Count - 1;
                        gifts.RemoveAt(indexOfLastGift);
                        gifts.Add(tokens[1]);
                    }
                }
            }
            if (gifts.Contains("None"))
            {
                gifts.RemoveAll(gift => gift == "None");
            }
            Console.WriteLine(string.Join(" ", gifts));
        }
    }
}
