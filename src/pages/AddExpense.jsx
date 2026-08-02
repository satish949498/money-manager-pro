import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function AddExpense() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    expense_date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.post("/expenses", formData);

      toast.success("Expense Added Successfully!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body p-4">

          <h2 className="mb-4">➕ Add Expense</h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Title</label>

              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Amount</label>

              <input
                type="number"
                className="form-control"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>

              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Food</option>
                <option>Travel</option>
                <option>Medical</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Entertainment</option>
                <option>Fuel</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Expense Date</label>

              <input
                type="date"
                className="form-control"
                name="expense_date"
                value={formData.expense_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Notes</label>

              <textarea
                className="form-control"
                rows="3"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Saving...
                </>
              ) : (
                "Save Expense"
              )}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default AddExpense;