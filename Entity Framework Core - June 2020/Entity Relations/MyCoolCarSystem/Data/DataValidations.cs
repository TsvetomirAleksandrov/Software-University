using System;
using System.Collections.Generic;
using System.Text;

namespace MyCoolCarSystem.Data
{
    public static class DataValidations
    {
        public static class Make
        {
            public const int MaxName = 20;
        }

        public static class Model
        {
            public const int MaxName = 20;
            public const int MaxModificationName = 30;
        }

        public static class Car
        {
            public const int VinLength = 17;
            public const int ColorMaxLength = 15;
        }


        public static class Customer
        {
            public const int MaxNameLength = 30;
        }

        public static class Address
        {
            public const int MaxTextLength = 200;
            public const int MaxTownLength = 30;
        }
    }
}
