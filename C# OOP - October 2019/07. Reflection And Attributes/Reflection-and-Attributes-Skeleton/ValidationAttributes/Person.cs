using System;
using System.Collections.Generic;
using System.Text;

namespace ValidationAttributes
{
   public class Person
    {
        public Person(string fullName, int age)
        {
            this.FullName = fullName;
            this.Age = age;
        }

        [MyRequired]
        [Obsolete]
        public string FullName { get; set; }

        [MyRange(18, 65)]
        public int Age { get; set; }
    }
}
