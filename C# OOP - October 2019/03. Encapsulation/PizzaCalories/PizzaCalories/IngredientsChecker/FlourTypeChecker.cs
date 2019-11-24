namespace PizzaCalories.IngredientsChecker
{
    public static class FlourTypeChecker
    {
        private const double White = 1.5;
        private const double Wholegrain = 1.0;

        public static double GetCalories(string flourType)
        {
            double calories = 0;

            switch (flourType.ToLower())
            {
                case "white":
                    {
                        calories = White;
                    }
                    break;

                case "wholegrain":
                    {
                        calories = Wholegrain;
                    }
                    break;
            }

            return calories;
        }

        public static bool Validate(string input)
        {
            bool validator = false;

            switch (input.ToLower())
            {
                case "white":
                    {
                        validator = true;
                    }
                    break;

                case "wholegrain":
                    {
                        validator = true;
                    }
                    break;
            }

            return validator;
        }
    }
}