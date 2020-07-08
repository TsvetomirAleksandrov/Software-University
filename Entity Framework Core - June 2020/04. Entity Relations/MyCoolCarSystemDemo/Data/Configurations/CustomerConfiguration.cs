using System;
using System.Collections.Generic;
using System.Text;
using MyCoolCarSystem.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyCoolCarSystem.Data.Migrations;

namespace MyCoolCarSystem.Data.Configurations
{
   public class CustomerConfiguration
    {

        public void Configure(EntityTypeBuilder<Customer> customer)
        {
            customer
                .HasOne(c => c.Address)
                .WithOne(a => a.Customer)
                .HasForeignKey<Address>(a => a.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);
        }

    }
}
