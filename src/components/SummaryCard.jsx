import {
  FaWallet,
  FaMoneyBillWave,
  FaUserCircle,
  FaReceipt,
} from "react-icons/fa";

function SummaryCard({ title, amount, color }) {
  const icons = {
    primary: <FaWallet size={35} />,
    success: <FaMoneyBillWave size={35} />,
    warning: <FaUserCircle size={35} />,
    info: <FaReceipt size={35} />,
  };

  return (
    <div
      className={`card border-0 shadow-lg text-white bg-${color}`}
      style={{
        borderRadius: "15px",
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="text-uppercase fw-bold mb-2">{title}</h6>

          <h3 className="fw-bold mb-0">{amount}</h3>
        </div>

        <div>{icons[color]}</div>
      </div>
    </div>
  );
}

export default SummaryCard;