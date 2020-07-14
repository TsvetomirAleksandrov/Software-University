using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BookShop.Models;
using BookShop.Models.Enums;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace BookShop
{
    using Data;
    using Initializer;

    public class StartUp
    {
        public static void Main()
        {
            using BookShopContext db = new BookShopContext();
            //DbInitializer.ResetDatabase(db);

            string input = Console.ReadLine();
            int year = int.Parse(input);

            string result = GetBooksNotReleasedIn(db, year);

            Console.WriteLine(result);
        }

        
        //Problem 01 - Age Restriction
        public static string GetBooksByAgeRestriction(BookShopContext context, string command)
        {
            List<string> bookTitles = context
                .Books
                .AsEnumerable()
                .Where(b => b.AgeRestriction.ToString().ToLower() == command.ToLower())
                .Select(b => b.Title)
                .OrderBy(bt => bt)
                .ToList();

            return String.Join(Environment.NewLine, bookTitles);
        }


        //Problem 02 - Golden Books
        public static string GetGoldenBooks(BookShopContext context)
        {
            List<string> bookTitles = context
                .Books
                .Where(b => b.EditionType == EditionType.Gold &&
                            b.Copies < 5000)
                .OrderBy(b => b.BookId)
                .Select(b => b.Title)
                .ToList();

            return String.Join(Environment.NewLine, bookTitles);
        }


        //Problem 03 - Books by Price
        public static string GetBooksByPrice(BookShopContext context)
        {
            var booksByPrice = context
                .Books
                .Where(b => b.Price > 40)
                .OrderByDescending(b => b.Price)
                .Select(b => $"{b.Title} - ${b.Price:f2}")
                .ToList();

            return string.Join(Environment.NewLine, booksByPrice);
        }


        //Problem 04 - Not Released In
        public static string GetBooksNotReleasedIn(BookShopContext context, int year)
        {
            List<string> booksNotReleasedIn = context
                .Books
                .Where(b => b.ReleaseDate.Value.Year != year)
                .OrderBy(b => b.BookId)
                .Select(b => b.Title)
                .ToList();

            return String.Join(Environment.NewLine, booksNotReleasedIn);
        }


        //Problem 05 - Book Titles by Category
        public static string GetBooksByCategory(BookShopContext context, string input)
        {
            string[] categories = input
                .Split(' ',
                    StringSplitOptions.RemoveEmptyEntries)
                .Select(c => c.ToLower())
                .ToArray();

            List<string> bookTitles = new List<string>();

            foreach (var cat in categories)
            {
                List<string> currentCategoryBookTitles = context
                    .Books
                    .Where(b => b.BookCategories.Any(bc =>
                        bc.Category.Name.ToLower() == cat))
                    .Select(b => b.Title)
                    .ToList();


                bookTitles.AddRange(currentCategoryBookTitles);
            }

            bookTitles = bookTitles
                .OrderBy(bt => bt)
                .ToList();

            return String.Join(Environment.NewLine, bookTitles);
        }


        //Problem 06 - Released Before Date
        public static string GetBooksReleasedBefore(BookShopContext context,
            string date)
        {
            DateTime theDate = DateTime.ParseExact(date, "dd-MM-yyyy", null);

            var books = context
                .Books
                .Where(b => b.ReleaseDate < theDate)
                .OrderByDescending(b => b.ReleaseDate)
                .Select(b => $"{b.Title} - {b.EditionType} - ${b.Price:f2}")
                .ToList();

            return String.Join(Environment.NewLine, books);
        }


        //Problem 07 - Author Search
        public static string GetAuthorNamesEndingIn(BookShopContext context,
            string input)
        {
            var authors = context
                .Authors
                .Where(a => a.FirstName != null && a.FirstName.EndsWith(input))
                .Select(a => $"{a.FirstName} {a.LastName}")
                .OrderBy(a => a)
                .ToList();

            return string.Join(Environment.NewLine, authors);
        }


        //Problem 08 - Book Search
        public static string GetBookTitlesContaining(BookShopContext context, string
            input)
        {
            List<string> bookTitlesContainingString = context
                .Books
                .AsEnumerable()
                .Where(b => b.Title.Contains(input, StringComparison.CurrentCultureIgnoreCase))
                .Select(b => b.Title)
                .OrderBy(bt => bt)
                .ToList();

            return String.Join(Environment.NewLine, bookTitlesContainingString);
        }


        //Problem 09 - Book Search by Author
        public static string GetBooksByAuthor(BookShopContext context, string
            input)
        {
            var books = context
                .Books
                .Where(b => b.Author.LastName.ToLower().StartsWith(input.ToLower()))
                .OrderBy(b => b.BookId)
                .Select(b => $"{b.Title} ({b.Author.FirstName} {b.Author.LastName})")
                .ToList();

            return string.Join(Environment.NewLine, books);
        }


        //Problem 10 - Count Books
        public static int CountBooks(BookShopContext context, int lengthCheck)
        {
            int countBooks = context
                .Books
                .Count(b => b.Title.Length > lengthCheck);

            return countBooks;
        }


        //Problem 11 - Total Book Copies
        public static string CountCopiesByAuthor(BookShopContext context)
        {
            StringBuilder sb = new StringBuilder();

            var authorCopies = context
                .Authors
                .Select(a => new
                {
                    FullName = a.FirstName + ' ' + a.LastName,
                    BookCopies = a.Books.Sum(b => b.Copies)
                })
                .OrderByDescending(a => a.BookCopies)
                .ToList();


            foreach (var a in authorCopies)
            {
                sb
                    .AppendLine($"{a.FullName} - {a.BookCopies}");
            }

            return sb.ToString().TrimEnd();
        }


        //Problem 12 - Profit by Category
        public static string GetTotalProfitByCategory(BookShopContext context)
        {
            StringBuilder sb = new StringBuilder();


            var categoryProfits = context
                .Categories
                .Select(c => new
                {
                    c.Name,
                    TotalProfit = c.CategoryBooks
                        .Select(cb => new
                        {
                            BookProfit = cb.Book.Copies * cb.Book.Price
                        })
                        .Sum(cb => cb.BookProfit)
                })
                .OrderByDescending(c => c.TotalProfit)
                .ThenBy(c => c.Name)
                .ToList();

            foreach (var c in categoryProfits)
            {
                sb.AppendLine($"{c.Name} ${c.TotalProfit:f2}");
            }

            return sb.ToString().TrimEnd();
        }


        //Problem 13 - Most Recent Books
        public static string GetMostRecentBooks(BookShopContext context)
        {
            var sb = new StringBuilder();

            var categoriesWithMostRecentBooks = context
                .Categories
                .Select(c => new
                {
                    CategoryName = c.Name,
                    MostRecentBooks = c.CategoryBooks
                        .OrderByDescending(cb => cb.Book.ReleaseDate)
                        .Take(3)
                        .Select(cb => new
                        {
                            BookTitle = cb.Book.Title,
                            ReleaseYear = cb.Book
                                .ReleaseDate.Value.Year
                        })
                        .ToList()
                })
                .OrderBy(c => c.CategoryName)
                .ToList();


            foreach (var c in categoriesWithMostRecentBooks)
            {
                sb.AppendLine($"--{c.CategoryName}");

                foreach (var b in c.MostRecentBooks)
                {
                    sb.AppendLine($"{b.BookTitle} ({b.ReleaseYear})");
                }
            }

            return sb.ToString().TrimEnd();
        }


        //Problem 14 - Increase Prices
        public static void IncreasePrices(BookShopContext context)
        {
            var booksToUpdate = context
                .Books
                .Where(b => b.ReleaseDate.Value.Year < 2010);

            foreach (var book in booksToUpdate)
            {
                book.Price += 5;
            }

            context.SaveChanges();
        }


        //Problem 15 - Remove Books
        public static int RemoveBooks(BookShopContext context)
        {
            var books = context
                .Books
                .Where(b => b.Copies < 4200)
                .ToArray();

            context.Books.RemoveRange(books);
            context.SaveChanges();

            return books.Length;
        }
    }
}
