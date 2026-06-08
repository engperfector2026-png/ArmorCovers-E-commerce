import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🎉 Order Successful!</h1>

      {order ? (
        <>
          <p>Order ID: {order._id}</p>
          <p>Total Paid: KES {order.totalAmount}</p>
        </>
      ) : (
        <p>Your order has been placed successfully.</p>
      )}

      <button onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default Success;