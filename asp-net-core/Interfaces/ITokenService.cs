using asp_net_core.Entities;
using System.Threading.Tasks;

namespace asp_net_core.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(Student student);
    }
}
