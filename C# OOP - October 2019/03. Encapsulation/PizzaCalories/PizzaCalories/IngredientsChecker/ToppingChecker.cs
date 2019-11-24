namespace PizzaCalories.IngredientsChecker
{
    public static class ToppingChecker
    {
        private const double meat = 1.2;
        private const double veggies = 0.8;
        private const double cheese = 1.1;
        private const double sauce = 0.9;

        public static double GetCalories(string type)
        {
            double calories = 0;
            switch (type.ToLower())
            {
                case "meat":
                    calories = meat;
                    break;
                case "veggies":
                    calories = veggies;
                    break;
                case "cheese":
                    calories = cheese;
                    break;
                case "sauce":
                    calories = sauce;
                    break;
            }
            return calories;
        }

        public static bool Validate(string input)
        {
            bool validator = false;
            switch (input.ToLower())
            {
                case "meat":
                    validator = true;
                    break;
                case "veggies":
                    validator = true;
                    break;
                case "cheese":
                    validator = true;
                    break;
                case "sauce":
                    validator = true;
                    break;
            }
            return validator;
        }
    }
}

