﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Person
{
    public class Person
    {

    public Person(string name, int age)
        {
            this.Name = name;
            this.Age = age;
        }


        private int age;
        private string name;

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public int Age
        {
            get { return age; }
            set { age = value; }
        }


        public override string ToString()
        {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append(String.Format("Name: {0}, Age: {1}", this.Name, this.Age));

            return stringBuilder.ToString();
        }

    }
}
