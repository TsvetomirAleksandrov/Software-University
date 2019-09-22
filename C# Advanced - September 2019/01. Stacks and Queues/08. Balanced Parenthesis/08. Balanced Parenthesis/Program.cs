using System;
using System.Collections.Generic;
using System.Linq;

namespace debbuger_new
{
    public class StartUp
    {
        public static void Main(string[] args)
        {
            var input = Console.ReadLine();

            var elements = new Stack<char>();
            var balanced = true;

            if (input != null)
                foreach (var t in input)
                {
                    switch (t)
                    {
                        case '(':
                            elements.Push(t);
                            break;
                        case '[':
                            elements.Push(t);
                            break;
                        case '{':
                            elements.Push(t);
                            break;
                        case ')':
                            if (!elements.Any() || elements.Pop() != '(')
                            {
                                balanced = false;
                            }
                            break;
                        case ']':
                            if (!elements.Any() || elements.Pop() != '[')
                            {
                                balanced = false;
                            }
                            break;
                        case '}':
                            if (!elements.Any() || elements.Pop() != '{')
                            {
                                balanced = false;
                            }
                            break;
                    }
                }

            Console.WriteLine(balanced ? "YES" : "NO");
        }
    }
}