import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { FaCheck, FaUserLarge } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [userdiv, setuserDiv] = useState("hidden");
    const [userdivdata, setuserDivData] = useState();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/orders/get-all-orders",
                    { headers }
                );
                const validOrders = response.data.data.filter(order => order.book);
                setAllOrders(validOrders || []);
                setLoading(false); // Loader ko band karna
            } catch (error) {
                setLoading(false); // Error hone par loader ko band karna
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = (e, index, orderId) => {
        const newStatus = e.target.value; // Select box se nayi status lelo
        setSelectedOrder(index); // Select order ko set karo
        setStatus(newStatus); // Local status update karo

        // Backend API ko call karo aur allOrders array ko update karo
        submitChange(orderId, newStatus, index);
    };

    const submitChange = async (orderId, newStatus, index) => {
        try {
            // Backend se status update karwana
            const response = await axios.put(
                `http://localhost:3000/api/v1/orders/update-status/${orderId}`,
                { status: newStatus }, // Updated status bhejo
                { headers }
            );

            alert(response.data.message);

            // allOrders array mein update karo specific order ka status
            setAllOrders((prevOrders) => {
                const updatedOrders = [...prevOrders];
                updatedOrders[index].status = newStatus; // Status ko update karna
                return updatedOrders;
            });

            setSelectedOrder(null); // Deselect order
            setStatus(""); // Local status reset karo
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    return (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
                All Orders
            </h1>

            {/* Orders Table */}
            {allOrders.map((item, index) => (
                <div
                    className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 transition-all duration-300"
                    key={index}
                >
                    <div className="w-[3%] text-center">{index + 1}</div>
                    <div className="w-[48%] md:w-[22%]">
                        <Link to={`/book-details/${item.book?._id}`} className="hover:text-blue-300">
                            {item.book?.title || "No Title"}
                        </Link>
                    </div>
                    <div className="w-0 md:w-[45%] hidden md:block">
                        {item.book?.desc?.slice(0, 50) || "No Description"}...
                    </div>
                    <div className="w-[17%] md:w-[9%]">₹ {item.book?.price || "0.00"}</div>
                    <div className="w-[30%] md:w-[16%]">
                        {selectedOrder === index ? (
                            <div className="flex items-center">
                                <select
                                    onChange={(e) => handleStatusChange(e, index, item._id)} // Status change handler
                                    className="bg-gray-800 p-1 rounded"
                                    value={item.status || "Order placed"} // Updated status bind
                                >
                                    {["Order placed", "Out for delivery", "Delivered", "Cancelled"].map(
                                        (option, i) => (
                                            <option key={i} value={option}>
                                                {option}
                                            </option>
                                        )
                                    )}
                                </select>
                                <button
                                    className="text-green-500 hover:text-pink-600 ml-2"
                                >
                                    <FaCheck />
                                </button>
                            </div>
                        ) : (
                            <div
                                className={`font-semibold ${item.status === "Order placed"
                                    ? "text-yellow-500"
                                    : item.status === "Cancelled"
                                        ? "text-red-500"
                                        : "text-green-500"
                                    }`}
                                onClick={() => setSelectedOrder(index)} // Select order
                            >
                                {item.status || "Unknown"}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            console.log("User data:", item.user); // Debugging ke liye
                            setuserDiv("fixed");
                            setuserDivData(item.user); // Check karo ki user ka data aa raha hai ya nahi
                        }}
                        className="text-xl hover:text-orange-500"
                    >
                        <IoOpenOutline />
                    </button>
                </div>
            ))}
           {userdivdata && (
            <SeeUserData 
              userdivdata={userdivdata}
              userdiv={userdiv}
              setuserDiv={setuserDiv}
            />
           )}
        </div>
    );

};

export default AllOrders;
