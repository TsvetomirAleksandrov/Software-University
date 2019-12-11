using PlayersAndMonsters.Models.Players.Contracts;
using System.Collections.Generic;

namespace PlayersAndMonsters.Repositories.Contracts
{
    public interface IPlayerRepository
    {
        int Count { get; }

        IReadOnlyCollection<IPlayer> Players { get; }

        void Add(IPlayer player);

        bool Remove(IPlayer player);

        IPlayer Find(string username);
    }
}
