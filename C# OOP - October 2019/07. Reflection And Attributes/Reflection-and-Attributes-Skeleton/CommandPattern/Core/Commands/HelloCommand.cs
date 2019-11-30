using System;
using System.Collections.Generic;
using System.Text;
using CommandPattern.Core.Contracts;

namespace CommandPattern.Core.Commands
{
    public class HelloCommand : ICommand

    {
        public string Execute(string[] args)
        {
            string name = args[0];

            return $"Hello, {name}";
        }
    }
}
