using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShoppingSpree
{
    public class Engine
    {
        private List<Person> people;
        private List<Product> products;

        public Engine()
        {
            people = new List<Person>();
            products = new List<Product>();
        }

        public void Run()
        {
            try
            {
                string[] input = Console.ReadLine()
                    .Split(new char[] { ';', '=' }, StringSplitOptions.RemoveEmptyEntries)
                    .ToArray();

                for (int i = 0; i < input.Length; i += 2)
                {
                    ValidatingPeople(input, i);
                }

                string[] inputProducts = Console.ReadLine()
                  .Split(new char[] { ';', '=' }, StringSplitOptions.RemoveEmptyEntries)
                  .ToArray();

                for (int t = 0; t < inputProducts.Length; t += 2)
                {
                    ValidatingProducts(inputProducts, t);
                }

                string buying = string.Empty;
                while ((buying = Console.ReadLine()) != "END")
                {
                    Shopping(buying);
                }
            }
            catch (Exception)
            {
                return;
            }

            Printing();
        }

        private void Shopping(string buying)
        {
            string[] buyingArr = buying
                .Split(" ", StringSplitOptions.RemoveEmptyEntries).ToArray();
            string name = buyingArr[0].Trim();
            string product = buyingArr[1].Trim();

            if (name == "" || product == "")
            {
                Console.WriteLine("Name cannot be empty");
                throw new ArgumentException();
            }

            Product productToBuy = products.Find(x => x.Name == product);
            Person person = people.Find(x => x.Name == name);
            person.BuyingProduct(productToBuy);
        }

        private void Printing()
        {
            foreach (var person in people)
            {
                Console.WriteLine(person.ToString());
            }
        }

        private void ValidatingPeople(string[] input, int i)
        {
            decimal money = 0;
            string name = string.Empty;

            if (decimal.TryParse(input[i], out money))
            {
            }
            else
            {
                name = input[i].Trim();
                money = decimal.Parse(input[i + 1]);
            }
            Person newPerson = new Person(name, money);
            people.Add(newPerson);
        }

        private void ValidatingProducts(string[] input, int t)
        {
            decimal price = 0;
            string name = string.Empty;

            if (decimal.TryParse(input[t], out price))
            {
            }
            else
            {
                name = input[t].Trim();
                price = decimal.Parse(input[t + 1]);
            }

            Product newProduct = new Product(price, name);
            products.Add(newProduct);
        }
    }
}