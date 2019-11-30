using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SandBox
{
    public class Person
    {
        public Person(string firstName, int age)
        {
            FirstName = firstName;
            Age = age;
        }


        [Required]
        public string FirstName { get; set; }
        [Range(18, 65)]
        public int Age { get; set; }                  
    }
}
