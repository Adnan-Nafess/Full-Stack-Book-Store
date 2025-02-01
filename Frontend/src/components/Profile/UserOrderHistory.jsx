import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/orders/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.order);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };
    fetch();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {orderHistory?.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col justify-center items-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <img
              className="h-[20vh] mb-8"
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              alt="No Orders"
            />
          </div>
        </div>
      )}
      {orderHistory?.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-[45%]">
              <h1>Description</h1>
            </div>
            <div className="w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[5%] hidden md:block">
              <h1>Mode</h1>
            </div>
          </div>
          {orderHistory.map((item, i) => (
            <div
              key={i}
              className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[22%]">
                <Link
                  className="hover:text-blue-300"
                  to={`/book-details/${item.book?._id}`}
                >
                  {item.book?.title || "Unknown Book"}
                </Link>
              </div>
              <div className="w-[45%]">
                <h1>{item.book?.desc?.slice(0, 50) || "No Description"}...</h1>
              </div>
              <div className="w-[9%]">
                <h1>{item.book?.price || "N/A"}</h1>
              </div>
              <div className="w-[16%]">
                <h1 className="font-semibold text-green-500">
                  {item.status === "Order Placed" ? (
                    <div className="text-green-500">{item.status}</div>
                  ) : item.status === "Cancelled" ? (
                    <div className="text-red-500">{item.status}</div>
                  ) : (
                    item.status
                  )}
                </h1>
              </div>
              <div className="w-[5%] hidden md:block">
                <h1 className="text-sm text-zinc-400">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
