using System;
using System.Linq;

namespace Easter_shopping
{
    class Program
    {
        static void Main(string[] args)
        {
            var shops = Console.ReadLine().Split().ToList();
            int n = int.Parse(Console.ReadLine());

            for (int i = 0; i < n; i++)
            {
                string[] command = Console.ReadLine().Split().ToArray();

                if (command[0] == "Include")
                {
                    shops.Add(command[1]);
                }
                else if (command[0] == "Visit")
                {
                    string firstOrLast = command[1];
                    int numberofShops = int.Parse(command[2]);
                    if (numberofShops <= shops.Count)
                    {
                        if (firstOrLast == "first")
                        {
                            for (int j = 0;j < numberofShops;j++)
                            {
                                shops.RemoveAt(0);
                            }
                        }
                        else if (firstOrLast == "last")
                        {
                            for (int j = 0; j < numberofShops; j++)
                            {
                                shops.RemoveAt(shops.Count - 1);
                            }
                        }
                    }
                }
                else if (command[0] == "Prefer")
                {
                    int shop1Index = int.Parse(command[1]);
                    int shop2Index = int.Parse(command[2]);
                    if (shop1Index < shops.Count && shop2Index < shops.Count)
                    {
                        string shop1 = shops[shop1Index];
                        string shop2 = shops[shop2Index];
                        shops.Remove(shop1);
                        shops.Insert(shop1Index, shop2);
                        shops.RemoveAt(shop2Index);
                        shops.Insert(shop2Index, shop1);
                    }
                }
                else if (command[0] == "Place")
                {
                    string shop = command[1];
                    int shopIndex = int.Parse(command[2]);
                    if (shopIndex + 1 < shops.Count)
                    {
                        shops.Insert(shopIndex + 1, shop);
                    }
                }
            }
            Console.WriteLine("Shops left:");
            Console.WriteLine(string.Join(" ", shops));
        }
    }
}
