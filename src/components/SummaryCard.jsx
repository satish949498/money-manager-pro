import {
  FaWallet,
  FaMoneyBillWave,
  FaUserCircle,
  FaReceipt,
} from "react-icons/fa";

function SummaryCard({ title, amount, color }) {
  const icons = {
    primary: <FaWallet className="fs-2 fs-md-1" />,
    success: <FaMoneyBillWave className="fs-2 fs-md-1" />,
    warning: <FaUserCircle className="fs-2 fs-md-1" />,
    info: <FaReceipt className="fs-2 fs-md-1" />,
  };

  return (
    <div
      className={`card border-0 shadow bg-${color} text-white h-100`}
      style={{
        borderRadius: "18px",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 15px 30px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center p-3 p-md-4">

        <div className="me-3">

          <h6 className="text-uppercase fw-semibold mb-2 small">
            {title}
          </h6>

          <h3
            className="fw-bold mb-0"
            style={{
              fontSize: "clamp(1.2rem, 3vw, 2rem)",
            }}
          >
            {amount}
          </h3>

        </div>

        <div
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            opacity: 0.9,
          }}
        >
          {icons[color]}
        </div>

      </div>
    </div>
  );
}

export default SummaryCard;