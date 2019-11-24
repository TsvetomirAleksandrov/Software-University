using System.Collections.Generic;
using MilitaryElite.Models;

namespace MilitaryElite.Interfaces
{
    public interface ILeutenantGeneral
    {
        ICollection<Private> Privates { get; }
    }
}