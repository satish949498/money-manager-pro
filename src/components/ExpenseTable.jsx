import { useNavigate } from "react-router-dom";

function ExpenseTable({ expenses, handleDelete }) {
  const navigate = useNavigate();

  return (
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
            <th width="180">Action</th>
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
                    onClick={() =>
                      navigate(`/edit-expense/${expense.id}`)
                    }
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
  );
}

export default ExpenseTable;