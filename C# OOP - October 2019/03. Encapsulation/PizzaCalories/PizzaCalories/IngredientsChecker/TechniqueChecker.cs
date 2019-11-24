namespace PizzaCalories.IngredientsChecker
{
    public static class TechniqueChecker
    {
        private const double Crispy = 0.9;
        private const double Chewy = 1.1;
        private const double Homemade = 1.0;

        public static double GetCalories(string technique)
        {
            double calories = 0;

            switch (technique.ToLower())
            {
                case "crispy":
                    {
                        calories = Crispy;
                    }
                    break;

                case "chewy":
                    {
                        calories = Chewy;
                    }
                    break;
                case "homemade":
                    {
                        calories = Homemade;
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
                case "crispy":
                    {
                        validator = true;
                    }
                    break;

                case "chewy":
                    {
                        validator = true;
                    }
                    break;
                case "homemade":
                    {
                        validator = true;
                    }
                    break;
            }

            return validator;
        }
    }
}