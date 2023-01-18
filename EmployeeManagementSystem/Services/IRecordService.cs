using EmployeeManagementSystem.Models.GroupModels;

namespace EmployeeManagementSystem.Services
{
    public interface IRecordService
    {
        IQueryable<DepartmentGroup> DepartmentGroup();
    }
}
