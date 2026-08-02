import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import ExpenseTable from "../components/ExpenseTable";
import SearchBar from "../components/SearchBar";

import API from "../services/api";
import Swal from "sweetalert2";

function Dashboard() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");

      setExpenses(res.data.expenses);

      const total = res.data.expenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );

      setTotalExpense(total);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Delete Expense?",
    text: "You won't be able to recover this expense.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await API.delete(`/expenses/${id}`);

    toast.success("Expense Deleted Successfully");

    fetchExpenses();
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete Failed");
  }
};

  const filteredExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h2 className="fw-bold">
                Welcome, {user?.name} 👋
              </h2>

              <p className="text-muted">
                Manage your expenses efficiently
              </p>
            </div>

            <button
              className="btn btn-success btn-lg"
              onClick={() => navigate("/add-expense")}
            >
              + Add Expense
            </button>

          </div>

          <div className="row g-4">

            <div className="col-lg-4">
              <SummaryCard
                title="Total Expense"
                amount={`₹${totalExpense}`}
                color="primary"
              />
            </div>

            <div className="col-lg-4">
              <SummaryCard
                title="Transactions"
                amount={filteredExpenses.length}
                color="success"
              />
            </div>

            <div className="col-lg-4">
              <SummaryCard
                title="User"
                amount={user?.name}
                color="warning"
              />
            </div>

          </div>

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <ExpenseTable
            expenses={filteredExpenses}
            handleDelete={handleDelete}
          />

        </div>

      </div>
    </>
  );
}

export default Dashboard;