using System;

namespace DefiningClasses
{
    public class StartUp
    {
        public static void Main(string[] args)
        {
            Person person = new Person();
            Person person2 = new Person(2);
            Person person3 = new Person("Pesho", 30);
        }
    }
}
