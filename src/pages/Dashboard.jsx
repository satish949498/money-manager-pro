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

      const updatedExpenses = expenses.filter(
        (expense) => expense.id !== id
      );

      setExpenses(updatedExpenses);

      const total = updatedExpenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );

      setTotalExpense(total);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Expense deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong.",
      });
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

        <div
          className="container-fluid p-3 p-md-4"
          style={{ paddingBottom: "90px" }}
        >
          {/* Header */}
          <div className="row align-items-center mb-4">

            <div className="col-12 col-md-8 mb-3 mb-md-0">
              <h2 className="fw-bold mb-1">
                Welcome, {user?.name} 👋
              </h2>

              <p className="text-muted mb-0">
                Manage your expenses efficiently
              </p>
            </div>

            <div className="col-12 col-md-4 text-md-end">
              <button
                className="btn btn-success btn-lg w-100 w-md-auto"
                onClick={() => navigate("/add-expense")}
              >
                + Add Expense
              </button>
            </div>

          </div>

          {/* Summary Cards */}
          <div className="row g-3">

            <div className="col-12 col-md-6 col-lg-4">
              <SummaryCard
                title="Total Expense"
                amount={`₹${totalExpense}`}
                color="primary"
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <SummaryCard
                title="Transactions"
                amount={filteredExpenses.length}
                color="success"
              />
            </div>

            <div className="col-12 col-lg-4">
              <SummaryCard
                title="User"
                amount={user?.name}
                color="warning"
              />
            </div>

          </div>

          {/* Search */}
          <div className="mt-4">
            <SearchBar
              search={search}
              setSearch={setSearch}
            />
          </div>

          {/* Expense Table */}
          <div className="mt-4">
            <ExpenseTable
              expenses={filteredExpenses}
              handleDelete={handleDelete}
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;