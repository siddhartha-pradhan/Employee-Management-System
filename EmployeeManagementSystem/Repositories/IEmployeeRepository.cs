using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Repositories
{
    public interface IEmployeeRepository
    {
        public List<Employee> GetAll();

        public int Add(Employee employee);

        public int Update(Employee employee);

        public int Delete(int Id);
    }
}
