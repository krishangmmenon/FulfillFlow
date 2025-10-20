import { useState, useEffect } from "react";
import axios from "axios";
import './index.css';

export default function App() {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState("");
  const [message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/orders");
      if (res.data.success) setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const order = { customer, items: [{ product, qty: Number(qty) }], total: Number(total) };
      const res = await axios.post("http://localhost:3000/orders", order);
      if (res.data.success) {
        setMessage(`✅ Order created with ID: ${res.data.order.id}`);
        setCustomer(""); setProduct(""); setQty(1); setTotal("");
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating order");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo font-bold text-xl">FulfillFlow</div>
        <div>
          <a href="#about">About</a>
          <a href="#create-order">Create Order</a>
          <a href="#orders-list">Orders</a>
        </div>
      </nav>

      <div className="container">
        {/* About Section */}
        <div className="card text-center" id="about">
          <h1 className="heading">Welcome to FulfillFlow</h1>
          <p>Manage and track customer orders in real-time. Powered by Redis, Redpanda, and PostgreSQL for high-performance and reliability.</p>
        </div>

        {/* Create Order Form */}
        <div className="card" id="create-order">
          <h2 className="subheading">Create Order</h2>
          <form onSubmit={handleSubmit}>
            <input className="input" placeholder="Customer Name" value={customer} onChange={(e) => setCustomer(e.target.value)} />
            <input className="input" placeholder="Product Name" value={product} onChange={(e) => setProduct(e.target.value)} />
            <input className="input" type="number" min="1" placeholder="Quantity" value={qty} onChange={(e) => setQty(e.target.value)} />
            <input className="input" type="number" min="0" placeholder="Total Price" value={total} onChange={(e) => setTotal(e.target.value)} />
            <button type="submit" className="button">Create Order</button>
          </form>
          {message && <p className="text-center mt-2">{message}</p>}
        </div>

        {/* Orders List */}
        <div className="card" id="orders-list">
          <h2 className="subheading">All Orders</h2>
          {orders.length === 0 ? (
            <p className="text-center">No orders yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.items.map(i => `${i.qty} x ${i.product}`).join(", ")}</td>
                    <td>{order.total}</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 FulfillFlow. Built with ❤️ by Krishang.
      </footer>
    </div>
  );
}
