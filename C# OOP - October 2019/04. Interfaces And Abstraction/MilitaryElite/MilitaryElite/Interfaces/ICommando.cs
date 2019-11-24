using System.Collections.Generic;
using MilitaryElite.Models;

namespace MilitaryElite.Interfaces
{
    public interface ICommando
    {
        ICollection<Mission> Missions { get; }
    }
}