using EmployeeManagementSystem.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EmployeeManagementSystem.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        string connectionString = "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=Employees.Database;Trusted_Connection=true;MultipleActiveResultSets=true;TrustServerCertificate=true";

        public int Add(Employee employee)
        {
            int id = 0;

            SqlConnection connection = new(connectionString);

            using (connection)
            {
                connection.Open();

                SqlCommand command = new("Upsert", connection);

                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@Id", employee.Id);
                command.Parameters.AddWithValue("@Name", employee.Name);
                command.Parameters.AddWithValue("@Age", employee.Age);
                command.Parameters.AddWithValue("@Email", employee.Email);
                command.Parameters.AddWithValue("@Department", employee.Department);
                command.Parameters.AddWithValue("@Designation", employee.Designation);
                command.Parameters.AddWithValue("@HiredDate", employee.HiredDate);
                command.Parameters.AddWithValue("@ModifiedDate", DBNull.Value);
                command.Parameters.AddWithValue("@Action", "Insert");

                id = command.ExecuteNonQuery();

                connection.Close();
            }

            return id;
        }

        public int Delete(int Id)
        {
            int id = 0;

            SqlConnection connection = new SqlConnection(connectionString);

            using (connection)
            {
                connection.Open();

                SqlCommand command = new("Delete", connection);

                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@Id", Id);

                id = command.ExecuteNonQuery();
            }

            return id;
        }

        public List<Employee> GetAll()
        {
            var employees = new List<Employee>();

            var connection = new SqlConnection(connectionString);

            using (connection)
            {
                connection.Open();

                SqlCommand command = new("GetAll", connection);

                command.CommandType = CommandType.StoredProcedure;

                SqlDataReader reader = command.ExecuteReader();

                while (reader.Read())
                {
                    if (reader["ModifiedDate"].Equals(DBNull.Value))
                    {
                        employees.Add(new Employee
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Name = reader["Name"].ToString(),
                            Age = Convert.ToInt32(reader["Age"]),
                            Email = reader["Email"].ToString(),
                            Department = reader["Department"].ToString(),
                            Designation = reader["Designation"].ToString(),
                            HiredDate = Convert.ToDateTime(reader["HiredDate"]),
                        });
                    }
                    else
                    {
                        employees.Add(new Employee
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Name = reader["Name"].ToString(),
                            Age = Convert.ToInt32(reader["Age"]),
                            Email = reader["Email"].ToString(),
                            Department = reader["Department"].ToString(),
                            Designation = reader["Designation"].ToString(),
                            HiredDate = Convert.ToDateTime(reader["HiredDate"]),
                            ModifiedDate = Convert.ToDateTime(reader["ModifiedDate"])
                        });
                    }

                }

                connection.Close();
            }

            return employees;
        }

        public int Update(Employee employee)
        {
            int id = 0;

            SqlConnection connection = new(connectionString);

            using (connection)
            {
                connection.Open();

                SqlCommand command = new("UpsertEmployee", connection);

                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@Id", employee.Id);
                command.Parameters.AddWithValue("@Name", employee.Name);
                command.Parameters.AddWithValue("@Age", employee.Age);
                command.Parameters.AddWithValue("@Email", employee.Email);
                command.Parameters.AddWithValue("@Department", employee.Department);
                command.Parameters.AddWithValue("@Designation", employee.Designation);
                command.Parameters.AddWithValue("@HiredDate", employee.HiredDate);
                //var dateTime = DateTime.UtcNow.Date.ToShortDateString();
                command.Parameters.AddWithValue("@ModifiedDate", DateTime.UtcNow.Date);
                command.Parameters.AddWithValue("@Action", "Update");

                id = command.ExecuteNonQuery();

                connection.Close();
            }

            return id;
        }
    }
}
