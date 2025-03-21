import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const BookDetails = () => {
    const { id } =  useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                  `https://full-stack-book-store-gamma.vercel.app/api/v1/books/get-book-by-id/${id}`
                );
                console.log(response);
                setData(response.data.data || response.data.books);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]); 

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const favouriteHandler = async () => {
        try{
            const response = await axios.put(
              `https://full-stack-book-store-gamma.vercel.app/api/v1/favourites/add-book-to-favourite`,
              {},
              { headers }
            );
          alert(response.data.message);
        }catch(err){
          console.log(err)
        }
    };

    const addToCartHandler = async () => {
        try {
            const response = await axios.put(
              `https://full-stack-book-store-gamma.vercel.app/api/v1/carts/add-to-cart`,
              {},
              { headers }
            );
            alert(response.data.message);
        } catch (err) {
            console.log(err)
        }
    }

    const deleteBook = async () => {
        try {
            const response = await axios.delete(
              "https://full-stack-book-store-gamma.vercel.app/api/v1/books/delete-book",
              { headers },
              { id }
            );
            alert(response.data.message);
            navigate("/all-books")
        }catch (err) {
            console.log(err);
        }
    }

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center my-8">
            <Loader />
        </div>
      ) : (
            <div className="flex flex-col md:flex-row md:px-12 py-8 px-4 bg-zinc-900 gap-8">
               <div className="bg-zinc-800 rounded p-4 h-[60vh] md:h-[75vh] w-full md:w-3/6 flex items-center justify-around gap-8">
                   {" "}
                   <img src={data.url} alt="/" className="h-[50vh] md:h-[60vh] rounded" />
               </div>
               {isLoggedIn === true && role === "user" && (
                    <div className="flex flex-col gap-4 mt-2 md:mt-0">
                        <button onClick={favouriteHandler} className="text-white rounded-full text-3xl p-2 bg-red-500 flex justify-center items-center">
                            <FaHeart /> <span className="ms-4 text-2xl block md:hidden">Favourite</span>
                        </button>
                        <button onClick={addToCartHandler} className="text-white rounded-full text-3xl p-2 md:mt-6 bg-blue-500 flex items-center justify-center">
                            <FaCartShopping /> <span className="ms-4 text-2xl block md:hidden">Add to cart</span>
                        </button>
                    </div>
               )};
               {isLoggedIn === true && role === "admin" && (
                    <div className="flex flex-col gap-4 mt-2 md:mt-0">
                        <Link to={`/updateBook/${id}`} className="text-white rounded-full text-3xl p-2 flex justify-center items-center">
                            <FaEdit /> <span className="ms-4 text-2xl block md:hidden">Edit</span>
                        </Link>
                        <button onClick={deleteBook} className="text-red-500 rounded-full text-3xl p-2 md:mt-6 bg-white flex items-center justify-center">
                            <MdOutlineDelete /> <span className="ms-4 text-2xl block md:hidden">Delete Book</span>
                        </button>
                    </div>
               )};
               <div className="p-4 w-full md:w-3/6">
                   <h1 className="text-4xl text-zinc-300 font-semibold">{data.title}</h1>
                   <p className="text-zinc-400 mt-1">by {data.author}</p>
                   <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
                   <p className="flex mt-4 items-center justify-start text-zinc-400">
                       <GrLanguage className="me-3" /> {data.language}
                   </p>
                   <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                       Price : ₹ {data.price}
                   </p>
               </div>
           </div>       
        ) 
    }
    </>
  )
}

export default BookDetails