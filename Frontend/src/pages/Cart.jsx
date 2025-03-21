import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch cart data
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await axios.get(
          `https://full-stack-book-store-gamma.vercel.app/api/v1/carts/get-user-cart`,
          { headers }
        );
        setCart(response.data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false); // Stop loading after fetch
      }
    };
    fetch();
  }, []);

  // Calculate total price
  useEffect(() => {
    if (cart.length > 0) {
      const total = cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(total);
    }
  }, [cart]);

  // Delete an item from the cart
  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        `https://full-stack-book-store-gamma.vercel.app/api/v1/carts/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      alert(response.data.message);
      setCart(cart.filter((item) => item._id !== bookid));
    } catch (err) {
      console.log(err);
    }
  };

  // Place an order
  const placeOrder = async () => {
    try {
      const response = await axios.post(
        `https://full-stack-book-store-gamma.vercel.app/api/v1/orders/place-order`,
        { order: cart },
        { headers }
      );
      alert(response.data.message);
      setCart([]); // Clear the cart locally after placing the order
      navigate("/profile/orderHistory");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      {isLoading ? (
        // Show Loader while fetching cart data
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : !cart.length ? (
        // Show Empty Cart Message if cart is empty
        <div className="h-[100%] flex items-center justify-center flex-col">
          <h1 className="text-5xl md:text-6xl font-semibold text-zinc-400">
            Empty Cart
          </h1>
        </div>
      ) : (
        // Show Cart Items if cart is not empty
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Your Cart</h1>
          {cart.map((item, id) => (
            <div
              key={id}
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
            >
              <img
                className="h-[20vh] md:h-[10vh] object-cover"
                src={item.url || "/default-image.jpg"}
                alt={item.title || "Book"}
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold">
                  {item.title || "No Title"}
                </h1>
                <p className="text-normal text-zinc-300 mt-2">
                  {item.desc?.slice(0, 100) || "No Description"}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold">
                  ₹ {item.price || 0}
                </h2>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-xl text-zinc-200 font-semibold">Total Amount</h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <h2>{cart.length} books</h2>
                <h2>₹ {Total}</h2>
              </div>
              <button
                onClick={placeOrder}
                className="bg-zinc-100 rounded px-4 py-2 w-full font-semibold hover:bg-zinc-200"
              >
                Place your order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
