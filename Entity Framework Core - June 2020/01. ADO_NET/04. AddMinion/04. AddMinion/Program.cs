using System;
using Microsoft.Data.SqlClient;

namespace _04._AddMinion
{
    class Program
    {
        static void Main(string[] args)
        {
            var tokens = Console.ReadLine().Split();
            string minionName = tokens[1];
            int minionAge = int.Parse(tokens[2]);
            string minionTown = tokens[3];

            tokens = Console.ReadLine().Split();
            string villainName = tokens[1];


            string connectionString = @"Server=.\SQLEXPRESS; Database=MinionsDB; Integrated Security = true;";

            SqlConnection connection = new SqlConnection(connectionString);

            connection.Open();

            using (connection)
            {
                SqlCommand command =
                    new SqlCommand($"SELECT COUNT(*) FROM Towns WHERE Name = '{minionTown}' ", connection);

                if ((int) command.ExecuteScalar() == 0)
                {
                    command = new SqlCommand($"INSERT INTO towns(Name) VALUES ('{minionTown}')", connection);
                    command.ExecuteNonQuery();
                    Console.WriteLine($"Town {minionTown} was added to the database.");
                }

                command = new SqlCommand($"SELECT COUNT(*) FROM Villains WHERE Name = '{villainName}'", connection);

                if ((int) command.ExecuteScalar() == 0)
                {
                    command = new SqlCommand(
                        $"INSERT INTO Villains (Name, EvilnessFactorId) VALUES ('{villainName}', 4)", connection);
                    command.ExecuteNonQuery();
                    Console.WriteLine($"Villain {villainName} was added to the database.");
                }

                command = new SqlCommand($"SELECT Id FROM Towns WHERE Name = '{minionTown}'", connection);
                int townId = (int) command.ExecuteScalar();

                command = new SqlCommand(
                    $"INSERT INTO Minions(Name, Age, TownId) VALUES ('{minionName}', {minionAge}, {townId})", connection);
                command.ExecuteNonQuery();

                int villainId = (int) new SqlCommand($"SELECT Id FROM Villains WHERE Name = '{villainName}'", connection)
                    .ExecuteScalar();
                int minionId = (int) new SqlCommand($"SELECT Id FROM Minions WHERE Name = '{minionName}'", connection)
                    .ExecuteScalar();

                command = new SqlCommand($"INSERT INTO MinionsVillains VALUES ({minionId}, {villainId})", connection);
                command.ExecuteNonQuery();
                Console.WriteLine($"Successfully added {minionName} to be minion of {villainName}.");
            }
        }
    }
}