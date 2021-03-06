﻿using System;
using System.Collections.Generic;
using System.Text;

namespace PetStore.Common
{
    public static class GlobalConstants
    {
        //Breed
        public const int BreedNameMinLength = 5;
        public const int BreedNameMaxLength = 30;

        //Client
        public const int UserNameMinLength = 6;
        public const int UserNameMaxLength = 30;
        public const int EmailMinLength = 6;
        public const int EmailMaxLength = 50;
        public const int ClientNameMinLength = 3;
        public const int ClientNameMaxLength = 50;

        //ClientProduct
        public const int ClientProductMinQuantity = 1;

        //Order
        public const int TownNameMinLength = 3;
        public const int TownNameMaxLength = 40;
        public const int AddressTextMinLength = 5;
        public const int AddressTextMaxLength = 70;

        //Pet
        public const int PetNameMinLength = 3;
        public const int PetNameMaxLength = 50;
        public const int PetMinPrice = 0;
        public const int PetMinAge = 0;
        public const int PetMaxAge = 200;

        //Product
        public const int ProductNameMinLength = 3;
        public const int ProductNameMaxLength = 50;
    }
}
