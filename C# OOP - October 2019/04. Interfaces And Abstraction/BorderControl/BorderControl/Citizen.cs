using System;
using System.Collections.Generic;
using System.Text;

namespace BorderControl
{
    class Citizen : IIdentifiablle
    {
        public string Id { get; private set; }

        private string name;
        private int age;

        public Citizen(string name, int age, string id)
        {
            name = name;
            age = age;
            Id = id;
        }
    }
}
