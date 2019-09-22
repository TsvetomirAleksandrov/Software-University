using System;
using System.Text;
using System.Linq;
using System.Collections.Generic;

namespace Fast_Food
{
    class Program
    {
        static void Main(string[] args)
        {
            int foodQuuantity = int.Parse(Console.ReadLine());
            int[] orders = Console.ReadLine().Split().Select(int.Parse).ToArray();
            var myQ = new Queue<int>(orders);
            int sum = 0;

            Console.WriteLine(myQ.Max());

            while (myQ.Count > 0)
            {
                int first = myQ.Peek();

                sum += first;

                if (sum <= foodQuuantity)
                {
                    myQ.Dequeue();
                }
                else
                {
                    int[] arr = myQ.ToArray();
                    Console.WriteLine("Orders left: " + string.Join(" ", arr));
                    return;
                }
            }

            Console.WriteLine("Orders complete");
        }
    }
}
