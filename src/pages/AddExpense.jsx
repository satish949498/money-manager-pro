import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaSave, FaPlusCircle } from "react-icons/fa";
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
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">

          <div
            className="card border-0 shadow-lg"
            style={{ borderRadius: "18px" }}
          >
            <div className="card-body p-4">

              <h2 className="fw-bold mb-4 d-flex align-items-center">
                <FaPlusCircle className="text-primary me-3" />
                Add Expense
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Title
                  </label>

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
                  <label className="form-label fw-semibold">
                    Amount
                  </label>

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
                  <label className="form-label fw-semibold">
                    Category
                  </label>

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
                    <option>Post</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Expense Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="expense_date"
                    value={formData.expense_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Notes
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">

                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    style={{
                      width: "160px",
                      height: "45px",
                    }}
                    onClick={() => navigate("/dashboard")}
                  >
                    <FaArrowLeft className="me-2" />
                    Back
                  </button>

                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{
                      width: "160px",
                      height: "45px",
                    }}
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
                      <>
                        <FaSave className="me-2" />
                        Save Expense
                      </>
                    )}
                  </button>

                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddExpense;