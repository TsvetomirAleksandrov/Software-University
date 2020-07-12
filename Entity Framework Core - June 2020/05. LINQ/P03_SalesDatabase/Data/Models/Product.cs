using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using P03_SalesDatabase.Common;

namespace P03_SalesDatabase.Data.Models
{
    public class Product
    {
        public Product()
        {
            this.Sales = new HashSet<Sale>();
        }

        [Key]
        public int ProductId { get; set; }

        [Required]
        [MaxLength(GlobalConstants.ProductNameMaxLength)]
        public string Name { get; set; }

        [MaxLength(GlobalConstants.ProductDescriptionMaxLength)]
        public string Description { get; set; }

        public double Quantity { get; set; }

        public decimal Price { get; set; }

        public virtual ICollection<Sale> Sales { get; set; }
    }
}
