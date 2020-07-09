using System;
using System.Linq;
using P03_FootballBetting.Data;

namespace P03_FootballBetting
{
    public class StartUp
    {
        static void Main(string[] args)
        {
            FootballBettingContext context = new FootballBettingContext();

            var users = context
                .Users
                .Select(u => new
                {
                    u.Username,
                    u.Email,
                    Name = u.Name == null ? "(No name)" : u.Name,
                    u.Balance
                });

            foreach (var u in users)
            {
                Console.WriteLine($"{u.Username} -> {u.Email} {u.Name} {u.Balance:f2}");
            }
        }
    }
}
