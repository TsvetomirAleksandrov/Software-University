using System;
using System.Collections.Generic;
using System.Text;
using MXGP.Models.Motorcycles.Contracts;
using MXGP.Utilities.Messages;

namespace MXGP.Models.Motorcycles
{
    public class PowerMotorcycle : Motorcycle, IMotorcycle
    {
        private const int InitialCubicCentimeters = 450;
        private const int InitialMinimumHorsePower = 70;
        private const int InitialMaximumHorsePower = 100;
        public PowerMotorcycle(string model, int horsePower) 
            : base(model, horsePower, InitialCubicCentimeters)
        {
        }

        public override int HorsePower
        {
            get => base.HorsePower;

            protected set
            {
                if (value < InitialMinimumHorsePower || value > InitialMaximumHorsePower)
                {
                    throw new ArgumentException(string.Format(ExceptionMessages.InvalidHorsePower, value));
                }

                base.HorsePower = value;
            }
        }
    }
}
