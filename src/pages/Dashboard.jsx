import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import API from "../services/api";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Fetch Expenses
  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");

      setExpenses(res.data.expenses);

      const total = res.data.expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      );

      setTotalExpense(total);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Expense
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/expenses/${id}`);

      alert("Expense Deleted Successfully");

      fetchExpenses();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">
          <h2 className="mb-3">
            Welcome, {user?.name} 👋
          </h2>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Expense Dashboard</h4>

            <button
              className="btn btn-success"
              onClick={() => (window.location.href = "/add-expense")}
            >
              + Add Expense
            </button>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <SummaryCard
                title="Total Expenses"
                amount={`₹ ${totalExpense}`}
                color="primary"
              />
            </div>

            <div className="col-md-4">
              <SummaryCard
                title="Total Transactions"
                amount={expenses.length}
                color="success"
              />
            </div>

            <div className="col-md-4">
              <SummaryCard
                title="Logged In User"
                amount={user?.name}
                color="warning"
              />
            </div>
          </div>

          <div className="card mt-5 shadow">
            <div className="card-header">
              <h5 className="mb-0">Recent Expenses</h5>
            </div>

            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th width="170">Action</th>
                </tr>
              </thead>

              <tbody>
                {expenses.length > 0 ? (
                  expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.title}</td>

                      <td>{expense.category}</td>

                      <td>₹ {expense.amount}</td>

                      <td>{expense.expense_date.slice(0, 10)}</td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          disabled
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(expense.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Expenses Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;