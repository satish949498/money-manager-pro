function SummaryCard({ title, amount, color }) {
  return (
    <div className={`card text-white bg-${color} p-3 shadow`}>
      <h5>{title}</h5>

      <h2>₹ {amount}</h2>
    </div>
  );
}

export default SummaryCard;