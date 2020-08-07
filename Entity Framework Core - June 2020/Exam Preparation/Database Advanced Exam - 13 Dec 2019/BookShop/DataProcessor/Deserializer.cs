namespace BookShop.DataProcessor
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Xml.Serialization;
    using BookShop.Data.Models;
    using BookShop.Data.Models.Enums;
    using BookShop.DataProcessor.ImportDto;
    using Data;
    using Newtonsoft.Json;
    using ValidationContext = System.ComponentModel.DataAnnotations.ValidationContext;

    public class Deserializer
    {
        private const string ErrorMessage = "Invalid data!";

        private const string SuccessfullyImportedBook
            = "Successfully imported book {0} for {1:F2}.";

        private const string SuccessfullyImportedAuthor
            = "Successfully imported author - {0} with {1} books.";

        public static string ImportBooks(BookShopContext context, string xmlString)
        {
            StringBuilder sb = new StringBuilder();

            XmlSerializer xmlSerializer = new XmlSerializer(typeof(ImportBookDto[]), new XmlRootAttribute("Books"));

            using (StringReader stringReader = new StringReader(xmlString))
            {
                ImportBookDto[] bookDtos = (ImportBookDto[])xmlSerializer.Deserialize(stringReader);

                List<Book> validBooks = new List<Book>();

                foreach (ImportBookDto bookDto in bookDtos)
                {
                    //Check if the DTO is valid
                    if (!IsValid(bookDto))
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }

                    //Check if date is valid
                    DateTime publishedOn;
                    bool isDateValid = DateTime.TryParseExact(bookDto.PublishedOn, "MM/dd/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out publishedOn);

                    if (!isDateValid)
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }

                    //Define a new book
                    Book validBook = new Book()
                    {
                        Name = bookDto.Name,
                        Genre = (Genre)bookDto.Genre,
                        Price = bookDto.Price,
                        Pages = bookDto.Pages,
                        PublishedOn = publishedOn
                    };

                    //Add the book to the List
                    validBooks.Add(validBook);
                    sb.AppendLine(String.Format(SuccessfullyImportedBook, validBook.Name, validBook.Price));
                }

                context.Books.AddRange(validBooks);
                context.SaveChanges();
            }

            return sb.ToString().TrimEnd();
        }

        public static string ImportAuthors(BookShopContext context, string jsonString)
        {
            StringBuilder sb = new StringBuilder();

            ImportAuthorDto[] authorDtos = JsonConvert.DeserializeObject<ImportAuthorDto[]>(jsonString);

            List<Author> authors = new List<Author>();

            foreach (ImportAuthorDto authorDto in authorDtos)
            {
                //Validate the DTO
                if (!IsValid(authorDto))
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                //If an Email exists, do not import the author
                if (authors.Any(a => a.Email == authorDto.Email))
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                //Create new Author
                Author author = new Author()
                {
                    FirstName = authorDto.FirstName,
                    LastName = authorDto.LastName,
                    Email = authorDto.Email,
                    Phone = authorDto.Phone
                };

                //Validate Books
                foreach (ImportAuthorBookDto bookDto in authorDto.Books)
                {
                    //If a book does not exist in the database, do not append an error message and continue with the next book
                    if (!bookDto.BookId.HasValue)
                    {
                        continue;
                    }

                    //Create a new book
                    Book book = context
                        .Books
                        .FirstOrDefault(b => b.Id == bookDto.BookId);

                    if (book == null)
                    {
                        continue;
                    }

                    author.AuthorsBooks.Add(new AuthorBook
                    {
                        Author = author,
                        Book = book
                    });
                }

                //If an author have zero books (all books are invalid) do not import the author 
                if (author.AuthorsBooks.Count == 0)
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                authors.Add(author);
                sb.AppendLine(String.Format(SuccessfullyImportedAuthor, (author.FirstName + ' ' + author.LastName), author.AuthorsBooks.Count));
            }

            context.Authors.AddRange(authors);
            context.SaveChanges();

            return sb.ToString().TrimEnd();
        }

        private static bool IsValid(object dto)
        {
            var validationContext = new ValidationContext(dto);
            var validationResult = new List<ValidationResult>();

            return Validator.TryValidateObject(dto, validationContext, validationResult, true);
        }
    }
}