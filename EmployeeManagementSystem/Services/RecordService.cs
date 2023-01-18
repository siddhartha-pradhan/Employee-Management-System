using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Models.GroupModels;

namespace EmployeeManagementSystem.Services
{
    public class RecordService : IRecordService
    {
        private readonly ApplicationDbContext _dbContext;

        public RecordService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<DepartmentGroup> DepartmentGroup()
        {
            IQueryable<DepartmentGroup> departmentChart =
                from emp in _dbContext.Employees
                group emp by emp.Department into dep
                select new DepartmentGroup()
                {
                    Department = dep.Key,
                    Count = dep.Count()
                };

            return departmentChart;
        }
    }
}
