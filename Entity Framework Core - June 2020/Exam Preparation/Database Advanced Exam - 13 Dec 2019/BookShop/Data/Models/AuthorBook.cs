using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BookShop.Data.Models
{
    public class AuthorBook
    {
        [ForeignKey(nameof(Author))]
        public int AuthorId { get; set; }

        public virtual Author Author { get; set; }

        [ForeignKey(nameof(Book))]
        public int BookId { get; set; }

        public virtual Book Book { get; set; }
    }
}
