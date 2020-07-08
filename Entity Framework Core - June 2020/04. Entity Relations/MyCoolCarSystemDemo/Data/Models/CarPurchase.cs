using System;
using System.Collections.Generic;
using System.Text;

namespace MyCoolCarSystem.Data.Models
{
    public class CarPurchase
    {
        public int CustomerId { get; set; }

        public Customer Customer { get; set; }

        public int CarId { get; set; }

        public Car Car { get; set; }

        public DateTime PurchaseDate { get; set; }

        public decimal Price { get; set; }
    }
}
