using asp_net_core.Dto;
using System.Threading.Tasks;

namespace asp_net_core.Interfaces
{
    public interface IStudentRepository
    {
        Task<StudentDto> GetStudentAsync(string studentCode);
    }
}
