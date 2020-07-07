using System;
using Demo.Models;

namespace Demo
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var db = new CatsDbContext())
            {
                db.Cats.Add(new Cat
                    {
                        Name = "Vanio",
                        Age = 5,
                        Color = "Black",
                        Owner = new Owner
                        {
                            Name = "Bai Ivan"
                        }
                    });

                db.SaveChanges();
            }
        }
    }
}
