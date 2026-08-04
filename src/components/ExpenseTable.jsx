import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function ExpenseTable({ expenses, handleDelete }) {
  const navigate = useNavigate();

  return (
    <div className="card shadow border-0 mt-4">
      <div className="card-header bg-white py-3">
        <h5 className="fw-bold mb-0">Recent Expenses</h5>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">

          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th style={{ minWidth: "170px" }}>Action</th>
            </tr>
          </thead>

          <tbody>

            {expenses.length > 0 ? (

              expenses.map((expense) => (

                <tr key={expense.id}>

                  <td className="fw-semibold">
                    {expense.title}
                  </td>

                  <td>
                    <span className="badge bg-primary">
                      {expense.category}
                    </span>
                  </td>

                  <td className="fw-bold text-success">
                    ₹ {expense.amount}
                  </td>

                  <td>
                    {expense.expense_date.slice(0, 10)}
                  </td>

                  <td>

                    <div className="d-flex flex-column flex-sm-row gap-2">

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          navigate(`/edit-expense/${expense.id}`)
                        }
                      >
                        <FaEdit className="me-1" />
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(expense.id)
                        }
                      >
                        <FaTrash className="me-1" />
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-4"
                >
                  <h6 className="text-muted mb-0">
                    No Expenses Found
                  </h6>
                </td>

              </tr>

            )}

          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ExpenseTable;